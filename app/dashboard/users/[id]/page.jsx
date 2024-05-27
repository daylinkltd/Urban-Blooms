import { fetchUser } from '@/app/lib/data';
import styles from '@/app/ui/dashboard/users/singleUser/singleUser.module.css'
import UpdateUserForm from '@/app/ui/dashboard/users/updateUser/UpdateUserForm';
import Image from 'next/image'

export default  async function SingleUserPage({params}){
    const {id} = params;
    const {user} = await fetchUser(id);
    const {username, email, password, phone, isAdmin, isActive, address} = user;

    return (
    <div className={styles.container}>
      <div className={styles.infoContainer}>
        <div className={styles.imgContainer}>
          <Image src={user.img || "/noavatar.png"} alt='' fill />
        </div>
      {user.username}
      </div>
      <div className={styles.formContainer}>
        <UpdateUserForm id={id} username={username} email={email} password={password} phone={phone} isAdmin={isAdmin} isActive={isActive} address={address}/>
      </div>
    </div>
  )
}
