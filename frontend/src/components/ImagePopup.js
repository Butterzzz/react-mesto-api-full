import React from 'react';

function ImagePopup({ card, name, onClose }) {
  return (
    <div className={`popup popup_type_${name} ${card && "popup_opened"}`}>
      <div className="popup__image-container">
        <figure className="popup__figure">
          <img className="popup__image" src={card && card.link} alt={card && card.name} />
          <figcaption className="popup__image-caption">{card && card.name}</figcaption>
        </figure>
        <button className="popup__button popup__button_action_close" type="button" aria-label="Закрыть окно просмотра" onClick={onClose} />
      </div>
    </div>
  );
}

export default ImagePopup;