import React from 'react';

function PopupWithForm({ name, title, form, children, buttonText, isOpen, onClose, onSubmit, isLoading }) {
    return (
        <div className={`popup popup_type_${name} ${isOpen && "popup_opened"}`}>
            <div className="popup__container">
                <h2 className="popup__heading">{title}</h2>
                <form className="popup__form" name={form} onSubmit={onSubmit} noValidate>
                    {children}
                    <button className="popup__button popup__button_action_save" type="submit" disabled={isLoading}>{buttonText}</button>
                </form>
                <button className="popup__button popup__button_action_close" type="button" aria-label="Закрыть форму" onClick={onClose} />
            </div>
        </div>
    );
}

export default PopupWithForm;