import React from 'react';
import base from '../YourCard/fake';
import Card from '../Card';

export default function AllCard() {
  return (
    <ul>
      {base.length > 0 ? base.map((el, index) => <Card key={index} item={el} index={index + 1} />) : 'Нет заявок'}
    </ul>
  );
}
