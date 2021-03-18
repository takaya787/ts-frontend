import React, { createContext, useState } from 'react';
//components
import { FullContent } from './EachReviewChildren/FullContent';
import { ReviewEdit } from './EachReviewChildren/ReviewEdit';
//types
import { ReviewValueType, ReviewType } from '../../types/ReviewType'
//others
import styles from './EachReview.module.scss';

//context 作成
export const ReviewContext = createContext({} as ReviewValueType)

export const EachReview: React.FC<ReviewType> = (props) => {
  const [reviewopen, setReviewOpen] = useState<boolean>(false);
  const [editopen, setEditOpen] = useState<boolean>(false);

  //reviewをopenするボタン
  const handleReview = () => {
    setReviewOpen(!reviewopen);
    setEditOpen(false);
  }

  //edit formをopenするボタン
  const handleEdit = () => {
    setEditOpen(true);
    setReviewOpen(false);
  }
  //closeボタンは共通
  const handleClose = () => {
    setReviewOpen(false);
    setEditOpen(false);
  }

  //ReviewContextのvalueを設定
  const ReviewValue: ReviewValueType = {
    review: {
      id: props.id,
      reason: props.reason,
      duration: props.duration,
      food: props.food,
      convenient: props.convenient,
      favorite: props.favorite,
      score: props.score,
      advice: props.advice,
      //ここから位置情報
      lat: props.lat,
      lng: props.lng,
      user_id: props.user_id,
    }
  }
  return (
    <ReviewContext.Provider value={ReviewValue}>
      <div className={styles.each_review} onClick={() => handleReview()} style={{ zIndex: 1 }}></div>
      {reviewopen && (
        <FullContent
          handleClose={handleClose}
          handleEdit={handleEdit}
        />
      )}
      {editopen && (
        <ReviewEdit
          handleClose={handleClose}
        />
      )}
    </ReviewContext.Provider>
  )
}
