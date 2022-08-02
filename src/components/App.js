import { useState, useEffect } from 'react';
import { Redirect, Route, Switch, useHistory } from 'react-router-dom';
import api from '../utils/Api';
import Header from './Header';
import Main from './Main';
import Footer from './Footer';
import ImagePopup from './ImagePopup';
import { CurrentUserContext } from '../contexts/CurrentUserContext';
import EditProfilePopup from './EditProfilePopup';
import AddPlacePopup from './AddPlacePopup';
import EditAvatarPopup from './EditAvatarPopup';
import DeleteConfirmationPopup from './DeleteConfirmationPopup';
import ProtectedRoute from './ProtectedRoute';
import Register from './Register';
import Login from './Login';
import InfoToolTip from './InfoToolTip';
import * as auth from '../utils/Auth';


function App() {
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false);
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false);
  const [isDelConfirmPopupOpen, setDelConfirmPopupOpen] = useState(false);
  const [selectedCard, setSelectedCard] = useState(null);
  const [currentUser, setCurrentUser] = useState({});
  const [cards, setCards] = useState([]);
  const [deleteCardId, setDeleteCardId] = useState(null);
  const [isInfoTooltipOpen, setIsInfoTooltipOpen] = useState(false);
  const [loggedIn, setLoggedIn] = useState(false);
  const [email, setEmail] = useState('');
  const [isRegSucces, setIsRegSucces] = useState(false);

  const history = useHistory();

  useEffect(() => {
    if(loggedIn) {
      Promise.all([api.getUserInfo(), api.getInitialCards()])
      .then(([userData, cardData]) => {
          setCards(cardData);
          setCurrentUser(userData);
      })
      .catch(err => console.log(err))
    }
  }, [loggedIn]);

  function handleAddPlaceClick() {
    setIsAddPlacePopupOpen(true);
  };
  function handleEditProfileClick() {
    setIsEditProfilePopupOpen(true);
  };
  function handleEditAvatarClick() {
    setIsEditAvatarPopupOpen(true);
  };

  function handleCardDeleteClick(cardId) {
    setDelConfirmPopupOpen(true)
    setDeleteCardId(cardId);
  }

  function closeAllPopups() {
    setIsEditProfilePopupOpen(false);
    setIsAddPlacePopupOpen(false);
    setIsEditAvatarPopupOpen(false);
    setSelectedCard(null);
    setDelConfirmPopupOpen(null);
    setIsInfoTooltipOpen(false)
  };

  const isOpen = isEditAvatarPopupOpen || isEditProfilePopupOpen || isAddPlacePopupOpen || selectedCard || isInfoTooltipOpen;

  useEffect(() => {
    function closeByEscape(evt) {
      if(evt.key === 'Escape') {
        closeAllPopups();
      }
    }
    if(isOpen) {
      document.addEventListener('keydown', closeByEscape);
      return () => {
        document.removeEventListener('keydown', closeByEscape);
      }
    }
  }, [isOpen]) 

  function handleCardClick(card) {
    setSelectedCard(card);
  };

  function handleOverlayClick() {
      closeAllPopups();
    }

  function handleUpdateUser({ name, about }) {
    api.setUserInfo(name, about)
      .then(res => {
        setCurrentUser(res);
        closeAllPopups();
      })
      .catch(err => console.log(err))
  }

  function handleUpdateAvatar({ avatar }) {
    api.setAvatar(avatar)
      .then(res => {
        setCurrentUser(res);
        closeAllPopups();
      })
      .catch(err => console.log(err))
  }

  function handleCardLike(card) {
    const isLiked = card.likes.some(i => i._id === currentUser._id);
    api.changeLikeCardStatus(card._id, !isLiked)
      .then((newCard) => {
        setCards((state) => state.map(c => c._id === card._id ? newCard : c));
      })
      .catch(err => console.log(err))
  }

  function handleCardDelete(card) {
    api.deleteCard(card._id)
      .then(() => {
        setCards(prevCards => prevCards.filter(item => item !== card));
        closeAllPopups();
      })
      .catch(err => console.log(err))
  }

  function handleAddPlaceSubmit({ name, link }) {
    api.setCard(name, link)
      .then(newCard => {
        setCards(prevCards => [newCard, ...prevCards]);
        closeAllPopups();
      })
      .catch(err => console.log(err))
  }

  function handleRegistration(password, email) {
    auth.register(password, email)
      .then(() => {
        setIsRegSucces(true)
        history.push("/sign-in")
      })
      .catch(err => {
        setIsRegSucces(false)
        console.log(err)
      })
      .finally(() => setIsInfoTooltipOpen(true))
  }

  function handleLogin(password, email) {
    auth.authorize(password, email)
      .then(res => {
        setLoggedIn(true)
        setEmail(email)
        localStorage.setItem('token', res.token)
        history.push('/')
      })
      .catch(err => {
        setIsRegSucces(false)
        setIsInfoTooltipOpen(true)
        console.log(err)
      })
  }

  function onSignOut() {
    localStorage.removeItem('token');
    setLoggedIn(false);
    setEmail('');
    history.push('/sign-in')
  }

  function tokenCheck() {
    const token = localStorage.getItem('token');
    if(token) {
      auth.checkToken(token)
        .then(res => {
          if(res) {
            setLoggedIn(true)
            setEmail(res.data.email)
            history.push('/')
          }
        })
        .catch(err => console.log(err))
    }
  }

  useEffect(() => {
    tokenCheck()
  }, [history])
  
  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="page">
        <Header loggedIn={loggedIn} email={email} onSignOut={onSignOut} />
        <Switch>
          <ProtectedRoute
            exact path="/"
            loggedIn={loggedIn}
            component={Main}
            onEditAvatar={handleEditAvatarClick}
            onEditProfile={handleEditProfileClick}
            onAddPlace={handleAddPlaceClick}
            onCardClick={handleCardClick}
            cards={cards}
            onCardLike={handleCardLike}
            onCardDelete={handleCardDeleteClick}
          />
          <Route path="/sign-in">
            <Login onLogin={handleLogin} />
          </Route>
          <Route path="/sign-up" >
            <Register onRegister={handleRegistration} />
          </Route>
          <Route>
            {loggedIn ? <Redirect to="/" /> : <Redirect to="/sign-in" />}
          </Route>
        </Switch>
        <Footer />
        <EditProfilePopup isOpen={isEditProfilePopupOpen} onClose={closeAllPopups} onUpdateUser={handleUpdateUser} onOverlayClick={handleOverlayClick} /> 
        <AddPlacePopup isOpen={isAddPlacePopupOpen} onClose={closeAllPopups} onAddPlace={handleAddPlaceSubmit} onOverlayClick={handleOverlayClick}></AddPlacePopup>
        <EditAvatarPopup isOpen={isEditAvatarPopupOpen} onClose={closeAllPopups} onUpdateAvatar={handleUpdateAvatar} onOverlayClick={handleOverlayClick} />
        <ImagePopup card={selectedCard} onClose={closeAllPopups} onOverlayClick={handleOverlayClick} />
        <DeleteConfirmationPopup isOpen={isDelConfirmPopupOpen} onClose={closeAllPopups} onOverlayClick={handleOverlayClick} onCardDelete={handleCardDelete} card={deleteCardId} />
        <InfoToolTip isOpen={isInfoTooltipOpen} onClose={closeAllPopups} isRegSucces={isRegSucces} onOverlayClick={handleOverlayClick} />
      </div>
    </CurrentUserContext.Provider>
  )
};

export default App;