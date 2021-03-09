import React from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

import Card from '../Card';
import './styles.css';

export default function AwaitInvaitCard() {
  const cards = useSelector((state) => state.cards);
  const user = useSelector((state) => state.user);

  return (
    <ul className="list__card">
      {cards
        .filter((el) => user.invite.includes(el.uid))
        .map((el, i) => {
          return (
            <Link className="card" key={el.uid} to={`/card/${el.uid}`}>
            <Card item={el} index={i + 1} />;
          </Link>)
        })}
    </ul>
  );
}
