import React from 'react'
import './styles.css';
import Stars from '../../image/performens/star.png'
import User1 from '../../image/performens/ivan.jpg'
import User2 from '../../image/performens/denis.JPG';
import User3 from '../../image/performens/abay1.JPG';
export default function Performers() {
  return (
    <div className="performers">
      <article className="performers_card">
        <h2 className="performers_title">Иван Соснович</h2>
        <div className="performers_info">
          <div className="performers_reiting">
            <img
              className="performers_stars"
              src={Stars}
              alt="Иконка зведы в рейтинге"
            />
            <p className="performers_stars_value">84</p>
          </div>
          <p className="performers_feedback">140 отзывов</p>
        </div>
        <img className="performers_img" src={User1} alt="Фото исполнителя" />
      </article>
      <article className="performers_card">
        <h2 className="performers_title">Денис Есаулов</h2>
        <div className="performers_info">
          <div className="performers_reiting">
            <img
              className="performers_stars"
              src={Stars}
              alt="Иконка зведы в рейтинге"
            />
            <p className="performers_stars_value">114</p>
          </div>
          <p className="performers_feedback">46 отзывов</p>
        </div>
        <img className="performers_img" src={User2} alt="Фото исполнителя" />
      </article>
      <article className="performers_card">
        <h2 className="performers_title">Абай Реушенов</h2>
        <div className="performers_info">
          <div className="performers_reiting">
            <img
              className="performers_stars"
              src={Stars}
              alt="Иконка зведы в рейтинге"
            />
            <p className="performers_stars_value">251</p>
          </div>
          <p className="performers_feedback">247 отзывов</p>
        </div>
        <img className="performers_img" src={User3} alt="Фото исполнителя" />
      </article>
    </div>
  );
}
