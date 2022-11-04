import React from 'react';
import { CurrentUserContext } from '../contexts/CurrentUserContext.js';

function Card({ card, onCardClick, onCardLike, onCardDelete }) {

    const currentUser = React.useContext(CurrentUserContext);
    // Определяем, являемся ли мы владельцем текущей карточки
    const isOwn = card.owner._id === currentUser._id;
    const cardDeleteButtonClassName = (`card__delete-button ${isOwn ? 'card__delete-button_visible' : 'card__delete-button_hidden'}`);
    // Определяем, есть ли у карточки лайк, поставленный текущим пользователем
    const isLiked = card.likes.some(i => i._id === currentUser._id);
    const cardLikeButtonClassName = (`card__like-button ${isLiked ? 'card__like-button_active' : ''}`);

    function handleClick() {
        onCardClick(card);
    }

    function handleLikeClick() {
        onCardLike(card);
    }

    function handleDeleteClick() {
        onCardDelete(card);
    }

    return (
        <li className="cards__item">
            <article className="card">
                <img className="card__image" src={card.link} alt={card.name} onClick={handleClick} />
                <div className="card__description">
                    <h2 className="card__title">{card.name}</h2>
                    <div className="card__like-container">
                        <button className={cardLikeButtonClassName} type="button" aria-label="Поставить лайк" onClick={handleLikeClick} />
                        <div className="card__like-counter">{card.likes.length}</div>
                    </div>
                </div>
                <button className={cardDeleteButtonClassName} type="button" aria-label="Удалить карточку" onClick={handleDeleteClick} />
            </article>
        </li>
    )
}

export default Card;