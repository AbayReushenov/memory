import React, { useState } from 'react';
import './styles.css';
import Description from './Description';
import Task from './Task';

export default function index() {
  const [visualityState, setvisualityState] = useState(false);
  // титл обяьвления
  const [titleCard, setTitleCard] = useState('');
  // описание обьявления
  const [descriptionCard, setDescriptionCard] = useState('');
  // локация обявления
  const [locationCard, setLocationCard] = useState({});
  // контрольная дата до кого числа надо сделать
  const [dateFinalTask, setdateFinalTask] = useState('');
  // стоимость задачи
  const [priceCard, setpriceCard] = useState(0);
  const handlerSendCard = (task) => {
    const data = {
      id: Date.now().toString(),
      title: titleCard,
      description: descriptionCard,
      loaction: locationCard,
      task,
      dateFinalTask,
      price: priceCard,
      inviteUser: [],
      chat: [],
      status: false
    };
    console.log(data);
  };
  return (
    <div>
      {visualityState ? (
        <Task
          setdateFinalTask={setdateFinalTask}
          setpriceCard={setpriceCard}
          handlerSendCard={handlerSendCard}
        />
      ) : (
        <Description
          setTitleCard={setTitleCard}
          setDescriptionCard={setDescriptionCard}
          setLocationCard={setLocationCard}
          setvisualityState={setvisualityState}
        />
      )}
    </div>
  );
}
