import { useState, useContext } from 'react';
import { useForm } from 'react-hook-form';
import { Auth } from '../../../modules/Auth';
//mutateでkeyを元に更新できる
import { mutate } from 'swr';
//components
import { ReactStars } from '../CenterPinChildren/ReactStars';
//Hooks
import { ReviewsUrl } from '../../../hooks/useReviewsSWR';
//types
import { ReviewFormValue } from '../../../types/ReviewType'
//others
import { ReviewContext } from '../EachReview'
//ReviewFormのcssをそのまま適用
import styles from '../CenterPinChildren/ReviewForm.module.scss';

type ReviewEditProps = {
  handleClose: VoidFunction
}

export const ReviewEdit: React.FC<ReviewEditProps> = ({ handleClose }) => {
  //EachReviewからreview情報を受け取る
  const { review } = useContext(ReviewContext);
  //ReviewEditの送信先URL
  const EditUrl = `${process.env.NEXT_PUBLIC_BASE_URL}reviews/${review.id}`

  //scoreをReviewStarsから入力するためにstateを用いる
  const [score, setScore] = useState<number>(review.score);

  const { register, handleSubmit } = useForm();

  const onSubmit = (value: ReviewFormValue): void => {
    // console.log(value.title);
    fetch(EditUrl, {
      method: 'POST', // or 'PUT'
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${Auth.getToken()}`
      },
      body: JSON.stringify({
        review: {
          reason: value.reason,
          duration: value.duration,
          food: value.food,
          convenient: value.convenient,
          favorite: value.favorite,
          advice: value.advice,
          score: value.score
        },
      }),
    })
      .then(response => response.json())
      .then(data => {
        console.log(data);
        if (data.errors) {
          console.log(data.errors);
          return
        }
        console.log('Review is successfully created');
        //review_dataを更新する
        mutate(ReviewsUrl);
        //投稿後にFormを閉じる
        handleClose();
      })
      .catch((error) => {
        console.error('Error:', error);
      });
  }
  return (
    <div className={styles.draft}>
      <button className={styles.draft_button} onClick={handleClose}>✕</button>
      <form
        className={styles.draft_form}
        style={{ overflowY: 'scroll' }}
        onSubmit={handleSubmit(onSubmit)}
      >
        <h3 className={styles.title}>投稿内容を入力してください</h3>
        <label htmlFor="reason">滞在理由について(30字以内）<span className="required">＊必須</span></label><br />
        <textarea className={styles.form} name="reason" id="reason"
          ref={register({ required: '滞在理由は必須です' })}
          placeholder="滞在した理由や目的について"
          defaultValue={review.reason}
        />

        <label className={styles.labelnumber} htmlFor="duration">滞在期間(月)<span className="required">＊数字のみ入力</span></label><br />
        <input className={`${styles.form} ${styles.number}`} type="number" name="duration" id="duration" ref={register({ required: '滞在期間は必須です' })} defaultValue={review.duration} /><br />

        <label htmlFor="food">食生活について(150字以内)</label>
        <textarea className={`${styles.form} ${styles.textarea}`} name="food" id="food" ref={register()}
          placeholder="(例)　スーパーマーケットの食材は安くて重宝したが、外食とアルコール類が非常に高くて、驚いた。　など"
          defaultValue={review.food}
        />

        <label htmlFor="convenient">利便性について(150字以内)</label>
        <textarea className={`${styles.form} ${styles.textarea}`} name="convenient" ref={register()}
          placeholder="(例)　電車、地下鉄、モノレールがあって、交通便はとても便利だった。特にバスは市内の至るところに繋がっているので、市内なら車はいらなかった。　など"
          id="convenient" defaultValue={review.convenient}
        />

        <label htmlFor="favorite">お気に入り(150字以内）</label>
        <textarea className={`${styles.form} ${styles.textarea}`} name="favorite" id="favorite" ref={register()} placeholder="(例)　世界自然遺産のBlue Mountainの景色が素晴らしかった。また、きれいなBeachが多いので、友達とよく行った。　など" defaultValue={review.favorite} />

        <label htmlFor="advice">次に来る人へのアドバイス(150字以内)</label>
        <textarea className={`${styles.form} ${styles.textarea}`} name="advice" id="review_advice" ref={register()} placeholder="(例) パートタイムで仕事を見つけたいなら、ColesやWoolworthなどのスーパーマーケットは見つかりやすい。　など" defaultValue={review.advice} />

        <label htmlFor="score">住み心地はいかがでしたか？　<span className="required">＊必須</span></label>
        <ReactStars
          parentscoreChange={setScore}
          size={25}
        // isEdit={true}
        // DefaultValue={3}
        />
        {/*　scoreformは隠し要素にして問題ないはず */}
        <input className="form" type="hidden" name="score" id="score" value={score} ref={register()} />

        <input className={styles.form_submit} type="submit" value="投稿を送信" />
      </form>
    </div>
  )
}
