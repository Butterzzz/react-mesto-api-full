import React from 'react';
import success from '../images/success.svg';
import fail from '../images/fail.svg';

function InfoTooltip({ isOpen, onClose, isSuccess }) {
    const successText="Вы успешно зарегистрировались!";
    const failedText="Что-то пошло не так! Попробуйте ещё раз.";

    return (
        <div className={`popup popup_type_info-tooltip ${isOpen && "popup_opened"}`}>
            <div className="popup__container">
                <h2 className="popup__tooltip-heading">{isSuccess ? successText : failedText}</h2>
                <img className="popup__tooltip-image" src={isSuccess ? success : fail} alt={isSuccess ? 'success-icon' : 'fail-icon'} />
                <button className="popup__button popup__button_action_close" type="button" aria-label="Закрыть форму" onClick={onClose} />
            </div>
        </div>
    );
}

export default InfoTooltip;