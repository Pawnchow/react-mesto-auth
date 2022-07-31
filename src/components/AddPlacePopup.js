import React, { useState, useEffect } from "react";
import PopupWithForm from './PopupWithForm';

function AddPlacePopup({ isOpen, onClose, onOverlayClick, onAddPlace }) {
  const [name, setName] = useState('');
  const [link, setLink] = useState('');

  function handleSubmit(evt) {
    evt.preventDefault();
    onAddPlace({
      name: name,
      link: link
    });
  }

  function handleLinkChange(evt) {
    setLink(evt.target.value)
  }

  function handleNameChange(evt) {
    setName(evt.target.value)
  }

  useEffect(() => {
    setLink('');
    setName('');
  }, [isOpen])

  return (
    <PopupWithForm
      name="photo"
      title="Новое место"
      onClose={onClose}
      isOpen={isOpen}
      buttonText="Создать"
      onOverlayClick={onOverlayClick}
      onSubmit={handleSubmit}
      >
      <label className="popup__input-group">
        <input
          id="cardName"
          className="popup__input"
          type="text"
          name="cardName"
          placeholder="Название"
          required
          minLength="1"
          maxLength="30"
          onChange={handleNameChange}
          value={name || ''}
        />
        <span
          id="cardName-error"
          className="popup__error cardName-error"
        ></span>
      </label>
      <label className="popup__input-group">
        <input
          id="cardLink"
          className="popup__input"
          name="cardLink"
          placeholder="Ссылка на картинку"
          required
          type="url"
          onChange={handleLinkChange}
          value={link || ''}
        />
        <span
          id="cardLink-error"
          className="popup__error cardLink-error"
        ></span>
      </label>
    </PopupWithForm>
  )
}
export default AddPlacePopup;