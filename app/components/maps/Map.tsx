import React, { useState, useEffect, createContext, Dispatch, SetStateAction } from 'react';
import useSWR from 'swr';
import GoogleMapReact from 'google-map-react';
//components
import { CenterPin } from './CenterPin'
import { SearchWindow } from './SearchWindow'
//types
import { MapCenterType } from '../../types/MapType'
//others
import styles from './Map.module.scss';

const API_KEY = process.env.NEXT_PUBLIC_GOOGLE_API_KEY;
const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL

export const Map: React.FC = () => {
  const InitialCenter = { lat: 48.856614, lng: 2.3522219 };
  const [Mapcenter, setMapCenter] = useState<MapCenterType>(InitialCenter);

  const [zoom, setZoom] = useState<number>(6.0);
  // useEffect(function () {

  // })

  return (
    <div className={styles.Googlemap}>
      <SearchWindow setMapCenter={setMapCenter} setZoom={setZoom} />
      <GoogleMapReact
        bootstrapURLKeys={{
          //API_KEYは絶対に直接入力しない　過去のものは変更済み
          key: API_KEY
        }}
        //defaultCenter・defaultZoomは値が固定されるので避けるべき
        center={Mapcenter}
        zoom={zoom}
      >
        <CenterPin />
      </GoogleMapReact>
    </div>
  )
}
