import React from 'react';
import { Link } from 'react-router-dom';
import './styles.css';

export default function Review({ item, index }) {
  return (
    <Link className="card" to={`/card/${item.id}`}>
      <p className="card_number">Заявка №{index}</p>
      <p className="card_description">
        Отзыв о работе:
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
    </Link>
  );
}
