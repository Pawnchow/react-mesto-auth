import errorPic from "../images/tooltipError.svg";
import successPic from "../images/tooltipSucces.svg";
function InfoToolTip({ isOpen, onClose, isRegSucces, onOverlayClick }) {
  return (
    <div
      className={`popup ${isOpen && "popup_opened"}`}
      onMouseDown={onOverlayClick}
    >
      <div
        className="popup__container"
        onMouseDown={(e) => e.stopPropagation()}
      >
        <div className="popup__tooltip">
          <button
            className="popup__close-button"
            type="button"
            aria-label="Закрыть"
            onClick={onClose}
          ></button>
          <img
            className="popup__tooltip-img"
            src={isRegSucces ? successPic : errorPic}
            alt={
              isRegSucces
                ? "Вы успешно зарегистрировались!"
                : "Что-то пошло не так! Попробуйте еще раз."
            }
          />
          <h2 className="popup__tooltip-text">
            {isRegSucces
              ? "Вы успешно зарегистрировались!"
              : "Что-то пошло не так! Попробуйте еще раз."}
          </h2>
        </div>
      </div>
    </div>
  );
}

export default InfoToolTip;
