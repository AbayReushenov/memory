import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import ChatCard from './Chat';
import DescriptionCard from './Description';
import TaskCard from './Task';

import './styles.css';

export default function FullCard() {
  const cards = useSelector((state) => state.cards);
  // достаем из ссылки айди карточки на которую нажал пользователь
  const { uid } = useParams();
  // делаем стейт карточки чтобы при условии что когда мы её найдем в useEffecte наша карточка отрендарилась и отобразила данные
  let [card, setCard] = useState({});
  // чат с пользователями кто кинул инвайт
  useEffect(async () => {
    // ищем в массиве всех карточке по id нашу, и закидываем её в стейт для отоброжения
    setCard(cards.find((el) => el.uid === String(uid)));
  });

  return (
    <div className="cardInfo">
      <DescriptionCard card={card} />
      <TaskCard card={card} />
      <ChatCard card={card} />
    </div>
  );
}
