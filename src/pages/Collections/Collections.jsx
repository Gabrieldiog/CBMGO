import { Link } from 'react-router-dom';
import ScrollReveal from '../../components/ScrollReveal/ScrollReveal';
import ParticlesBackground from '../../components/ParticlesBackground/ParticlesBackground';
import { FireHelmetIcon, DocumentScrollIcon, CameraHistoricIcon } from '../../components/Icons/BombeiroIcons';
import { COLLECTIONS_MAP } from '../../api/tainacan';
import styles from './Collections.module.css';

const ICON_MAP = {
    objetos: <FireHelmetIcon size={48} />,
    documentos: <DocumentScrollIcon size={48} />,
    fotografias: <CameraHistoricIcon size={48} />,
};

export default function Collections() {
    const collections = Object.values(COLLECTIONS_MAP);

    return (
        <div className={styles.page}>
            <section className={styles.hero}>
                <div className={styles.heroOverlay}></div>
                <ParticlesBackground count={40} />
                <div className={styles.heroContent}>
                    <span className={styles.label}>Acervo Digital</span>
                    <h1>Nossas Coleções</h1>
                    <p className={styles.subtitle}>
                        Explore os três acervos que compõem o patrimônio histórico e cultural do museu.
                    </p>
                </div>
            </section>

            <section className="section">
                <div className="container">
                    <div className={styles.grid}>
                        {collections.map((col, i) => (
                            <ScrollReveal key={col.slug} delay={i * 0.15}>
                                <Link to={`/colecao/${col.slug}`} className={styles.card}>
                                    <div className={styles.cardHeader}>
                                        <span className={styles.cardIcon}>{ICON_MAP[col.slug] || col.icon}</span>
                                        <div className={styles.cardShimmer}></div>
                                    </div>
                                    <div className={styles.cardBody}>
                                        <h2 className={styles.cardTitle}>{col.name}</h2>
                                        <p className={styles.cardDesc}>{col.description}</p>
                                        <span className={styles.cardLink}>Explorar Coleção →</span>
                                    </div>
                                </Link>
                            </ScrollReveal>
                        ))}
                    </div>
                </div>
            </section>
        </div>
    );
}
