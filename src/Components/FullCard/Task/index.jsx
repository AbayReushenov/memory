import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { changeFireBaseCard } from '../../../redux/actionCreators/cardsActions';
import firebase from 'firebase';

import './styles.css';

export default function TaskCard(props) {
  // const [images, setImages] = useState(props.card.images ? props.card.images : []);
  const messageDb = firebase.firestore();
  const dispatch = useDispatch();
  const user = useSelector(state => state.user)
  const handlerClick = (index) => {
    const taskForChangeStatus = props.card.task[index];
    dispatch(changeFireBaseCard(props.card, {
      task: props.card.task.map((el, i) => {
        if (i === index) {
          el.status = !el.status
          return el;
        }
        return el
      })
    }));

    messageDb.collection('chats').doc(props.card.uid).collection('messages').add({
      name: 'Информация',
      time: firebase.firestore.FieldValue.serverTimestamp(),
      message: `Исполнитель поменял статус задачи ${taskForChangeStatus.title} на ${taskForChangeStatus.status ? 'выполнено' : 'не выполнено'}`
    })
  }

  return (
    <ul className="task_card_list">
      <h2 className="task_card_status_card">
        {props.card.status === 'search'
          ? 'Мы в поиске лучшего исполнителя'
          : props.card.status === 'work'
          ? `Исполнитель: ${props.card.worker.name} приступил к работе`
          : `Ваши работы завершены, Оставьте отзыв ${
              props.card.author === user.uid ? 'Работнику' : 'Заказчику'
            }`}
      </h2>
      {props.card.task?.map((el, i) => {
        return (
          <li
            className={`task_card__item ${
              el.status ? 'task_card__item_finish' : 'task_card__item_inWork'
            }`}
            key={i}
          >
            {el.title}
            {props.card.status === 'work' ? (
              <button
                className="task_card__comleted_btn"
                onClick={() => {
                  handlerClick(i);
                }}
              >
                {el.status ? 'Готово' : 'Выполнить'}
              </button>
            ) : (
              ''
            )}
          </li>
        );
      })}
    </ul>
  );
}
