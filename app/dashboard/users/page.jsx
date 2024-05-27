import Link from 'next/link';
import Image from 'next/image';
import { MdDelete, MdVisibility } from 'react-icons/md';
import Pagination from '@/app/ui/dashboard/pagination/pagination';
import Search from '@/app/ui/dashboard/search/search';
import styles from '@/app/ui/dashboard/users/users.module.css';
import { fetchUsers } from '@/app/lib/data';
import RemoveBtn from '@/app/ui/dashboard/RemoveBtn';


const UsersPage = async ({ searchParams }) => {
  const q = searchParams?.q || "";
  const page = searchParams?.page || 2;
  const { count, users } = await fetchUsers(q, page);

  return (
    <div className={styles.container}>
      <div className={styles.top}>
        <Search placeholder="Search for User..." />
        <Link href="/dashboard/users/add">
          <button className={styles.addButton}>Add User</button>
        </Link>
      </div>
      <div className={styles.tableMain}>
      <table className={styles.table}>
        <thead>
          <tr>
            <td>Name</td>
            <td>Email</td>
            <td>Created At</td>
            <td>Role</td>
            <td>Status</td>
            <td>Actions</td>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user._id}>
              <td>
                <div className={styles.user}>
                  <Image src={user.img || '/noavatar.png'} alt='' width={40} height={40} className={styles.userImage} />
                  {user.username}
                </div>
              </td>
              <td>{user.email}</td>
              <td>{user.createdAt?.toString().slice(0, 10)}</td>
              <td>{user.isAdmin ? 'Admin' : 'Client'}</td>
              <td>{user.isActive ? 'Active' : 'Locked'}</td>
              <td>
                <div className={styles.buttons}>
                  <Link href={`/dashboard/users/${user._id}`}>
                    <button className={`${styles.button} ${styles.view}`}>
                      <MdVisibility />
                    </button>
                  </Link>
                  <RemoveBtn  id={user._id} collection="users"/>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      </div>
      <Pagination count={count} />
    </div>
  );
}

export default UsersPage;
