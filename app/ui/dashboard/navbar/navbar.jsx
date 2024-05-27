import { auth, signOut } from "@/app/auth";
import styles from "./navbar.module.css"
import Path from "./path";
import {
  MdLogout,
  // MdNotifications,
  // MdOutlineChat,
  // MdPublic,
  // MdSearch,
} from "react-icons/md";
import Image from "next/image";
import SidebarToggle from "../sidebar/sidebarToggle";

const Navbar = async () => {

  const user = await auth()

  return (
    <div className={styles.main}>
    <div className={styles.container}>
      <div className={styles.title}>
        <SidebarToggle/>
        <Path />
      </div>
      <div className={styles.menu}>
        {/* <div className={styles.search}>
          <MdSearch/>
          <input type="text" placeholder="Search..." className={styles.input}/>
        </div> */}
        <div className={styles.icons}>
          {/* <MdOutlineChat size={20}/>
          <MdNotifications size={20}/>
          <MdPublic size={20}/> */}
          <div className={styles.user}>
          <Image src={user.img || "/noavatar.png"} alt="" width="40" height="40" className={styles.userImage}/>
          <div className={styles.userDetails}>
            <span className={styles.username}>{user.username}</span>
            <span className={styles.userTitle}>{user.role} admin</span>
          </div>
        </div>
        <form action={async ()=>{
          "use server"
          await signOut()
        }}>
          <button className={styles.logout}>
            <MdLogout size={"26px"}/>
          </button>
        </form>
        </div>
      </div>
    </div>
    </div>
  )
}

export default Navbar
