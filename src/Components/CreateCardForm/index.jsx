import React, { useState } from 'react';
import './styles.css';
import YandexMaps from '../YandexMap';

export default function CreateCardForm() {
  const [location, setLocation] = useState([]);
  const [coordinate, setCoordinate] = useState(['55.827803', '37.293227']);

  const handlerClickCheckAdres = async (adres) => {
    const url = `https://geocode-maps.yandex.ru/1.x/?geocode=${adres}&apikey=6321111e-95db-480c-9b0a-002b9b89e86c&format=json`;
    const result = await fetch(url);
    const a = await result.json();
    console.log(a);

    setLocation(a.response.GeoObjectCollection.featureMember);
    console.log(coordinate);
  };

  return (
    <form className="createCardForm">
      <h2>Создадим запрос о Помощи Близким?</h2>
      <input
        className="createCardForm__input"
        type="text"
        placeholder="Заголовок=Призыв"
        name="title"
      />
      <input
        className="createCardForm__input"
        type="text"
        placeholder="описание"
        name="subtitle"
      />
      <div className="serach_-location">
        <input
          type="text"
          className="createCardForm__input"
          onChange={(e) => {
            handlerClickCheckAdres(e.target.value);
          }}
          placeholder="адрес"
          name="location"
        />
        <select
          name="location__chouse"
          onChange={(e) => {
            setCoordinate(e.target.value.split(' ').reverse());
          }}
        >
          {location.map((el) => (
            <option
              key={el.GeoObject.description}
              value={el.GeoObject.Point.pos}
            >
              {el.GeoObject.description}
              {el.GeoObject.name}
            </option>
          ))}
        </select>
      </div>
      <YandexMaps coordinate={coordinate} />
      <button type="button">Сброс</button>
      <button type="submit">Отправить</button>
    </form>
  );
}
