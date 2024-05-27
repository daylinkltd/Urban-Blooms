import Image from "next/image"
import styles from "./rightbar.module.css"
import { MdPlayCircleFilled, MdReadMore } from "react-icons/md"

const Rightbar = () => {
  return (
    <div className={styles.container}>
      <div className={styles.item}>
        <div className={styles.bgContainer}>
          <Image src="/astronaut.png" alt="" fill className={styles.bg}/>
        </div>
        <div className={styles.texts}>
          <span className={styles.notification}>
            🔥 Available Now
          </span>
          <h3 className={styles.title}>
            How to use the new version of daylink admin dashboard?
          </h3>
          <span className={styles.subtitle}>
            takes 5 min to learn
          </span>
          <p className={styles.desc}>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Amet ipsa, incidunt non a dicta animi maiores vero ipsum. Id ipsum molestias sunt ipsa! Ea veritatis consequatur laborum illum in laboriosam.
          </p>
          <button className={styles.button}>
            <MdPlayCircleFilled />
            Watch
          </button>
        </div>
        </div>

        <div className={styles.item}>
          <div className={styles.texts}>
            <span className={styles.notification}>
              🔥 Coming Soon
            </span>
            <h3 className={styles.title}>
              New Features in the daylink Dashboard
            </h3>
            <span className={styles.subtitle}>
              Boost Your Productivity
            </span>
            <p className={styles.desc}>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Amet ipsa, incidunt non a dicta animi maiores vero ipsum. Id ipsum molestias sunt ipsa! Ea veritatis consequatur laborum illum in laboriosam.
            </p>
            <button className={styles.button}>
              <MdReadMore />
              Learn
            </button>
          </div>
        </div>
    </div>
  )
}

export default Rightbar