import React from 'react';
import { useSelector } from 'react-redux';
import Card from '../Card';

export default function AllCard() {
  const cards = useSelector(state => state.cards);
  return (
    <ul>
      {cards.length > 0 ? cards.map((el, index) => <Card key={el.id} item={el} index={index + 1} />) : 'Нет заявок'}
    </ul>
  );
}
