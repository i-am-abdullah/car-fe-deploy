'use client'
import { usePathname } from 'next/navigation';
import Link from 'next/link';
import {
  IconLayout2,
  IconList,
  IconLogout,
  IconMessage2,
  IconPinFilled,
  IconSwitchHorizontal,
  IconTicket,
} from '@tabler/icons-react';
import classes from './navbar.module.css';
import { logout } from '@/services/authService';

const data = [
  { link: '/admin/dashboard', label: 'Dashboard', icon: IconLayout2 },
  { link: '/admin/dashboard/requests', label: 'Requests', icon: IconPinFilled },
  { link: '/admin/dashboard/conversations', label: 'Conversations', icon: IconMessage2 }
];

export function AdminNavbar() {
  const pathname = usePathname();

  const links = data.map((item) => (
    <Link 
      className={classes.link}
      key={item.label}
      href={item.link}
      data-active={pathname === item.link || undefined}
    >
      <item.icon className={classes.linkIcon} stroke={1.5} />
      <span>{item.label}</span>
    </Link>
  ));

  return (
    <nav className={classes.navbar}>
      <div className={classes.navbarMain}>
        {links}
      </div>

      <div className={classes.footer}>

        <Link href="#" className={classes.link} onClick={logout}>
          <IconLogout className={classes.linkIcon} stroke={1.5} />
          <span>Logout</span>
        </Link>
      </div>
    </nav>
  );
}
