"use client"

import Link from 'next/link'
import styles from './menuLink.module.css'
import { usePathname } from 'next/navigation'

const MenuLink = ({item, onClick}) => {

  const pathname = usePathname();

  return (
    <div className={styles.linkContainer} onClick={onClick}>
      <Link href={item.path} className={`${styles.container} ${pathname === item.path && styles.active}`}>
        {item.icon}
        {item.title}
      </Link>
    </div>
  )
}

export default MenuLink