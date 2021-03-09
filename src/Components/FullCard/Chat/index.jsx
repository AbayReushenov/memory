import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { changeFireBaseCard } from '../../../redux/actionCreators/cardsActions';
import { addWorkerToUserFireBase } from '../../../redux/actionCreators/userAction';
import './styles.css';

export default function ChatCard(props) {
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const handleConfimInvite = (userInviter) => {
    dispatch(
      changeFireBaseCard(props.card, {
        status: 'work',
        worker: userInviter.uid,
      }),
    );
    dispatch(addWorkerToUserFireBase(user, props.card));
  };
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
        return <h1>chat</h1>;
      }
      return <h1>К сожалению мы уже работаем</h1>;
  }
}
