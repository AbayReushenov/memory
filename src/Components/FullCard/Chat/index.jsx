import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { changeFireBaseCard } from '../../../redux/actionCreators/cardsActions';
import { addWorkerToUserFireBase } from '../../../redux/actionCreators/userAction';
import firebase from 'firebase';
import { useCollectionData } from 'react-firebase-hooks/firestore'
import './styles.css';

export default function ChatCard(props) {
  const [value, setValue] = useState('');
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const messagesRef = firebase.firestore().collection('chats').doc(props.card.uid)
  const [messages] = useCollectionData(
    messagesRef.collection('messages')
  );

  const handleConfimInvite = (userInviter) => {
    dispatch(
      changeFireBaseCard(props.card, {
        status: 'work',
        worker: userInviter.uid,
      }),
    );
    dispatch(addWorkerToUserFireBase(user, props.card));
  };

  const handlerClick = async (e) => {
    e.preventDefault();
    await messagesRef.collection('messages').add({
      name: user.name,
      message: value,
      time: firebase.firestore.FieldValue.serverTimestamp(),
    })
    setValue('');
  }

  switch (props.card.status) {
    case 'search':
      if (user.uid === props.card.author) {
        return (
          <ul>
            {props.card.invite?.map((el) => {
              return (
                <li key={el.uid}>
                  {el.name}{' '}
                  <button
                    type="button"
                    onClick={() => {
                      handleConfimInvite(el);
                    }}
                  >
                    Принять Инвайт
                  </button>
                </li>
              );
            })}
          </ul>
        );
      }
      return <h1>Тут будет чат</h1>;
    default:
      if (user.uid === props.card.worker || user.uid === props.card.author) {
        return <div>
          {value}
          <form>
            <input onChange={(e) => setValue(e.target.value)} value={value} /><button onClick={(e) => handlerClick(e)}>отправить</button>
          </form>
          <ul>
            CHAT:
            {messages?.map(el =>
            < li key={el.time} >
              <p>name:{el.name}</p>
              <p>time:{el?.time?.toDate().toLocaleDateString('ru-RU')}</p>
              <p>mess:{el.message}</p>
            </li>
          )}
          </ul>
        </div >
      }
      return <h1>К сожалению мы уже работаем</h1>;
  }
}
