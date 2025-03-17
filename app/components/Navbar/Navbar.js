'use client'

import { usePathname } from 'next/navigation'
import styles from './Navbar.module.css'
import Image from 'next/image'
import Link from 'next/link'

export default function Navbar() {
    const pathname = usePathname()
    
    return (
        <nav className={styles.navbar}>
            <div className={styles.logo}>
                <Link className={styles.logoText} href="/">Phonio</Link>
                <Image src="/assets/logo.svg" alt="logo" color='white' width={24} height={24} />
            </div>
            <div className={styles.menu}>
                <Link 
                    className={`${styles.menuLink} ${pathname === '/' ? styles.active : ''}`} 
                    href="/"
                >
                 Home
                </Link>
                <Link 
                    className={`${styles.menuLink} ${pathname === '/sales-agent' ? styles.active : ''}`} 
                    href="/sales-agent"
                >
                    Sales
                </Link>
            </div>
            <div className={styles.actions}>
                <button className={styles.secondaryButton}>Log in</button>
                <button className={styles.primaryButton}>Sign up</button>
            </div>
        </nav>
    )
}   
