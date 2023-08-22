export async function fetchPosts() {
  const { error, data } = await useFetch(`https://weibo.com/ajax/statuses/mymblog?uid=${useUserStore().uid}`)

  return {
    data,
    error,
  }
}
