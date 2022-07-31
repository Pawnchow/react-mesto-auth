import React, { useRef, useEffect } from "react";
import PopupWithForm from "./PopupWithForm";

function EditAvatarPopup({ onClose, isOpen, onUpdateAvatar, onOverlayClick }) {
  const avatarRef = useRef('')

  function handleSubmit(evt) {
    evt.preventDefault();
    onUpdateAvatar({
      avatar: avatarRef.current.value
    })
    avatarRef.current.value='';
  }

  useEffect(() => {
    avatarRef.current.value='';
  }, [isOpen]);

  return (
    <PopupWithForm
      name="avatar-edit"
      title="Обновить аватар"
      onClose={onClose}
      isOpen={isOpen}
      onOverlayClick={onOverlayClick}
      onSubmit={handleSubmit}
      >
      <label className="popup__input-group">
        <input
          className="popup__input"
          id="avatar"
          name="avatar"
          type="url"
          placeholder="Ссылка на изображение"
          required
          ref={avatarRef}
        />
        <span className="popup__error avatar-error" id="avatar-error"></span>
      </label>
    </PopupWithForm>
  )
}

export default EditAvatarPopup;