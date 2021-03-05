import React from 'react';

export default function Card({ item, index }) {

  return (
    <li>
      <p>Заявка №{index + 1}</p>
      <p>
        Название:
        {item.title}
      </p>
      <p></p>
      Описание: {item.description} <br />
      Локация: {item.loaction?.strLoc} <br />
      Сумма : {item.price}руб.
      <br />
      Оплата: {item.price !==0 ? 'Да' : 'Нет'} <br />
      Заявка принята: {item.inviteUser?.length ? 'Да' : 'Нет'} <br />
      <hr />
    </li>
  );
}
