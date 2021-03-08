import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import './styles.css';

export default function FullCard() {
  // достаем из глобального стейта все карточки для поиска той, которая нам нужна
  const cards = useSelector((state) => state.cards);
  // достаем из ссылки айди карточки на которую нажал пользователь
  const { uid } = useParams();
  // делаем стейт карточки чтобы при условии что когда мы её найдем в useEffecte наша карточка отрендарилась и отобразила данные
  let [card, setCard] = useState({});
  useEffect(() => {
    // ищем в массиве всех карточке по id нашу, и закидываем её в стейт для отоброжения
    setCard(cards.find((el) => el.uid === String(uid)));
  });
  return (
    <div className="fullCardInfo">
      <div className="fullCardInfo_info"></div>
      <div className="fullCardInfo__description">
        <h2 className="fullCardInfo__title">{card?.title}</h2>
        <p className="fullCardInfo_header">Описание просьбы:</p>
        <p className="fullCardInfo__subtitle">{card?.description}</p>
        <p className="fullCardInfo_header">Адрес места:</p>
        <p className="fullCardInfo__subtitle">{card?.loaction?.strLoc}</p>
        <p className="fullCardInfo__subtitle">
          Желательно закончить до:{card.finishData}
        </p>
      </div>
    </div>
  );
}
