import PopupWithForm from "./PopupWithForm";
function DeleteConfirmationPopup ({ isOpen, onClose, onOverlayClick, card, onCardDelete, isLoading }) {
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
      buttonText={isLoading ? 'Сохранение...' : 'Да'}
    />
  )
};
export default DeleteConfirmationPopup;