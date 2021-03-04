import React from 'react';

export default function Profile() {
  const profile = {
    name: 'Лев Николаевич Толстой',
    email: 'karenin@email.com',
    rating: 4.8,
    money: 5000,
  };
  return (
    <div className="profile">
      <ul>
        <li>
          Имя:
          {profile.name}
        </li>
        <li>
          e-mail:
          {profile.email}
        </li>
        <li>
          Рейтинг:
          {profile.rating}
        </li>
        <li>
          Сумма средств:
          {profile.money}
        </li>
      </ul>
    </div>
  );
}
