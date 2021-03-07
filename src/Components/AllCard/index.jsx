import React from 'react';
import { useSelector } from 'react-redux';
import Card from '../Card';
import './styles.css';

export default function AllCard() {
  const cards = useSelector((state) => state.cards);
  return (
    <ul className="list__card">
      {cards.length > 0
        ? cards.map((el, index) => (
            <Card key={el.id} item={el} index={index + 1} />
          ))
        : 'Нет заявок'}
    </ul>
  );
}
