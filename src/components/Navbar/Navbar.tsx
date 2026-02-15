import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import styles from './Navbar.module.css';

interface NavLink {
    path: string;
    label: string;
}

const NAV_LINKS: NavLink[] = [
    { path: '/', label: 'Início' },
    { path: '/colecoes', label: 'Coleções' },
    { path: '/sobre', label: 'O Museu' },
    { path: '/corporacao', label: 'O CBMGO' },
    { path: '/historia', label: 'Nossa História' },
    { path: '/contribuir', label: 'Contribuir' },
    { path: '/contato', label: 'Contato' },
];

export default function Navbar() {
    const [scrolled, setScrolled] = useState(false);
    const [mobileOpen, setMobileOpen] = useState(false);
    const location = useLocation();

    useEffect(() => {
        const onScroll = () => setScrolled(window.scrollY > 60);
        window.addEventListener('scroll', onScroll, { passive: true });
        return () => window.removeEventListener('scroll', onScroll);
    }, []);

    useEffect(() => {
        setMobileOpen(false);
    }, [location.pathname]);

    return (
        <motion.nav
            className={`${styles.navbar} ${scrolled ? styles.scrolled : ''}`}
            initial={{ y: -100 }}
            animate={{ y: 0 }}
            transition={{ duration: 0.6, ease: 'easeOut' }}
        >
            <div className={styles.container}>
                <Link to="/" className={styles.logo}>
                    <span className={styles.logoIcon}>
                        <img src="/img/logo_bm.png" alt="CBMGO" width="36" height="36" style={{ borderRadius: '50%', objectFit: 'cover' }} />
                    </span>
                    <div className={styles.logoText}>
                        <span className={styles.logoTitle}>Museu Virtual</span>
                        <span className={styles.logoSub}>CBMGO</span>
                    </div>
                </Link>

                <button
                    className={`${styles.hamburger} ${mobileOpen ? styles.hamburgerOpen : ''}`}
                    onClick={() => setMobileOpen(!mobileOpen)}
                    aria-label="Menu"
                >
                    <span></span>
                    <span></span>
                    <span></span>
                </button>

                <ul className={`${styles.navLinks} ${mobileOpen ? styles.navLinksOpen : ''}`}>
                    {NAV_LINKS.map(link => (
                        <li key={link.path}>
                            <Link
                                to={link.path}
                                className={`${styles.navLink} ${location.pathname === link.path ? styles.active : ''}`}
                            >
                                {link.label}
                            </Link>
                        </li>
                    ))}
                </ul>
            </div>
        </motion.nav>
    );
}
