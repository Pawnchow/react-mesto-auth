import React, { useContext } from "react";
import { CurrentUserContext } from '../contexts/CurrentUserContext';

function Card({ card, onCardClick, onCardLike, onCardDelete}) {
  const currentUser = useContext(CurrentUserContext);
  const isOwn = card.owner._id === currentUser._id;
  const isLiked = card.likes.some(i => i._id === currentUser._id);
  const cardLikeButtonClassName = `photo__like ${isLiked ? 'photo__like_active' : ''}`;

  function handleCardClick() {
    onCardClick(card)
  };

  function handleCardLike() {
    onCardLike(card)
  }

  function handleCardDelete() {
    onCardDelete(card)
  }

  return (
    <li className="photo__item">
      <figure className="photo__card">
        {isOwn && <button className="photo__remove" type="button" aria-label="Удалить" onClick={handleCardDelete}></button>}
        <img className="photo__img" src={card.link} alt={card.name} onClick={handleCardClick}/>
        <figcaption className="photo__info">
          <h2 className="photo__text">{card.name}</h2>
          <div className="photo__like-wrapper">
            <button className={cardLikeButtonClassName} type="button" aria-label="Мне нравится" onClick={handleCardLike}></button>
            <span className="photo__like_counter">{card.likes.length}</span>
          </div>
        </figcaption>
      </figure>
    </li>
  )
}
export default Card;