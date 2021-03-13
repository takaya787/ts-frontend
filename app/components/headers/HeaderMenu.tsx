import React, { useState } from 'react';
import Link from 'next/link';
//react-iconsからダウンロード
import { AiOutlineMenu } from 'react-icons/ai';
import { ImCross } from 'react-icons/im';
import styles from './HeaderMenu.module.scss';
//components
import { Modal } from '../Modal';

export const HeaderMenu: React.FC = () => {
  const [menuopen, setMenuOpen] = useState<boolean>(false);
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
            <Link href="/guest">
              <a className={styles.link}><li className={styles.link_part}>Guest Map</li></a>
            </Link>
            <li className={styles.component}>
              <Modal
                title="はじめる"
              />
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
