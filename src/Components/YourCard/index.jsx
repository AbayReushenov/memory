import React from 'react';
import base from './fake';
import Card from '../Card';

export default function YourCard() {
  console.log(base);
  const yourmail = 'b@b.com';
  const yourbase = base.filter((el) => el.email === yourmail);
  return (
    <ul>
      {yourbase.map((el, i) => {
        return <Card key={el.email} item={el} index={i} />;
      })}
    </ul>
  );
}
