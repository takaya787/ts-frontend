import { useContext } from 'react'
import { useForm } from 'react-hook-form';
import { useRouter } from 'next/router';
import { Auth } from '../../modules/Auth'
//contexts
import { UserContext } from '../../pages/_app';
//types
import { LoginValueType, UserLoginType } from '../../types/UserType'

import styles from './Form.module.scss';

const endpoint = process.env.NEXT_PUBLIC_BASE_URL + 'login'

type LoginFormProps = {
  Closemodal: VoidFunction
}

export const LoginForm: React.FC<LoginFormProps> = ({ Closemodal }) => {
  const router = useRouter()
  const { register, handleSubmit } = useForm();
  // appからcontextsを受け取る
  const { setUser } = useContext(UserContext);
  const onSubmit = (value: LoginValueType) => {
    fetch(endpoint, {
      method: 'POST', // or 'PUT'
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        email: value.email,
        password: value.password,
      }),
    })
      .then(response => response.json())
      .then((data): UserLoginType => {
        console.log('response data')
        console.log(data);
        if (data.error) {
          // console.log(data.error);
          alert(data.error);
          // Closemodal()
          return
        }
        // console.log(data.token);
        console.log('Logined successfully');
        //Login関連の処理 context使用
        Auth.login(data.token);
        const user_data = data.user
        setUser({ id: user_data.id, email: user_data.email, name: user_data.name });
        Closemodal()
        //Login関連の処理 終了
        // router.push('/reviews/new');
      })
      .catch((error) => {
        console.error('Error:', error);
      });
  }
  return (
    <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
      <label className={styles.label} htmlFor="email">Eメール</label>
      <input
        id="email"
        className={styles.form_input}
        name="email"
        type="email"
        ref={register({ required: 'emailは必須です' })}
      />
      <label className={styles.label} htmlFor="password">パスワード</label>
      <input
        id="password"
        className={styles.form_input}
        type="password"
        name="password"
        ref={register({ required: 'passwordは必須です' })}
      />
      <button type="submit" className={styles.form_submit}>ログイン</button>
    </form>
  )
}
