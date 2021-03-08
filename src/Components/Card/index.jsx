import React from 'react';
import './styles.css';

export default function Card({ item }) {
  return (
    <li>
      <p className="card_description">
        Название:
        <br />
        <p className="card_description_text">{item.title}</p>
      </p>
      <p className="card_description">
        Описание:
        <br />
        <p className="card_description_text">{item.description}</p>
      </p>
      <p className="card_description">
        Локация:
        <br />
        <p className="card_description_text">{item.loaction?.strLoc}</p>
      </p>
      <p className="card_description">Сумма: {item.price} ₽</p>
    </li>
  );
}
