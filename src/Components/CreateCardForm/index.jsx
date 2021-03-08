import React, { useState } from 'react';
import './styles.css';
import { useHistory } from 'react-router-dom';
import Description from './Description';
import Task from './Task';
import { useDispatch, useSelector } from 'react-redux';
import { addCardFireBase } from '../../redux/actionCreators/cardsActions'

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
    dispatch(addCardFireBase({ task, titleCard, descriptionCard, locationCard, dateFinalTask, priceCard, user }));
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
