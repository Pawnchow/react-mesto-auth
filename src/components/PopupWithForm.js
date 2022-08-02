function PopupWithForm( {buttonText="Сохранить", onClose, name, title, children, isOpen, onSubmit, onOverlayClick}) {
    return (
        <div className={`popup popup_${name} ${isOpen && 'popup_opened'}`} onMouseDown={onOverlayClick}>
            <div className="popup__container" onMouseDown={e => e.stopPropagation()}>
                <button className="popup__close-button" type="button" aria-label="Закрыть" onClick={onClose}></button>
                <form className={`popup__form popup__form_${name}`} name ={name} onSubmit={onSubmit}>
                    <h2 className="popup__title">{title}</h2>
                    {children}
                    <button className="popup__save-button" type="submit" aria-label={buttonText}>{buttonText}</button>
                </form>
            </div>
        </div>
    )
};
export default PopupWithForm;