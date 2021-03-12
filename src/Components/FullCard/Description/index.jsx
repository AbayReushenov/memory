import React from 'react';
import { useHistory } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import {
  addInviteFireBaseUser,
  removeInviteFireBaseUser,
  transferMoney,
} from '../../../redux/actionCreators/userAction';
import {
  addInviteFireBaseCard,
  deleteCardFireBase,
  removeInviteFireBaseCard,
} from '../../../redux/actionCreators/cardsActions';
import './styles.css';

export default function DescriptionCard(props) {
  const history = useHistory();
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);

  const handlerInvitecard = (e) => {
    switch (e.target.textContent) {
      case 'Удалить Карточку':
        dispatch(deleteCardFireBase(user, props.card));
        history.push('/yuorCard');
        break;
      case 'Завершить': {
        dispatch(transferMoney(props.card));
        break;
      }
      case 'Предложить помощь':
        dispatch(addInviteFireBaseUser(user, props.card));
        dispatch(addInviteFireBaseCard(props.card, user));
        break;
      case 'Отменить Предложение':
        dispatch(removeInviteFireBaseUser(user, props.card.uid));
        dispatch(removeInviteFireBaseCard(props.card, user.uid));
        break;
      default:
        break;
    }
  };

  return (
    <div className="description_card">
      <p className="description_card_title">{props.card.title}</p>
      <p className="description_card_subtitle">{props.card.description}</p>
      <p className="description_card_price">
        Благодарность при завершении: {props.card.price} Р.
      </p>
      <p className="description_card_finish_date">
        Дата завершения:{props.card.dateFinalTask}
      </p>
      <p className="description_card_location">
        Локация: {props.card.location}
      </p>
      <div className="description_card_action">
        {props.card.author === user.uid && props.card.status === 'search' ? (
          <button
            className="description_card_btn"
            type="button"
            onClick={(e) => {
              handlerInvitecard(e);
            }}
          >
            Удалить Карточку
          </button>
        ) : (
          ''
        )}
        {props.card.author === user.uid && props.card.status === 'work' ? (
          <button
            className="description_card_btn"
            type="button"
            onClick={(e) => {
              handlerInvitecard(e);
            }}
          >
            Завершить
          </button>
        ) : (
          ''
        )}
        {props.card.invite?.find(
          (el) => el.uid === user.uid && props.card.status === 'search',
        )
          ? user.uid !== props.card.author && (
              <button
                className="description_card_btn"
                type="button"
                onClick={(e) => {
                  handlerInvitecard(e);
                }}
              >
                Отменить Предложение
              </button>
            )
          : user.uid !== props.card.author &&
            props.card.status === 'search' && (
              <button
                className="description_card_btn"
                type="button"
                onClick={(e) => {
                  handlerInvitecard(e);
                }}
              >
                Предложить помощь
              </button>
            )}
      </div>
    </div>
  );
}
