import React from 'react';

export default function Card({ item, index }) {
  
  return (
    <li>
      asdsa
      <p>Заявка №{index}</p>
      <p>
        E-mail:
        {item.email}
      </p>
      <p>
        Название:
        {item.title}
      </p>
      <p></p>
      Описание: {item.subtitle} <br />
      Локация: {item.location} <br />
      Сумма : {item.money}руб.
      <br />
      Оплата: {item.payon ? 'Да' : 'Нет'} <br />
      Заявка принята: {item.inviteAccepted ? 'Да' : 'Нет'} <br />
      <hr />
    </li>
  );
}
