type UserIDPaths = string[]
export async function getAllUserIDs(): Promise<UserIDPaths> {
  const EndPoint = `${process.env.NEXT_PUBLIC_BASE_URL}users`
  // fetch と response.json 両方のエラーをキャッチ
  const getJson = async () => {
    const res = await fetch(EndPoint);
    if (res.ok) {
      let json = await res.json()
      return json
    }
  }
  //Jsonをarrayに変更
  const getArray = async () => {
    const result = await getJson()
    const arr = await JSON.parse(result)
    return arr
  }

  //pathに送ったpathは実際のurlと等しい必要がある
  let paths = [];
  const arr = await getArray()
  await arr.map(data => {
    let path = '/users/' + data.id.toString(10);
    paths.push(path);
  })
  return paths
}
