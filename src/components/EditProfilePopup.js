import { useEffect, useContext } from "react";
import useForm from "../hooks/useForm";
import PopupWithForm from "./PopupWithForm";
import { CurrentUserContext } from "../contexts/CurrentUserContext";

function EditProfilePopup({ isOpen, onClose, onOverlayClick, onUpdateUser, isLoading }) {
  const currentUser = useContext(CurrentUserContext);
  const { values, handleChange, setValues } = useForm({});

  function handleSubmit(evt) {
    evt.preventDefault()

    onUpdateUser({
      name: values.name,
      about: values.about
    })
  }

  useEffect(() => {
    currentUser ? setValues(currentUser) : setValues({})
  }, [setValues, currentUser, isOpen]);

  return (
    <PopupWithForm
      name="profile"
      title="Редактировать профиль"
      onClose={onClose}
      isOpen={isOpen}
      onSubmit={handleSubmit}
      onOverlayClick={onOverlayClick}
      buttonText={isLoading? 'Сохранение...' : 'Сохранить'}
      >
      <label className="popup__input-group">
        <input 
          id="username"
          className="popup__input"
          type="text"
          name="name"
          placeholder="Ваше Имя"
          required
          minLength="2"
          maxLength="40"
          value={values.name || ''}
          onChange={handleChange}
        />
        <span
          id="username-error"
          className="popup__error username-error"
        ></span>
      </label>
      <label className="popup__input-group">
        <input
          id="about"
          className="popup__input"
          type="text"
          name="about"
          placeholder="О себе"
          required
          minLength="2"
          maxLength="200"
          value={values.about || ''}
          onChange={handleChange}
        />
        <span id="about-error" className="popup__error about-error"></span>
      </label>
    </PopupWithForm>
  )
}

export default EditProfilePopup;