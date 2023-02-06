import useUserStore from './user'
import useArticleStore from './article'

// 把多个store合并成一个大store（仅供参考）
const useStore = () => {
  const user = useUserStore()
  const article = useArticleStore()
  return {
    user,
    article
  }
}

export default useStore
