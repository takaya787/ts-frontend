import Head from 'next/head';
import { Layout } from '../components/Layout';
import styles from '../styles/Review.module.scss'
//components
import { Map } from '../components/maps/Map'
import { Modal } from '../components/Modal'

export default function New() {
  return (
    <Layout>
      <Head>
        <title>GuestMap | 住み心地.com</title>
      </Head>
      <div>
        <div className={styles.title}>
          <h1 className={styles.title_text}>レビューをチェックしてみよう！</h1>
        </div>
        <div className={styles.description}>
          <p className={styles.description_text}>
            <span className={styles.red}>ユーザー登録</span>をして、レビューを投稿してみよう！
          </p>
          <Modal title='レビューを投稿する！' />
        </div>
        <Map />
      </div>
    </Layout>
  )
}
