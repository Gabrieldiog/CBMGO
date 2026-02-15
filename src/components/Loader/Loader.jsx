import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import styles from './Loader.module.css';

export default function Loader() {
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const timer = setTimeout(() => setLoading(false), 2200);
        return () => clearTimeout(timer);
    }, []);

    return (
        <AnimatePresence>
            {loading && (
                <motion.div
                    className={styles.loader}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.6, ease: 'easeInOut' }}
                >
                    <div className={styles.emblemWrapper}>
                        <div className={styles.ring}>
                            <div className={styles.ringInner}></div>
                        </div>
                        <div className={styles.emblem}>
                            <img src="/img/logo_bm.png" alt="CBMGO" width="50" height="50" style={{ borderRadius: '50%', objectFit: 'cover' }} />
                        </div>
                    </div>
                    <motion.p
                        className={styles.text}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.5, duration: 0.6 }}
                    >
                        Museu Virtual CBMGO
                    </motion.p>
                </motion.div>
            )}
        </AnimatePresence>
    );
}
