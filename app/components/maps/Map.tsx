import React, { useState, useEffect, createContext, Dispatch, SetStateAction } from 'react';
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

//contextを作成

// type Center_Context_Value = {
//   center: MapCenterType,
//   setCenter: Dispatch<SetStateAction<MapCenterType>>
// }
// export const CenterContext = createContext({} as Center_Context_Value)

type Zoom_Context_Value = {
  zoom: number,
  setZoom: Dispatch<SetStateAction<number>>
}
export const ZoomContext = createContext({} as Zoom_Context_Value)

export const Map: React.FC = () => {
  const InitialCenter = { lat: 48.856614, lng: 2.3522219 };
  // const [center, setCenter] = useState<MapCenterType>(initialcenter);
  // //Contextでの共有用
  // const CenterValue = { center, setCenter };

  const [zoom, setZoom] = useState<number>(6.0);
  const ZoomValue = { zoom, setZoom }

  // useEffect(function () {

  // })

  return (
    <div className={styles.Googlemap}>
      {/* <CenterContext.Provider value={CenterValue}> */}
      <ZoomContext.Provider value={ZoomValue}>
        <GoogleMapReact
          bootstrapURLKeys={{
            //API_KEYは絶対に直接入力しない　過去のものは変更済み
            key: API_KEY
          }}
          //defaultCenter・defaultZoomは値が固定されるので避けるべき
          defaultCenter={InitialCenter}
          zoom={zoom}
        >
          <CenterPin />
        </GoogleMapReact>
      </ZoomContext.Provider>
      {/* </CenterContext.Provider> */}
    </div>
  )
}
