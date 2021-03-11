import React from 'react';
import './styles.css';
import { Link } from 'react-router-dom';

import NoMoneyIcon from '../../image/card/no_many.png';
import MoneyIcon from '../../image/card/money.png';
import CardLinkIcon from '../../image/card/open_card.png';

export default function Card({ item }) {
  return (
    <li className="card">
      <div className="card_items_icon">
        {item.price > 0 ? (
          <img
            className="card_icon_money"
            src={MoneyIcon}
            alt="Карточка за деньги"
          />
        ) : (
          <img
            className="card_icon_money"
            src={NoMoneyIcon}
            alt="карточка за спасибо"
          />
        )}
        <Link className="card_link" to={`/card/${item.uid}`}>
          <img
            className="card_icon_link"
            src={CardLinkIcon}
            alt="Ссылка на карточку"
          />
        </Link>
      </div>
      <h2 className="card_description">{item.title} </h2>
      <h2 className="card_description">{item.description}</h2>
      <h2 className="card_description">{item.location}</h2>
    </li>
  );
}
