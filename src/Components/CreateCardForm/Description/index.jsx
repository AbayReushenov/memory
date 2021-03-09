import React, { useState, useEffect, useCallback } from 'react';
import YandexMaps from '../../YandexMap';

export default function DescriptionCard(props) {
  const [location, setLocation] = useState([]);
  const [cardAdress, setcardAdress] = useState('');
  const [coordinate, setCoordinate] = useState(['55.827803', '37.293227']);

  const handlerClickCheckAdres = useCallback(
    async (adres) => {
      console.log(cardAdress, adres);
      
      if (adres !== '') {
        const url = `https://geocode-maps.yandex.ru/1.x/?geocode=${adres}&apikey=6321111e-95db-480c-9b0a-002b9b89e86c&format=json`;
        const result = await fetch(url);
        const a = await result.json();
        console.log(a);
        setLocation(a.response.GeoObjectCollection.featureMember);
      } else {
        setLocation([]);
      }
    },
    [cardAdress],
  );

  useEffect(() => {
    handlerClickCheckAdres(cardAdress);
  }, [cardAdress]);


  return (
    <div className="createCardForm">
      <h2 className="createCardForm__title">
        Создадим запрос о Помощи Близким?
      </h2>
      <input
        className="createCardForm__input"
        type="text"
        onChange={(e) => {
          props.setTitleCard(e.target.value);
        }}
        placeholder="Заголовок"
        name="title"
      />
      <input
        className="createCardForm__input"
        type="text"
        placeholder="Описание"
        onChange={(e) => {
          props.setDescriptionCard(e.target.value);
        }}
        name="subtitle"
      />
      <input
        type="text"
        value={cardAdress}
        className="createCardForm__input"
        onChange={(e) => {
          setcardAdress(e.target.value);
        }}
        placeholder="Адрес"
        name="location"
      />
      {location.length > 1 && (
        <select
          className="city__chouse"
          name="location__chouse"
          onChange={(e) => {
            props.setLocationCard({
              strLoc: e.target.textContent,
              arLoc: e.target.value.split(' ').reverse(),
            });
            setCoordinate(e.target.value.split(' ').reverse());
          }}
        >
          {location.map((el, i) => (
            <option key={i} value={el.GeoObject.Point.pos}>
              {el.GeoObject.metaDataProperty.GeocoderMetaData.Address.formatted}
            </option>
          ))}
        </select>
      )}
      <YandexMaps coordinate={coordinate} />
      <button
        type="button"
        onClick={() => {
          props.setvisualityState((prev) => (prev = !prev));
        }}
      >
        Продолжить
      </button>
    </div>
  );
}
