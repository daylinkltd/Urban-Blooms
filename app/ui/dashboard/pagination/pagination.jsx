"use client"

import { MdNavigateBefore, MdNavigateNext, MdNextPlan, MdSkipNext } from 'react-icons/md'
import styles from './pagination.module.css'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'

const Pagination = ({count}) => {
  const searchParams = useSearchParams();
  const {replace} = useRouter();
  const pathname = usePathname();

  const page= searchParams.get("page") || 1;


  const params = new URLSearchParams(searchParams);
  const itemPerPage = parseInt(process.env.NEXT_PUBLIC_ITEMS_PER_PAGE, 10);

  const hasPrev = itemPerPage * (parseInt (page) -1) > 0
  const hasNext = itemPerPage * (parseInt (page) -1) + itemPerPage < count;

  const handleChangePage = (type) => {
    type === "prev"? params.set("page", parseInt(page) - 1): params.set("page", parseInt(page) + 1)
    replace(`${pathname}?${params}`)
  }

  return (
    <div className={styles.container}>
      <button className={styles.button} disabled={!hasPrev} onClick={()=> handleChangePage("prev")}>
        <MdNavigateBefore/>
      </button>
      <button className={styles.button} disabled={!hasNext} onClick={()=> handleChangePage("next")}>
        <MdNavigateNext/>
      </button>
    </div>
  )
}

export default Pagination