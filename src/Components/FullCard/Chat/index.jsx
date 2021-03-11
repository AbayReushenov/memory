import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { changeFireBaseCard } from '../../../redux/actionCreators/cardsActions';
import { addWorkerToUserFireBase } from '../../../redux/actionCreators/userAction';
import firebase from 'firebase';
import { useCollectionData } from 'react-firebase-hooks/firestore';
import './styles.css';
import Stars from '../../../image/performens/star.png';

export default function ChatCard(props) {
  const [value, setValue] = useState('');
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const messagesRef = firebase
    .firestore()
    .collection('chats')
    .doc(props.card.uid);
  const [messages] = useCollectionData(
    messagesRef.collection('messages').orderBy('time'),
  );

  const handleConfimInvite = (userInviter) => {
    dispatch(
      changeFireBaseCard(props.card, {
        status: 'work',
        worker: userInviter,
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
          <ul className="card_chat_invite_msg">
            {props.card.invite?.map((el) => {
              return (
                <li className="card_chat_invite_list" key={el.uid}>
                  <article className="card_chat_invite_card">
                    <h2 className="card_chat_invite_title">{el.name}</h2>
                    <div className="card_chat_invite_info">
                      <div className="card_chat_invite_reiting">
                        <img
                          className="card_chat_invite_stars"
                          src={Stars}
                          alt="Иконка зведы в рейтинге"
                        />
                        <p className="card_chat_invite_stars_value">84</p>
                      </div>
                      <p className="card_chat_invite_feedback">140 отзывов</p>
                    </div>
                    <img
                      className="card_chat_invite_img"
                      src={el.avatar}
                      alt="Фото исполнителя"
                    />
                    <button
                      className="card_chat_invite_msg_btn"
                      type="button"
                      onClick={() => {
                        handleConfimInvite(el);
                      }}
                    >
                      Принять Инвайт
                    </button>
                  </article>
                </li>
              );
            })}
          </ul>
        );
      }
      return (
        <h1 className="card_chat_invite_msg">
          Так получилось что близкие усопшего больше не могут приходить на
          кладбище.Если Вы готовы сопереживать другим людям.Если Вы готовы
          отвлечься от своих забот.Если Вы готовы помочь другим людям. Помогите
          тем кто в ней нуждается.
        </h1>
      );
    default:
      if (
        user?.uid === props.card?.worker?.uid ||
        user?.uid === props?.card?.author
      ) {
        return (
          <div id="card_chat" className="card_chat">
            <ul id="chat_card_list" className="chat_card_list">
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
                    <p className="chat_card_msg_info">
                      {el.name} {el?.time?.toDate().toLocaleDateString('ru-RU')}
                    </p>
                    <p className="chat_card_msg_text">{el.message}</p>
                  </div>
                </li>
              ))}
            </ul>
            <form className="chat_user_action">
              <input
                className="chat_user_input"
                onChange={(e) => setValue(e.target.value)}
                value={value}
              />
              <button
                className="chat_user_send_msg"
                onClick={(e) => handlerClick(e)}
              />
            </form>
          </div>
        );
      }
      return (
        <h1 className="card_chat">
          К счастью мы уже работаем. Но есть ещё много людей кому нужна помощь
        </h1>
      );
  }
}
