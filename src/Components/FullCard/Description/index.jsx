import React from 'react';
import { useHistory } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import {
  addInviteFireBaseUser,
  removeInviteFireBaseUser,
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
      case 'Delete Card':
        dispatch(deleteCardFireBase(props.card.uid));
        history.push('/yuorCard');
        break;
      case 'Предложить помощь':
        dispatch(addInviteFireBaseUser(user, props.card));
        dispatch(addInviteFireBaseCard(props.card, user));
        break;
      case 'Отменить предложение':
        dispatch(removeInviteFireBaseUser(user, props.card.uid));
        dispatch(removeInviteFireBaseCard(props.card, user.uid));
        break;
      default:
        console.log('def');
        break;
    }
  };

  return (
    <div className="description_card">
      <p>Титл: {props.card.title}</p>
      <p>Описание: {props.card.description}</p>
      <p>Стоимость: {props.card.price}</p>
      <p>Дата завершения:{props.card.dateFinalTask}</p>
      <p>Локация: {props.card.loaction?.strLoc}</p>
      <button
        type="button"
        onClick={(e) => {
          handlerInvitecard(e);
        }}
      >
        {props.card.author === user.uid
          ? 'Delete Card'
          : props.card.invite?.find((el) => el.uid === user.uid)
          ? 'Отменить предложение'
          : 'Предложить помощь'}
      </button>
    </div>
  );
}
