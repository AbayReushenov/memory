import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { changeFireBaseCard } from '../../../redux/actionCreators/cardsActions';
import { addWorkerToUserFireBase } from '../../../redux/actionCreators/userAction';
import firebase from 'firebase';
import './styles.css';

export default function ChatCard(props) {
  const messageDb = firebase.firestore();
  const [value, setValue] = useState('');
  const [messages, setMessages] = useState([]);
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();

  useEffect(() => {
    if (props.card) {
      console.log("PROPS INPUT", props.card);
      if (!props.card.chatId) {
        const refToChat = messageDb.collection('chats').doc();
        const refToMessageColl = messageDb.collection('chats').doc(refToChat.id).collection('messages').doc()
        messageDb.collection('chats').doc(refToChat.id).collection('messages').doc(refToMessageColl.id).set({
          name: user.name,
          time: firebase.firestore.FieldValue.serverTimestamp(),
          message: 'welcome'
        })
        dispatch(changeFireBaseCard(props.card, { chatId: refToChat.id }))
      } else {
        const mes = [];
        messageDb.collection('chats').doc(props.card.chatId).collection('messages').get().then((snapshot) => {
          snapshot.forEach(data => {
            mes.push(data.data())
          });
        });
        setMessages(mes)
        console.log('MES', mes);
        console.log('MESSAGES', messages);

      }
    }
  }, [props])

  const handleConfimInvite = (userInviter) => {
    dispatch(
      changeFireBaseCard(props.card, {
        status: 'work',
        worker: userInviter.uid,
      }),
    );
    dispatch(addWorkerToUserFireBase(user, props.card));
  };

  const handlerClick = () => {
    messageDb.collection('chats').doc(props.card.chatId).set({
      name: user.name,
      message: value,
      time: firebase.firestore.FieldValue.serverTimestamp()
    })
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
            <input onChange={(e) => setValue(e.target.value)} value={value} /><button onClick={handlerClick}>отправить</button>
          </form>
          <ul>
            abra
            {console.log(messages.length)}
            {messages?.map(el =>
            < li key={el.time} >
              console.log(el)
              <p>name:{el.name}</p>
              <p>time:{el.time}</p>
              <p>mess:{el.message}</p>
            </li>
          )}
          </ul>
        </div >
      }
      return <h1>К сожалению мы уже работаем</h1>;
  }
}
