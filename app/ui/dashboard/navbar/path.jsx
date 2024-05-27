"use client"

import { usePathname } from "next/navigation";

export default function Path(){
  const pathname = usePathname();
    return(
        <>
        {pathname.split("/").pop( )}
        </>
    )
}