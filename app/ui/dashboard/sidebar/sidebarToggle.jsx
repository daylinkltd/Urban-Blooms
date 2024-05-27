'use client';

import {  MdOutlineFormatListBulleted } from "react-icons/md";
import styles from './sidebarToggle.module.css';
import { useSidebar } from "@/contexts/SidebarContext";

const SidebarToggle = () => {
  const { toggleSidebar } = useSidebar();

  return (
    <button className={styles.sidebarToggle} onClick={toggleSidebar}>
        <MdOutlineFormatListBulleted size={"26px"} />
    </button>
  );
};

export default SidebarToggle;
