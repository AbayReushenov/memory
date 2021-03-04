import React, { useState } from 'react';
import './styles.css';
import YandexMaps from '../YandexMap';

export default function CreateCardForm() {
  const [location, setLocation] = useState([]);
  const [coordinate, setCoordinate] = useState(['55.827803', '37.293227']);

  const handlerClickCheckAdres = async (adres) => {
    if (adres !== '') {
      const url = `https://geocode-maps.yandex.ru/1.x/?geocode=${adres}&apikey=6321111e-95db-480c-9b0a-002b9b89e86c&format=json`;
      const result = await fetch(url);
      const a = await result.json();
      setLocation(a.response.GeoObjectCollection.featureMember);
    } else {
      setLocation([]);
    }
  };

  return (
    <form className="createCardForm">
      <h2 className="createCardForm__title">
        Создадим запрос о Помощи Близким?
      </h2>
      <input
        className="createCardForm__input"
        type="text"
        placeholder="Заголовок"
        name="title"
      />
      <input
        className="createCardForm__input"
        type="text"
        placeholder="описание"
        name="subtitle"
      />
      <input
        type="text"
        className="createCardForm__input"
        onChange={(e) => {
          handlerClickCheckAdres(e.target.value);
        }}
        placeholder="адрес"
        name="location"
      />
      {location.length > 1 && (
        <select
          className="city__chouse"
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
      )}
      <YandexMaps coordinate={coordinate} />
      <button type="submit">Отправить</button>
    </form>
  );
}
