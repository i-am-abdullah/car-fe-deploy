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
import { BadgeCheckIcon, CalendarClockIcon, CarIcon, ListTree, Settings2, Tags } from 'lucide-react';

const data = [
  { link: '/admin/dashboard', label: 'Car Listings', icon: IconLayout2 },
  { link: '/admin/dashboard/requests', label: 'Requests', icon: IconPinFilled },
  { link: '/admin/dashboard/conversations', label: 'Conversations', icon: IconMessage2 },
  { link: '/admin/dashboard/makes', label: 'Makes', icon: BadgeCheckIcon },
    { link: '/admin/dashboard/models', label: 'Models', icon: Tags },
    { link: '/admin/dashboard/years', label: 'Years', icon: CalendarClockIcon },
    { link: '/admin/dashboard/variants', label: 'Variants', icon: Settings2 }
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
      <item.icon className={classes.linkIcon} />
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
