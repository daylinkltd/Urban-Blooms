import React from 'react'
import Card from '../ui/dashboard/card/card'
import styles from '../ui/dashboard/dashboard.module.css'
import Transactions from '../ui/dashboard/transactions/transactions'
import Chart from '../ui/dashboard/chart/chart'
// import Rightbar from '../ui/dashboard/rightbar/rightbar'

const Dashboard = () => {
  return (
    <div className={styles.wrapper}>
      <div className={styles.main}>
        <div className={styles.cards}>
          <Card title="Users" number="256"/>
          <Card title="Page views" number="20393"/>
          <Card title="Sessions" number="124"/>
        </div>
        <Chart/>
        <Transactions/>
      </div>
      {/* <div className={styles.side}>
        <Rightbar/>
      </div> */}
    </div>
  )
}

export default Dashboard