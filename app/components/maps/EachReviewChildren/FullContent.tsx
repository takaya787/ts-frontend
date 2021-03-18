import React, { useContext } from 'react';
//Components
import { ReactStars } from '../CenterPinChildren/ReactStars';
//Contexts
import { UserContext } from '../../../pages/_app.js'
import { ReviewContext } from '../EachReview';
import styles from '../EachReview.module.scss'

type FullContentProps = {
  handleClose: VoidFunction,
  handleEdit: VoidFunction
}

export const FullContent: React.FC<FullContentProps> = (props) => {
  const { user } = useContext(UserContext);
  const { review } = useContext(ReviewContext);

  return (
    <div className={styles.contents}>
      <button className={styles.button} onClick={() => props.handleClose()} style={{ zIndex: 10 }}>✕</button>
      <div className={styles.content} style={{ zIndex: 5 }}>
        <p className={styles.content_title} >住み心地</p>
        <p className={styles.content_score}>{review.score}</p>
        <div className={styles.content_star}><ReactStars DefaultValue={review.score} isEdit={false} size={20} /></div>
        <p className={styles.content_title}>滞在理由</p>
        <p className={styles.content_text}>{review.reason}</p>
        <p className={styles.content_title}>滞在期間</p>
        <p className={styles.content_text}>{review.duration}ヵ月</p>
        <p className={styles.content_title}>食生活</p>
        <p className={styles.content_text}>{review.food}</p>
        <p className={styles.content_title}>インフラなどの利便性</p>
        <p className={styles.content_text}>{review.convenient}</p>
        <p className={styles.content_title}>お気に入り</p>
        <p className={styles.content_text}>{review.favorite}</p>
        <p className={styles.content_title}>アドバイス</p>
        <p className={styles.content_text}>{review.advice}</p>
      </div>
      {/* reviewの編集ボタンはUserとcurrentUserが等しい時のみ表示 */}
      {user.id === review.user_id && (
        <button className={styles.editbutton} onClick={() => props.handleEdit()} style={{ zIndex: 10 }}>編集する</button>
      )}
    </div>
  )
}
