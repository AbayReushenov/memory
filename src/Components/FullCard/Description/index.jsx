import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { addInviteFireBase } from '../../../redux/actionCreators/userAction';
import './styles.css';

export default function DescriptionCard(props) {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);
  const handlerInvitecard = () => {
    dispatch(addInviteFireBase(user, props.card));
  };
  return (
    <div className="description_card">
      <p>Титл: {props.card.title}</p>
      <p>Описание: {props.card.description}</p>
      <p>Стоимость: {props.card.price}</p>
      <p>Дата завершения:{props.card.dateFinalTask}</p>
      <p>Локация: {props.card.loaction?.strLoc}</p>
      <button type="button" onClick={handlerInvitecard}>
        {props.card.invite
          ? props.card.invite.find((el) => el === user.uid)
            ? 'Отменить предложение'
            : 'Предложить помощь'
          : 'Предложить помощь'}
      </button>
    </div>
  );
}
