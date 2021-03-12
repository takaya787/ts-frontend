import Head from 'next/head'
import { Layout } from '../components/Layout';
import styles from '../styles/root.module.scss';

export default function Home() {
  return (
    <Layout home>
      <Head>
        <title>住み心地.com</title>
      </Head>
    </Layout>
  )
}
