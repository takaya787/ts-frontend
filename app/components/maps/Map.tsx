import React, { useState, useEffect, createContext } from 'react';
import useSWR from 'swr';
import GoogleMapReact from 'google-map-react';
//components
import { CenterPin } from './CenterPin'
//types
import { MapCenterType } from '../../types/MapType'
//others
import styles from './Map.module.scss';

const API_KEY = process.env.NEXT_PUBLIC_GOOGLE_API_KEY;
const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL

export const Map: React.FC = () => {
  const initialcenter = { lat: 48.856614, lng: 2.3522219 };
  const [center, setCenter] = useState<MapCenterType>(initialcenter);
  //Contextでの共有用
  const CenterValue = { center, setCenter };

  const [zoom, setZoom] = useState<Number>(6.0);
  const ZoomValue = { zoom, setZoom }

  // useEffect(function () {

  // })

  return (
    <div className={styles.Googlemap}>
      <GoogleMapReact
        bootstrapURLKeys={{
          //API_KEYは絶対に直接入力しない　過去のものは変更済み
          key: API_KEY
        }}
        //defaultCenter・defaultZoomは値が固定されるので避けるべき
        center={center}
        zoom={zoom}
        yesIWantToUseGoogleMapApiInternals
      /* これをonにしたらfull画面ボタンoffになる */
      //defaultOptions={defaultMapOptions}
      >
        <CenterPin lat={center.lat}
          lng={center.lng}
          setCenter={setCenter} $hover />
      </GoogleMapReact>
    </div>
  )
}
