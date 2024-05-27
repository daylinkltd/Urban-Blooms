import React from 'react'
import Navbar from '../ui/dashboard/navbar/navbar'
import styles from "../ui/dashboard/dashboard.module.css"
import Footer from '../ui/dashboard/footer/footer'
import Sidebar from '../ui/dashboard/sidebar/sidebar'

const Layout = ({children}) => {
  return (
    <div className={styles.container}>
        <Navbar/>
        <Sidebar/>
      <div className={styles.content}>
        {children}
        <Footer/>
      </div>
    </div>
  )
}

export default Layout