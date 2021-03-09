import React from 'react';
import { useDispatch } from 'react-redux';
import { changeFireBaseCard } from '../../../redux/actionCreators/cardsActions'
import './styles.css';

export default function TaskCard(props) {
  const dispatch = useDispatch();
  const handlerClick = (task, index) => {
    const card = props.card;
    console.log('CARDDDDD',card);
    dispatch(changeFireBaseCard(card, {
      task: props.card.task.map((el, i) => {
        if (i === index) {
          el.status = !el.status
          return el;
        }
        return el
      })
    }));
  }

  return (
    <div className="task_card">
      <ul className="task_card_list">
        {props.card.task?.map((el, i) => {
          return (
            <li
              className={`task_card__item ${el.status ? 'task_card__item_finish' : 'task_card__item_inWork'
                }`}
              key={el.uid}
            >
              {i + 1}. {el.value}
              {props.card.status === 'work' ? (
                <button className="task_card__comleted_btn" onClick={() => { handlerClick(el, i) }}>{el.status?'UnComplete':'Comleted'}</button>
              ) : (
                ''
              )}
            </li>
          );
        })}
      </ul>
    </div>
  );
}
