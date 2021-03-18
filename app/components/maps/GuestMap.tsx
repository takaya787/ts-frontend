import React, { useState } from 'react';
import GoogleMapReact from 'google-map-react';
//components
import { SearchWindow } from './SearchWindow'
import { EachReview } from './EachReview'
//import Hooks
import { useReviewsSWR } from '../../hooks/useReviewsSWR'
//types
import { MapCenterType } from '../../types/MapType'
//others
import styles from './Map.module.scss';

const API_KEY = process.env.NEXT_PUBLIC_GOOGLE_API_KEY;

export const GuestMap: React.FC = () => {
  const InitialCenter = { lat: 48.856614, lng: 2.3522219 };
  const [Mapcenter, setMapCenter] = useState<MapCenterType>(InitialCenter);
  const [zoom, setZoom] = useState<number>(6.0);

  //全てのレビューを取得する
  const { reviews_data, reviews_error } = useReviewsSWR()

  return (
    <div className={styles.Googlemap}>
      {
        reviews_error && (
          <p>{reviews_error}</p>
        )
      }
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
        {reviews_data && reviews_data.map((review) =>
        (<EachReview
          key={review.id}
          //reviewの内容
          id={review.id}
          reason={review.reason}
          duration={review.duration}
          food={review.food}
          convenient={review.convenient}
          favorite={review.favorite}
          score={review.score}
          advice={review.advice}
          //ここから位置情報
          lat={review.lat}
          lng={review.lng}
          //その他
          user_id={review.user_id}
        />
        ))
        }
      </GoogleMapReact>
    </div>
  )
}
