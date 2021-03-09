import React from 'react';
import './styles.css';

export default function TaskCard(props) {
  return (
    <div className="task_card">
      <ul className="task_card_list">
        {props.card.task?.map((el, i) => {
          return (
            <li
              className={`task_card__item ${
                el.status ? 'task_card__item_finish' : 'task_card__item_inWork'
              }`}
              key={el.uid}
            >
              {i + 1}. {el.value}
              {props.card.status === 'work' ? (
                <button className="task_card__comleted_btn">Comleted</button>
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
