import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';

export default function FullCard() {
  // достаем из глобального стейта все карточки для поиска той, которая нам нужна
  const cards = useSelector((state) => state.cards);
  // достаем из ссылки айди карточки на которую нажал пользователь
  const { id } = useParams();
  // делаем стейт карточки чтобы при условии что когда мы её найдем в useEffecte наша карточка отрендарилась и отобразила данные
  let [card, setCard] = useState({});

  useEffect(() => {
    // ищем в массиве всех карточке по id нашу, и закидываем её в стейт для отоброжения
    setCard(cards.find((el) => String(el.id) === String(id)))
  });
  return <div>{card.author}</div>;
}
