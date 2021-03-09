import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { changeFireBaseCard } from '../../../redux/actionCreators/cardsActions';
import { addWorkerToUserFireBase } from '../../../redux/actionCreators/userAction';
import firebase from 'firebase';
import { useCollectionData } from 'react-firebase-hooks/firestore';
import './styles.css';

export default function ChatCard(props) {
  const [value, setValue] = useState('');
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const messagesRef = firebase
    .firestore()
    .collection('chats')
    .doc(props.card.uid);
  const [messages] = useCollectionData(messagesRef.collection('messages').orderBy('time'));

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
      authorUid: user.uid,
      name: user.name,
      message: value,
      time: firebase.firestore.FieldValue.serverTimestamp(),
    });
    setValue('');
  };

  switch (props.card.status) {
    case 'search':
      if (user.uid === props.card.author && props.card.status === 'search') {
        return (
          <ul className="card_chat">
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
        return (
          <div className="card_chat">
            <div className="chat_user_action">
              <input
                className="chat_user_input"
                onChange={(e) => setValue(e.target.value)}
                value={value}
              />
              <button
                className="chat_user_send_msg"
                onClick={(e) => handlerClick(e)}
              >
                отправить
              </button>
            </div>
            <ul className="chat_card_list">
              {messages?.map((el) => (
                <li
                  className={`chat_card_msg
                  ${
                    el.authorUid === user.uid
                      ? 'chat_card_msg_author'
                      : 'chat_card_msg_user'
                  }  `}
                  key={el.time}
                >
                  <div
                    className={`chat_card_info
                  ${
                    el.authorUid === user.uid
                      ? 'chat_card_msg_author'
                      : 'chat_card_msg_user'
                  }`}
                  >
                    <p className="chat_card_user_name">name:{el.name}</p>
                    <p className="chat_card_user_time">time:{el?.time?.toDate().toLocaleDateString('ru-RU')}</p>
                  </div>
                  <p className="chat_card_user_msg">mess:{el.message}</p>
                </li>
              ))}
            </ul>
          </div>
        );
      }
      return <h1>К сожалению мы уже работаем</h1>;
  }
}
