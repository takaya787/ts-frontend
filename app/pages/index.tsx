import React, { useState, useContext } from 'react';
import Link from 'next/link';
import Head from 'next/head';
import Image from 'next/image';

//others
import { Layout } from '../components/Layout';
import styles from '../styles/root.module.scss';

export default function Home() {
  return (
    <Layout home>
      <Head>
        <title>住み心地.com</title>
      </Head>
      <div id={styles.root}>
        {/* main part starts*/}
        <div className={styles.main}>
          <div className={styles.main_icon}>
            <Image src='/images/home_icon.png'
              alt="under arrow"
              width='50' height='50'
            />
          </div>
          <Link href="/beginner">
            <a><h1 className={styles.main_question}><span><Image src='/images/logo.png' width='270' height='50' /></span>ってどんなサービス？</h1></a>
          </Link>
          <div className={styles.main_explains}>
            <div className={styles.explain}>
              <h2 className={styles.explain_title}>現地の生活経験を<br />場所毎に住み心地などの評価と共に投稿しよう！</h2>
              <p className={styles.explain_text}>ユーザーが自分自身の生活経験を通して、感じたその土地の生活へのレビューを<br /><span className={styles.explain_text_keyword}>住み心地</span>という評価とともに投稿できるサービスです。</p>
            </div>
            <div className={styles.explain}>
              <h2 className={styles.explain_title}>興味のある国や街を<br />検索して投稿を見てみよう！
                </h2>
              <p className={styles.explain_text}>行きたい国や留学してみたい国や街を選ぶ時に<br className="common__sp-only" />経験者の投稿を見て参考にしてみよう！</p>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  )
}
