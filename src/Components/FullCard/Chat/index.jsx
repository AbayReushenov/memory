import React from 'react';
import { useSelector } from 'react-redux';
import './styles.css';

export default function ChatCasrd(props) {
  const user = useSelector((state) => state.user);
  switch (props.status) {
    case 'work':
      if (user.uid === props.card.worker) {
        return <h1>chat</h1>;
      }
      return <h1>К сожалению мы уже работаем</h1>;
    case 'finish':
      if (user.uid === props.card.author) {
        return <h1>chat</h1>
      }
      return <h1>finish card</h1>;
    default:
      if (user.uid === props.card.author) {
        return <h1>письма для инвайта</h1>
      }
      if (props.card.invite && props.card.invite.find(el => el === user.uid)) {
        return <h2>Письмо для отмены инвайта</h2>
      }
      return <h2>Письмо для инвайта</h2>;
  }
}
