import { useForm } from 'react-hook-form';
import { Auth } from '../../modules/auth';
//react-iconsをダウンロード
import { SiGooglemaps } from 'react-icons/si';
import { GiMagnifyingGlass } from 'react-icons/gi';
//types
import { MapCenterType, SearchWindowValue, SearchData, SearchWindowProps } from '../../types/MapType'
import styles from './SearchWindow.module.scss'

const BASE_URL = `${process.env.NEXT_PUBLIC_BASE_URL}reviews/check`

export const SearchWindow: React.FC<SearchWindowProps> = ({ setMapCenter }) => {
  //react-hook-formから使用
  const { register, handleSubmit } = useForm();

  const onSubmit = (value: SearchWindowValue): void => {
    console.log(value);
    fetch(BASE_URL, {
      method: 'POST', // or 'PUT'
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${Auth.getToken()}`
      },
      body: JSON.stringify({
        keyword: value.keyword
      }),
    })
      .then((response): PromiseLike<SearchData> => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json()
      })
      .then((data: SearchData) => {
        // console.log(data.lat);
        setMapCenter({ lat: data.lat, lng: data.lng });
        // setZoom(6.5);
      })
      .catch((error) => {
        console.error('Error:', error);
      });
  }
  return (
    <div id={styles.check}>
      <form className={styles.check} onSubmit={handleSubmit(onSubmit)}>
        <div className={styles.check_icon}>
          <SiGooglemaps size={16} />
        </div>
        <input
          className={styles.check_input}
          id="keyword"
          name="keyword"
          placeholder="場所を入力..."
          ref={register({ required: '入力してください' })}
        />
        <button className={styles.check_submit} type="submit" name="submit"><GiMagnifyingGlass size={16} />
        </button>
      </form>
    </div>
  )
}
