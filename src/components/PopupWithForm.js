import React, {useEffect} from "react";

function PopupWithForm( {buttonText="Сохранить", onClose, name, title, children, isOpen, onSubmit, onOverlayClick}) {
    useEffect(() => {
        const closeEsc = e => {
            if(e.key === 'Escape') {
                onClose();
            }
        }
        document.addEventListener('keyup', closeEsc);
        return () => document.removeEventListener('keyup', closeEsc)
    }, [onClose])


    return (
        <div className={`popup popup_${name} ${isOpen && 'popup_opened'}`} onMouseDown={onOverlayClick}>
            <div className="popup__container" onMouseDown={e => e.stopPropagation()}>
                <button className="popup__close-button" type="button" aria-label="Закрыть" onClick={onClose}></button>
                <form className={`popup__form popup__form_${name}`} name ={name} onSubmit={onSubmit} noValidate>
                    <h2 className="popup__title">{title}</h2>
                    {children}
                    <button className="popup__save-button" type="submit" aria-label={buttonText}>{buttonText}</button>
                </form>
            </div>
        </div>
    )
};
export default PopupWithForm;