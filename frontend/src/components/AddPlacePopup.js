import React, { useState, useEffect } from 'react';
import PopupWithForm from './PopupWithForm';

function AddPlacePopup({ isOpen, onClose, onAddPlace, isLoading }) {

    const [name, setName] = useState('');
    const [link, setLink] = useState('');

    useEffect(() => {
        if (isOpen) {
            setName('');
            setLink('');
        }
    }, [isOpen]);

    function handleAddName(e) {
        setName(e.target.value);
    }

    function handleAddLink(e) {
        setLink(e.target.value);
    }

    function handleSubmit(e) {
        e.preventDefault();

        onAddPlace({
            name: name,
            link: link
        });
    }

    return (
        <PopupWithForm
            isOpen={isOpen}
            onClose={onClose}
            name={'add-card'}
            form={'addCard'}
            title={'Новое место'}
            buttonText={isLoading ? 'Добавляем...' : 'Добавить'}
            isLoading={isLoading}
            onSubmit={handleSubmit}>
            <fieldset className="popup__input-container">
                <input
                    className="popup__input"
                    type="text" name="name"
                    id="name-input-two"
                    minLength="2"
                    maxLength="30"
                    placeholder="Название"
                    required
                    value={name || ''}
                    onChange={handleAddName} />
                <span className="popup__error name-input-error"></span>
                <input
                    className="popup__input"
                    type="url"
                    name="link"
                    id="link-input"
                    placeholder="Ссылка на картинку"
                    required
                    value={link || ''}
                    onChange={handleAddLink} />
                <span className="popup__error link-input-error"></span>
            </fieldset>
        </PopupWithForm>
    );
}

export default AddPlacePopup;