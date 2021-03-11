import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import './styles.css';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { addCardFireBase } from '../../redux/actionCreators/cardsActions';

export default function FormCreateCard() {
  const { register, errors, handleSubmit } = useForm();
  const [userHaveMoney, setuserHaveMoney] = useState(false);
  const [location, setLocation] = useState([]);
  const [locationValue, setlocationValue] = useState('');
  const history = useHistory();
  // При вводе пользователя значения в инпут адреса, находим возможные варианты и показываем пользователю для выбора
  const handlerClickCheckAdres = async (userValue) => {
    setlocationValue(() => {
      return userValue;
    });
    if (userValue !== '') {
      const url = encodeURI(
        `https://geocode-maps.yandex.ru/1.x/?geocode=${userValue}&apikey=6321111e-95db-480c-9b0a-002b9b89e86c&format=json&results=20`,
      );
      const result = await (await fetch(url)).json();
      setLocation(result.response.GeoObjectCollection.featureMember);
    } else {
      setLocation([]);
    }
  };
  // получаем стейт полльзователя из стора
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();
  //обрабатываем что пришло с формы после валидации
  const handlerSubmitForm = (formData) => {
    let card = { user };
    let task = [];
    for (let key in formData) {
      if (formData[key] !== '') {
        if (
          key === 'cardTask1' ||
          key === 'cardTask2' ||
          key === 'cardTask3' ||
          key === 'cardTask4' ||
          key === 'cardTask5' ||
          key === 'cardTask6'
        ) {
          task.push({ title: formData[key], status: false });
        }
        card[key] = formData[key];
      }
    }
    card['task'] = task;
    if (user.money < card['price']) {
      setuserHaveMoney(true);
    } else {
      setuserHaveMoney(false);
      dispatch(addCardFireBase(card));
      history.push('/yuorCard');
    }
  };
  return (
    <form className="createCardForm" onSubmit={handleSubmit(handlerSubmitForm)}>
      <h2 className="createCardForm__title">
        Создадим запрос о Помощи Близким?
      </h2>
      <div className="createCardForm_description">
        <label htmlFor="titleCard">Заголовок</label>
        {errors.title && 'Данное поле обязательно'}
        <input
          id="titleCard"
          className="createCardForm__input"
          type="text"
          placeholder="Заголовок"
          name="title"
          ref={register({ required: true })}
        />
        <label htmlFor="subtitleCard">Описание</label>
        {errors.description && 'Данное поле обязательно'}
        <input
          id="subtitleCard"
          className="createCardForm__input"
          type="text"
          placeholder="Описание"
          name="description"
          ref={register({ required: true })}
        />
        <label htmlFor="locationCard">Место захоронения</label>
        {errors.location && 'Данное поле обязательно'}
        <input
          id="locationCard"
          onChange={(e) => {
            handlerClickCheckAdres(e.target.value);
          }}
          type="text"
          value={locationValue}
          className="createCardForm__input"
          placeholder="Адрес"
          ref={register({ required: true })}
          name="location"
        />
        {location.length > 1 && (
          <select
            className="createCardForm__input"
            name="location"
            onChange={(e) => {
              setlocationValue(e.target.selectedOptions[0].textContent);
            }}
          >
            {location.map((el, i) => (
              <option
                key={i}
                className="createCardForm__input"
                value={
                  el.GeoObject.metaDataProperty.GeocoderMetaData.Address
                    .formatted
                }
              >
                {
                  el.GeoObject.metaDataProperty.GeocoderMetaData.Address
                    .formatted
                }
              </option>
            ))}
          </select>
        )}
        <label htmlFor="finishdateCard">До какого числа надо сделать</label>
        {errors.dateFinalTask && 'Данное поле обязательно'}
        <input
          id="finishdateCard"
          type="date"
          className="createCardForm__input"
          placeholder="дата исполнения"
          name="dateFinalTask"
          ref={register({ required: true })}
        />
        <label htmlFor="priceCard">Сумма вознаграждения исполнителя</label>
        {errors.price && 'Больше или ровно 0'}
        <input
          id="priceCard"
          type="number"
          className="createCardForm__input"
          placeholder="сумма вознаграждения"
          defaultValue={0}
          name="price"
          ref={register({ validate: (value) => value >= 0 })}
          />
          {userHaveMoney && 'Не хватает денег на счете'}
        {/* <YandexMaps coordinate={coordinate} /> */}
      </div>
      <div className="createCardForm_task">
        {/* список задач максимум 10 */}
        <label htmlFor="cardTask1">Задача 1</label>
        {errors.cardTask1 && 'должна быть минимум одна задача'}
        <input
          id="cardTask1"
          name="cardTask1"
          className="createCardForm__input"
          type="text"
          ref={register({ required: true })}
        />
        <label htmlFor="cardTask2">Задача 2</label>
        <input
          id="cardTask2"
          name="cardTask2"
          className="createCardForm__input"
          type="text"
          ref={register}
        />
        <label htmlFor="cardTask3">Задача 3</label>
        <input
          id="cardTask3"
          name="cardTask3"
          className="createCardForm__input"
          type="text"
          ref={register}
        />
        <label htmlFor="cardTask4">Задача 4</label>
        <input
          id="cardTask4"
          name="cardTask4"
          className="createCardForm__input"
          type="text"
          ref={register}
        />
        <label htmlFor="cardTask5">Задача 5</label>
        <input
          id="cardTask5"
          name="cardTask5"
          className="createCardForm__input"
          type="text"
          ref={register}
        />
        {/* кнопку надо по середине сделать и активную когда поля заполнены */}
      </div>
      <button className="createCardForm_add_card_btn" type="submit">
        Create
      </button>
    </form>
  );
}
