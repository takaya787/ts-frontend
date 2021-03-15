import { Dispatch, SetStateAction, useState } from 'react';
import { MapCenterType } from '../../types/MapType';
import styles from './CenterPin.module.scss';

const markerStyle = {
  height: 20,
  width: 20,
  backgroundColor: 'red',
  cursor: 'pointer',
  zIndex: 3,
};
const hoverStyle = {
  height: 20,
  width: 20,
  backgroundColor: 'blue',
  cursor: 'pointer',
  zIndex: 3,
};

type CeneterChildrenProps = {
  $hover: boolean,
  lat: number,
  lng: number,
  setCenter: Dispatch<SetStateAction<MapCenterType>>
}

export const CenterPin: React.FC<CeneterChildrenProps> = ({ $hover, lat, lng }) => {

  const style = $hover ? hoverStyle : markerStyle;
  return (
    <div className={styles.marker} style={style} ></div>)
}
