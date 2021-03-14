import { useForm } from 'react-hook-form';
import { useRouter } from 'next/router';
import { Auth } from '../../modules/auth'
//contexts
// import { UserContext } from '../../pages/_app';
import styles from './Form.module.scss';

const endpoint = process.env.BASE_URL + 'login'

type LoginFormProps = {
  Closemodal: VoidFunction
}

export const LoginForm: React.FC<LoginFormProps> = ({ Closemodal }) => {
  const { register, handleSubmit } = useForm();
  const onSubmit = (value: any): void => console.log(value);

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
      <button type="submit" className={styles.form_submit}>登録する</button>
    </form>
  )
}
