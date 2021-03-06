import React from 'react';
import { useSelector } from 'react-redux';
import Card from '../Card';
import './styles.css';

export default function YourCard() {
  const cards = useSelector((state) => state.cards);
  const user = useSelector((state) => state.user);

  console.log(cards);
  return (
    <ul className="list__card">
      {cards
        .filter((el) => el.author === user.email)
        .map((el, i) => {
          return <Card key={el.id} item={el} index={i} />;
        })}
    </ul>
  );
}
