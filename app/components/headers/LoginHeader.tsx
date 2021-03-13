import React, { useState, useContext, ReactEventHandler } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router'
//react-iconsからダウンロード
import { AiOutlineMenu } from 'react-icons/ai';
import { ImCross } from 'react-icons/im';
//others
// import { UserContext } from '../../pages/_app';
import styles from './HeaderMenu.module.scss';
import { Auth } from '../../modules/auth';

export const LoginHeader: React.FC = () => {
  const [menuopen, setMenuOpen] = useState<boolean>(false);
  const router = useRouter()
  const LogoutButton = (e: React.MouseEvent<HTMLButtonElement>): void => {
    e.preventDefault();
    // setUser({ email: '', id: 0, name: '' })
    Auth.logout();
    router.push("/");
  }
  return (
    <div className={styles.top}>
      { menuopen && (
        <div className={styles.top_menu}>
          < button className={styles.top_menu_closer} onClick={() => setMenuOpen(false)} >
            <ImCross size={16} />
          </button >
          <ul className={styles.top_menu_lists}>
            <Link href="/">
              <a className={styles.link}><li className={styles.link_part}>Home</li></a>
            </Link>
            <Link href="/beginner">
              <a className={styles.link}><li className={styles.link_part}>How to use</li></a>
            </Link>
            <Link href="/reviews/new">
              <a className={styles.link}><li className={styles.link_part}>Map</li></a>
            </Link>
            {/* <Link href={`/users/${user.id}`}>
              <a className={styles.link}><li className={styles.link_part}>Profile</li></a>
            </Link> */}
            <li className={styles.component}>
              <button className={styles.component_button} onClick={(e) => LogoutButton(e)}>ログアウト
              </button>
            </li>
          </ul>
        </div>
      )}
      { !menuopen && (
        <button className={styles.top_opener} onClick={() => setMenuOpen(true)}>
          <AiOutlineMenu size={20} />
        </button>
      )}
    </div>
  )
}
