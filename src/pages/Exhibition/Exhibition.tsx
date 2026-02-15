import { Link } from 'react-router-dom';
import ScrollReveal from '../../components/ScrollReveal/ScrollReveal';
import ParticlesBackground from '../../components/ParticlesBackground/ParticlesBackground';
import { FireHelmetIcon, DocumentScrollIcon, CameraHistoricIcon } from '../../components/Icons/BombeiroIcons';
import { COLLECTIONS_MAP } from '../../api/tainacan';
import styles from './Exhibition.module.css';
import type { ReactNode } from 'react';

interface Room {
    title: string;
    desc: string;
    icon: ReactNode;
    slug: string;
}

export default function Exhibition() {
    const rooms: Room[] = [
        { title: 'Sala de Objetos Históricos', desc: 'Peças que materializam a história da corporação ao longo dos séculos.', icon: <FireHelmetIcon size={40} />, slug: 'objetos' },
        { title: 'Sala de Documentos', desc: 'Registros oficiais, cartas e publicações que documentam a trajetória institucional.', icon: <DocumentScrollIcon size={40} />, slug: 'documentos' },
        { title: 'Galeria Fotográfica', desc: 'Imagens que capturam momentos inesquecíveis da história corporativa.', icon: <CameraHistoricIcon size={40} />, slug: 'fotografias' },
    ];

    return (
        <div className={styles.page}>
            <section className={styles.hero}>
                <div className={styles.heroOverlay}></div>
                <ParticlesBackground count={40} />
                <div className={styles.heroContent}>
                    <span className={styles.label}>Experiência Imersiva</span>
                    <h1>Exposição Virtual</h1>
                    <p className={styles.subtitle}>
                        Uma jornada imersiva pelo patrimônio histórico e cultural
                    </p>
                </div>
            </section>

            <section className="section">
                <div className="container">
                    <ScrollReveal>
                        <div className={styles.intro}>
                            <h2>Bem-vindo à Exposição</h2>
                            <p>
                                Navegue pelas salas temáticas e explore o acervo completo do Museu Virtual.
                                Cada sala foi cuidadosamente curada para oferecer uma experiência educativa
                                e contemplativa do nosso patrimônio.
                            </p>
                        </div>
                    </ScrollReveal>

                    <div className={styles.roomsGrid}>
                        {rooms.map((room, i) => (
                            <ScrollReveal key={i} delay={i * 0.2}>
                                <Link to={`/colecao/${room.slug}`} className={styles.roomCard}>
                                    <div className={styles.roomHeader}>
                                        <span className={styles.roomIcon}>{room.icon}</span>
                                        <div className={styles.roomShimmer}></div>
                                    </div>
                                    <div className={styles.roomBody}>
                                        <span className={styles.roomNum}>Sala {String(i + 1).padStart(2, '0')}</span>
                                        <h3 className={styles.roomTitle}>{room.title}</h3>
                                        <p className={styles.roomDesc}>{room.desc}</p>
                                        <span className={styles.roomLink}>Entrar na Sala →</span>
                                    </div>
                                </Link>
                            </ScrollReveal>
                        ))}
                    </div>
                </div>
            </section>

            <section className={`section ${styles.ctaSection}`}>
                <div className="container" style={{ textAlign: 'center' }}>
                    <ScrollReveal>
                        <h2 className={styles.ctaTitle}>Explore Mais</h2>
                        <p className={styles.ctaText}>
                            Todas as peças do acervo estão catalogadas e disponíveis para consulta.
                        </p>
                        <Link to="/colecoes" className="btn btn--primary">Ver Todas as Coleções</Link>
                    </ScrollReveal>
                </div>
            </section>
        </div>
    );
}
