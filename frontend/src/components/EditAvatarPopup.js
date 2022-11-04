import React, { useRef, useEffect } from 'react';
import PopupWithForm from './PopupWithForm';

function EditAvatarPopup({ isOpen, onClose, onUpdateAvatar, isLoading }) {
    
    const avatarRef = useRef('');

    useEffect(() => {
        avatarRef.current.value = '';
    }, [isOpen]);

    function handleSubmit(e) {
        e.preventDefault();

        onUpdateAvatar({
            avatar: avatarRef.current.value
        });
    }

    return (
        <PopupWithForm
            isOpen={isOpen}
            onClose={onClose}
            name={'avatar'}
            form={'editAvatar'}
            title={'Обновить аватар'}
            buttonText={isLoading ? 'Обновляем...' : 'Обновить'}
            onSubmit={handleSubmit}>
            <fieldset className="popup__input-container">
                <input className="popup__input" type="url" name="avatar" id="avatar" placeholder="Ссылка на аватар" required ref={avatarRef} />
                <span className="popup__error avatar-input-error"></span>
            </fieldset>
        </PopupWithForm>
    );
}

export default EditAvatarPopup;
