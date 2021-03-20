import React, { useEffect } from 'react';
import useSWR from 'swr';
import Link from 'next/link';
import Head from 'next/head';
//components
import { Layout } from '../../components/Layout';
//others
import { getAllUserPaths } from '../../modules/userStatics'

// import { DeleteButton } from '../../components/headers/UserForm';


const baseUrl = `${process.env.NEXT_PUBLIC_BASE_URL}users`

const fetcher = () => fetch(baseUrl).then(res => res.json());

export default function index() {
  const { data, error } = useSWR(baseUrl, fetcher)

  useEffect(function () {
    getAllUserPaths().then((path) => {
      console.log(path)
    })
  }, [])

  return (
    <Layout>
      <Head>
        <title>User | 住み心地.com</title>
      </Head>
      <div>
        <h1>USER一覧</h1>
        {
          error && (
            <p>failed to load</p>
          )
        }
        {
          data && data.map((user) =>
          (<div key={user.id}>
            {user.id}
            <br />
            {user.name}
            <br />
            {user.email}
            {/* <DeleteButton id={user.id} /> */}
            <br />
            <Link href={`/users/${user.id}`}
            >
              <a>User　詳細ページを開く</a>
            </Link>
          </div>
          ))
        }
      </div >
    </Layout>
  )
}
