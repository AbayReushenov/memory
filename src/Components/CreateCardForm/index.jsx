import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import './styles.css';
import Description from './Description';
import Task from './Task';
import { useDispatch, useSelector } from 'react-redux';
import { addCard } from '../../redux/actionCreators/cardsActions'
import firebase from 'firebase';

export default function FormCreateCard() {
  const history = useHistory();
  const user = useSelector(state => state.user)
  const dispatch = useDispatch();
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
    const newCardId = firebase.database().ref().child('cards').push().key
    const data = {
      uid: newCardId,
      title: titleCard,
      description: descriptionCard,
      loaction: locationCard,
      task,
      dateFinalTask,
      price: priceCard,
      inviteUser: [],
      chat: [],
      status: 'search',
      author: user.uid
    };
    dispatch(addCard(data));
    let updates = {};
    updates['/cards/' + newCardId] = data;
    firebase.database().ref().update(updates);
    history.push('/yuorCard');
  };
  return (
    <div className="createCardForm">
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
