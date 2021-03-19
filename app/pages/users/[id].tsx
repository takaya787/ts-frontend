import Head from 'next/head';
import React, { useEffect } from 'react';
import useSWR from 'swr';
//components
import { Layout } from '../../components/Layout';
//types
import { ReviewType } from '../../types/ReviewType'
//others
import { getAllUserIDs } from '../../modules/userStatics';
import styles from '../../styles/User.module.scss';

type UserPropsType = {
  id: number
}
type UserFetcherType = {
  id: number,
  email: string,
  name: string,
  reviews: ReviewType[],
}

export default function User(props: UserPropsType) {
  const baseUrl = `${process.env.NEXT_PUBLIC_BASE_URL}users/${props.id}`

  const fetcher = (): Promise<UserFetcherType> => fetch(baseUrl).then(res => res.json());

  const { data: user_data, error: user_error } = useSWR(baseUrl, fetcher)

  useEffect(function () {
    console.log('user_dataが変更されました。')
    console.log(user_data)
  }, [user_data])
  return (
    <Layout >
      <Head>
        <title>Your profile | 住み心地.com</title>
      </Head>
      <div id={styles.user}>
        <h3> {props.id}</h3>
        {
          user_error && (
            <p>failed to load</p>
          )
        }
        {
          user_data && (
            <div className={styles.profile}>
              Your name
              <p className={styles.profile_logo}>{user_data.name}</p>
              <br />
              Your email
              {user_data.email}
              <p className={styles.profile_logo}>{user_data.email}</p>
            </div>
          )
        }
        {
          user_data && user_data.reviews.length ? (
            <div className={styles.reviews} >
              <ul className={styles.reviews_lists}>
                {user_data.reviews.map((review) => (
                  <li className={styles.list} key={review.id}>
                    id: {review.id}
                  duration: {review.duration}
                  reason: {review.reason}
                  </li>
                )
                )}
              </ul>
            </div>
          ) : (
            <><h3>Reviews 0</h3></>
          )
        }
      </div>
    </Layout>
  )
}
//path内のparams要素をparamsとして、propsして、各ページをレンダリングする
export async function getStaticPaths() {
  const paths = await getAllUserIDs();
  // const paths = ['/users/4', '/users/5']
  // console.log(paths);
  return {
    paths,
    fallback: false
  }
}
//path内のparamsをpropしてる
export async function getStaticProps({ params }) {
  return {
    props: {
      id: params.id
    }
  }
}
