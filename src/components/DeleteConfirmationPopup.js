import PopupWithForm from "./PopupWithForm";
function DeleteConfirmationPopup ({ isOpen, onClose, onOverlayClick, card, onCardDelete }) {
  function handleSubmit(evt) {
    evt.preventDefault();
    onCardDelete(card)
  }
  
  return (
    <PopupWithForm
      name="photo-delete"
      title="Вы уверены?"
      onClose={onClose}
      isOpen={isOpen}
      onOverlayClick={onOverlayClick}
      onSubmit={handleSubmit}
      buttonText="Да"
    />
  )
};
export default DeleteConfirmationPopup;