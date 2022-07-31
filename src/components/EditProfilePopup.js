import React, { useState, useEffect, useContext } from "react";
import PopupWithForm from "./PopupWithForm";
import { CurrentUserContext } from "../contexts/CurrentUserContext";

function EditProfilePopup({ isOpen, onClose, onOverlayClick, onUpdateUser }) {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const currentUser = useContext(CurrentUserContext);

  useEffect(() => {
    setName(currentUser.name);
    setDescription(currentUser.about);
  }, [currentUser]);

  function handleSubmit(evt) {
    evt.preventDefault()
    onUpdateUser({
      name: name,
      about: description
    })
  }

  function handleNameChange(evt) {
    setName(evt.target.value)
  }

  function handleDescriptionChange(evt) {
    setDescription(evt.target.value)
  }

  return (
    <PopupWithForm
      name="profile"
      title="Редактировать профиль"
      onClose={onClose}
      isOpen={isOpen}
      onSubmit={handleSubmit}
      onOverlayClick={onOverlayClick}
      >
      <label className="popup__input-group">
        <input 
          id="username"
          className="popup__input"
          type="text"
          name="editName"
          placeholder="Ваше Имя"
          required
          minLength="2"
          maxLength="40"
          value={name || ''}
          onChange={handleNameChange}
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
          name="editAbout"
          placeholder="О себе"
          required
          minLength="2"
          maxLength="200"
          value={description || ''}
          onChange={handleDescriptionChange}
        />
        <span id="about-error" className="popup__error about-error"></span>
      </label>
    </PopupWithForm>
  )
}

export default EditProfilePopup;