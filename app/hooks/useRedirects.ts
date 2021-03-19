import { useRouter } from 'next/router';
import { Auth } from '../modules/Auth'

type LoginRedirectType = {
  only_login: () => void
}

export function useLoginRedirect(): LoginRedirectType {
  const router = useRouter();
  //Loginしてなかったら、rootにredirect
  const only_login = () => {
    if (!Auth.isLoggedIn()) {
      router.replace("/");
      alert("Login してください");
    }
    return
  }
  return { only_login }
}

type CorrectUserRedirectType = {
  check_user: (current_user_id: number, target_user_id: number) => void
}

export function useCorrectUserRedirect(current_user_id: number, target_user_id: number): CorrectUserRedirectType {
  const router = useRouter();
  const check_user = (current_user_id: number, target_user_id: number) => {
    if (current_user_id === target_user_id) {
      router.replace("/");
      alert("あなたは正式なユーザーではありません");
    }
    return
  }
  return { check_user }
}
