"use client"


import MenuLink from './menuLink/menuLink';
import styles from './sidebar.module.css'
import {
  MdDashboard,
  MdSupervisedUserCircle,
  MdShoppingBag,
  MdAttachMoney,
  MdWork,
  MdAnalytics,
  MdPeople,
  MdOutlineSettings,
  MdHelpCenter,
} from "react-icons/md";
import { useSidebar } from '@/contexts/SidebarContext';

const menuItems = [
  {
    title: "Pages",
    list: [
      {
        title: "Dashboard",
        path: "/dashboard",
        icon: <MdDashboard />,
      },
      {
        title: "Users",
        path: "/dashboard/users?page=1",
        icon: <MdSupervisedUserCircle />,
      },
    ],
  },
  {
    title: "Gallary",
    list: [
      {
        title: "Groups",
        path: "/dashboard/revenue",
        icon: <MdWork />,
      },
      {
        title: "Upload Images",
        path: "/dashboard/reports",
        icon: <MdAnalytics />,
      },
    ],
  },
];




const Sidebar = () => {
  const { isSidebarVisible, setIsSidebarVisible } = useSidebar();

  const handleLinkClick = () => {
    setIsSidebarVisible(false);
  };

  return (
    <div className={`${styles.menu} ${isSidebarVisible ? '' : styles.menuHidden}`}>
      <div className={styles.container}>
        <ul className={styles.list}>
          {menuItems.map((cat) => (
            <li key={cat.title}>
              <span className={styles.cat}>{cat.title}</span>
              {cat.list.map((item) => (
                <MenuLink item={item} key={item.title} onClick={handleLinkClick}/>
              ))}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Sidebar;
