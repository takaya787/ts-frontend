type UserIDPaths = string[]

//Userのpathを取得、作成するための関数
export async function getAllUserPaths(): Promise<UserIDPaths> {
  const EndPoint = 'https://railsbackend2020.herokuapp.com/api/users'
  // fetch と response.json 両方のエラーをキャッチ
  const getJson = async () => {
    const res = await fetch(EndPoint, {
      headers: { 'Content-Type': 'application/json', 'User-Agent': '*' }
    })

    const data = await res.json()
    return data
    // const sample = [{ id: 1 }, { id: 2 }, { id: 3 }]
    // return sample
  }

  //Jsonをpathに変更
  const getPath = async (): Promise<UserIDPaths> => {
    // usersの情報を取得する
    const result = await getJson()
    // console.log(result)
    const path = result?.map((user) => `/users/${user.id}`) || [];
    // console.log(array);
    return path
  }
  //Pathを返却する
  return getPath()
}
