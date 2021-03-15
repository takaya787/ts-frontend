import { useEffect, useState, createContext, Dispatch, SetStateAction } from 'react';
//types
import { MapCenterType } from '../../types/MapType';
//others
import styles from './CenterPin.module.scss';

//contextを作成
type Center_Context_Value = {
  center: MapCenterType,
  setCenter: Dispatch<SetStateAction<MapCenterType>>
}
export const CenterContext = createContext({} as Center_Context_Value)

export const CenterPin: React.FC<any> = ({ $geoService }) => {
  //投稿作成時の位置情報は,このcenterを使用する
  const [center, setCenter] = useState<MapCenterType>()
  const CenterValue = {
    center, setCenter
  }

  const mapCenter: MapCenterType = $geoService.transform_.center;

  //中心地が変わるごとにcenterの値を更新
  useEffect(function () {
    setCenter(mapCenter)
    // console.log(mapCenter)
  }, [mapCenter])
  return (
    <CenterContext.Provider value={CenterValue}>
      <div className={styles.marker} ></div>
    </CenterContext.Provider>
  )
}
