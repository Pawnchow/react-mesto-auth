function ImagePopup({ card, onClose, onOverlayClick }) {
  return (
    <div className={`popup popup_full ${card ? 'popup_opened' : ''}`} onClick={onOverlayClick} >
        <figure className="popup__container-full" onClick={e => e.stopPropagation()}>
          <button className="popup__close-button popup__close-button_full" type="button" aria-label="Закрыть" onClick={onClose}></button>
          <img src={card?.link} alt={card?.name} className="popup__full-img" />
          <figcaption className="popup__full-text">{card?.name}</figcaption>
        </figure>
    </div>
  )
};
export default ImagePopup;