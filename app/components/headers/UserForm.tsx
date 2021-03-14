import { useForm } from 'react-hook-form';
import { useRouter } from 'next/router';
import { Auth } from '../../modules/auth'
//contexts
// import { UserContext } from '../../pages/_app';
import styles from './Form.module.scss';

const endpoint = process.env.BASE_URL + 'users'

export const UserForm: React.FC = () => {
  const { register, handleSubmit } = useForm();
  const initialerrors = { name: '', email: '', password: '', password_confirmation: '' };

  const onSubmit = (value: any): void => console.log(value);
  return (
    <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
      <label className={styles.label} htmlFor="name">お名前</label>
      <input
        className={styles.form_input}
        id="name"
        name="name"
        ref={register({ required: 'ユーザー名は必須です' })}
      />
      <label className={styles.label} htmlFor="email">Eメール</label>
      <input
        id="email"
        className={styles.form_input}
        name="email"
        type="email"
        ref={register({ required: 'emailは必須です' })}
      />
      {/* {errors.email !== '' && (
        <p className={styles.form_error}>Email {errors.email}</p>
      )} */}
      <label className={styles.label} htmlFor="password">パスワード</label>
      <input
        id="password"
        className={styles.form_input}
        type="password"
        name="password"
        ref={register({ required: 'passwordは必須です' })}
      />
      {/* {errors.password !== '' && (
        <p className={styles.form_error}>Password {errors.password}</p>
      )} */}
      <label
        className={styles.label}
        htmlFor="password_confirmation">
        パスワード確認用
      </label>
      <input
        id="password_confirmation"
        className={styles.form_input}
        type="password"
        name="password_confirmation"
        ref={register({ required: 'password_confirmationは必須です' })}
      />
      {/* {errors.password_confirmation !== "" && (
        <p className={styles.form_error}>Password_confirmation {errors.password_confirmation}</p>
      )} */}
      <button type="submit" className={styles.form_submit}>登録する</button>
    </form>
  )
}
