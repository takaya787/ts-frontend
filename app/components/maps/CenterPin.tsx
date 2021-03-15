import { useEffect, useState, useContext } from 'react';
//context
//types
import { MapCenterType } from '../../types/MapType';
//others
import styles from './CenterPin.module.scss';

export const CenterPin: React.FC<any> = ({ $geoService }) => {
  const [center, setCenter] = useState<MapCenterType>()
  const mapCenter: MapCenterType = $geoService.transform_.center;
  useEffect(function () {
    setCenter(mapCenter)
    // console.log(mapCenter)
  }, [mapCenter])
  return (<div className={styles.marker} ></div>)
}
