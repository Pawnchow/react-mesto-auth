import { useEffect } from "react";
import useForm from "../hooks/useForm";
import PopupWithForm from './PopupWithForm';

function AddPlacePopup({ isOpen, onClose, onOverlayClick, onAddPlace, isLoading }) {

  const { values, handleChange, setValues } = useForm({});
  function handleSubmit(evt) {
    evt.preventDefault();

    onAddPlace({
      name: values.name,
      link: values.link
    });
  }

  useEffect(() => {
    setValues({})
  }, [isOpen, setValues])

  return (
    <PopupWithForm
      name="photo"
      title="Новое место"
      onClose={onClose}
      isOpen={isOpen}
      onOverlayClick={onOverlayClick}
      onSubmit={handleSubmit}
      buttonText={isLoading? 'Сохранение...' : 'Создать'}
      >
      <label className="popup__input-group">
        <input
          id="cardName"
          className="popup__input"
          type="text"
          name="name"
          placeholder="Название"
          required
          minLength="1"
          maxLength="30"
          onChange={handleChange}
          value={values.name || ''}
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
          name="link"
          placeholder="Ссылка на картинку"
          required
          type="url"
          onChange={handleChange}
          value={values.link || ''}
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