import { MdSupervisedUserCircle } from 'react-icons/md'
import styles from './card.module.css'

const Card = (card) => {
  return (
    <div className={styles.container}>
      <MdSupervisedUserCircle size={30}/>
      <div className={styles.texts}>
        <span className={styles.title}>{card.title}</span>
        <span className={styles.number}>{card.number}</span>
        <span className={styles.detail}>
          <span className={styles.positive}>12%</span>
          more than previous week
        </span>
      </div>
    </div>
  )
}

export default Card