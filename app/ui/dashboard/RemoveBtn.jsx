"use client";

import styles from '@/app/ui/dashboard/users/users.module.css';
import { useRouter } from 'next/navigation';
import { MdDelete } from 'react-icons/md';

export default function RemoveBtn({ id, collection }) {
  const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;
  const router = useRouter();

  const removeTopic = async () => {
    const confirmed = confirm('Are you sure??');

    if (confirmed) {
      const url = `${baseUrl}/api/${collection}?id=${id}`;
      const res = await fetch(url, {
        method: "DELETE",
      });

      if (res.ok) {
        router.refresh();
      }
    }
  };

  return (
    <button onClick={removeTopic} className={`${styles.button} ${styles.delete}`}>
      <MdDelete />
    </button>
  );
}
