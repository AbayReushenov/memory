import React from 'react';
import { YMaps, Map, Placemark } from 'react-yandex-maps';

export default function YandexMap(coordinate) {
  return (
    <YMaps>
      <Map state={{ center: coordinate.coordinate, zoom: 10 }}>
        <Placemark geometry={coordinate.coordinate} />
      </Map>
    </YMaps>
  );
}
