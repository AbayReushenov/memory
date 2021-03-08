import React from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

import Card from '../Card';
import './styles.css';

export default function AllCard() {
  const cards = useSelector((state) => state.cards);
  return (
    <ul className="list__card">
      {cards.length > 0
        ? cards.map((el, index) => (
            <Link className="card" key={el.id} to={`/card/${el.id}`}>
              <Card item={el} index={index + 1} />
            </Link>
          ))
        : 'Нет заявок'}
    </ul>
  );
}
