import React from 'react';
import './styles.css';
import articleOne from '../../image/Articelone.png';
import articleTwo from '../../image/Articeltwo.png';
import articleThree from '../../image/Articeltwo.png';
import mainLogo from '../../image/logo_project.png';

export default function About() {
  return (
    <div className="about">
      <img
        src={mainLogo}
        alt="Главный Логотип"
        className="about__promo_main_logo"
      />
      <div className="about__promo">
        <article className="about_promo_card">
          <img className="promo_card_logo" src={articleOne} alt="Card_logo" />
          <div className="promo_card_info">
            <p className="card_info_title">Просто и удобно</p>
            <p className="card_info_subtitle">
              Вы выбираете исполнителя и назначаете вознаграждение
            </p>
          </div>
        </article>
        <article className="about_promo_card">
          <img className="promo_card_logo" src={articleTwo} alt="Card_logo" />
          <div className="promo_card_info">
            <p className="card_info_title">Безопасная сделка</p>
            <p className="card_info_subtitle">
              Вознаграждение перечисляется после приема работы по фото
            </p>
          </div>
        </article>
        <article className="about_promo_card">
          <img className="promo_card_logo" src={articleThree} alt="Card_logo" />
          <div className="promo_card_info">
            <p className="card_info_title">Бережем природу</p>
            <p className="card_info_subtitle">
              Для уборки применяются только экологичные средства
            </p>
          </div>
        </article>
      </div>
    </div>
  );
}
