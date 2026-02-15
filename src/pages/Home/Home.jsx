import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import InteractiveConstellation from '../../components/InteractiveConstellation/InteractiveConstellation';
import ParticlesBackground from '../../components/ParticlesBackground/ParticlesBackground';
import ScrollReveal from '../../components/ScrollReveal/ScrollReveal';
import { useCounterAnimation } from '../../hooks/useCounterAnimation';
import { useCollections } from '../../hooks/useCollections';
import { COLLECTIONS_MAP } from '../../api/tainacan';
import { FireHelmetIcon, DocumentScrollIcon, CameraHistoricIcon, PhoenixIcon } from '../../components/Icons/BombeiroIcons';
import styles from './Home.module.css';

function StatCounter({ end, suffix = '', label }) {
    const { count, ref } = useCounterAnimation(end, 2500);
    return (
        <div className={styles.stat} ref={ref}>
            <span className={styles.statNumber}>{count}{suffix}</span>
            <span className={styles.statLabel}>{label}</span>
        </div>
    );
}

export default function Home() {
    const collections = Object.values(COLLECTIONS_MAP);
    const { collections: apiCollections } = useCollections();

    // Extrair contagens reais da API
    const getCount = (name) => {
        const col = apiCollections.find(c => c.name === name);
        return col?.total_items?.publish ? parseInt(col.total_items.publish) : 0;
    };
    const objetos = getCount('Objetos');
    const documentos = getCount('Documentos');
    const fotografias = getCount('Fotografias');
    const totalItens = objetos + documentos + fotografias;

    const timelineEvents = [
        { year: '1957', title: 'Início da História', desc: '11 policiais militares são enviados a Minas Gerais para o curso de formação de bombeiros.' },
        { year: '1958', title: 'Primeira Companhia', desc: 'Criação da 1ª Companhia de Bombeiros dentro da Polícia Militar de Goiás.' },
        { year: '1964', title: 'Corpo de Bombeiros', desc: 'Criação oficial do Corpo de Bombeiros Militar com efetivo de Batalhão.' },
        { year: '1989', title: 'Segurança Pública', desc: 'Constituição Estadual consolida o CBMGO como órgão da Segurança Pública.' },
    ];

    // Ícones SVG para os cards de coleções
    const collectionIcons = {
        'objetos': <FireHelmetIcon size={56} />,
        'documentos': <DocumentScrollIcon size={56} />,
        'fotografias': <CameraHistoricIcon size={56} />,
    };



    return (
        <div className={styles.home}>
            {/* ===== HERO ===== */}
            <section className={styles.hero}>
                <div className={styles.heroOverlay}></div>
                <div className={styles.heroPattern}></div>
                <InteractiveConstellation nodeCount={70} maxDistance={160} mouseRadius={220} />
                <div className={styles.heroContent}>
                    <motion.span
                        className={styles.heroLabel}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.3, duration: 0.6 }}
                    >
                        Corpo de Bombeiros Militar de Goiás
                    </motion.span>
                    <motion.h1
                        className={styles.heroTitle}
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.5, duration: 0.8 }}
                    >
                        Museu Virtual
                    </motion.h1>
                    <motion.div
                        className={styles.heroDivider}
                        initial={{ scaleX: 0 }}
                        animate={{ scaleX: 1 }}
                        transition={{ delay: 0.9, duration: 0.8 }}
                    ></motion.div>
                    <motion.p
                        className={styles.heroSubtitle}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 1.1, duration: 0.6 }}
                    >
                        Explore a história, a coragem e a dedicação dos bombeiros goianos
                        desde 1957. Um acervo digitalizado de memórias, conquistas e heroísmo.
                    </motion.p>
                    <motion.div
                        className={styles.heroCTA}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 1.4, duration: 0.6 }}
                    >
                        <Link to="/colecoes" className="btn btn--primary">Explorar Acervo</Link>
                        <Link to="/historia" className="btn btn--outline">Nossa História</Link>
                    </motion.div>
                </div>
                <motion.div
                    className={styles.scrollIndicator}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 2, duration: 0.6 }}
                >
                    <span>Scroll</span>
                    <div className={styles.scrollLine}></div>
                </motion.div>
            </section>

            {/* ===== COLEÇÕES ===== */}
            <section className={`section ${styles.collectionsSection}`}>
                <div className="container">
                    <ScrollReveal>
                        <h2 className="section-title">Nosso Acervo</h2>
                        <p className="section-subtitle">Três acervos que preservam a memória do CBMGO</p>
                    </ScrollReveal>
                    <div className={styles.collectionsGrid}>
                        {collections.map((col, i) => (
                            <ScrollReveal key={col.slug} delay={i * 0.15}>
                                <Link to={`/colecao/${col.slug}`} className={styles.collectionCard}>
                                    <div className={styles.cardIcon}>{collectionIcons[col.slug] || col.icon}</div>
                                    <div className={styles.cardShimmer}></div>
                                    <h3 className={styles.cardTitle}>{col.name}</h3>
                                    <p className={styles.cardDesc}>{col.description}</p>
                                    <span className={styles.cardLink}>
                                        Explorar →
                                    </span>
                                </Link>
                            </ScrollReveal>
                        ))}
                    </div>
                </div>
            </section>

            {/* ===== STATS ===== */}
            <section className={`section ${styles.statsSection}`}>
                <ParticlesBackground count={25} />
                <div className={styles.statsOverlay}></div>
                <div className="container" style={{ position: 'relative', zIndex: 2 }}>
                    <div className={styles.statsGrid}>
                        <StatCounter end={objetos} suffix="" label="Objetos Catalogados" />
                        <StatCounter end={documentos} suffix="" label="Documentos Digitalizados" />
                        <StatCounter end={fotografias} suffix="" label="Fotografias no Acervo" />
                        <StatCounter end={totalItens} suffix="" label="Total de Itens" />
                    </div>
                </div>
            </section>

            {/* ===== CONHEÇA O CBMGO ===== */}
            <section className={`section ${styles.featuredSection}`}>
                <div className="container">
                    <ScrollReveal>
                        <h2 className="section-title">Conheça o CBMGO</h2>
                        <p className="section-subtitle">Mais de 65 anos dedicados à proteção da vida e do patrimônio goiano</p>
                    </ScrollReveal>
                    <div className={styles.featuredGrid}>
                        {[
                            {
                                title: 'Nossa Missão',
                                desc: 'Proteger vidas, patrimônio e meio ambiente por meio de ações de prevenção, combate a incêndios, busca e salvamento em todo o Estado de Goiás.',
                                tag: 'Institucional',
                                link: '/corporacao',
                                icon: <PhoenixIcon size={64} />,
                            },
                            {
                                title: 'Nossa História',
                                desc: 'De 11 policiais militares enviados a Minas Gerais em 1957 a uma corporação autônoma presente em todo o estado — conheça nossa trajetória.',
                                tag: 'Desde 1957',
                                link: '/historia',
                                icon: <DocumentScrollIcon size={64} color="#FF6600" />,
                            },
                            {
                                title: 'O Museu Virtual',
                                desc: 'Um espaço digital dedicado a preservar e compartilhar a memória histórica do Corpo de Bombeiros Militar de Goiás com toda a sociedade.',
                                tag: 'Acervo Digital',
                                link: '/sobre',
                                icon: <CameraHistoricIcon size={64} color="#FF8533" />,
                            },
                        ].map((item, i) => (
                            <ScrollReveal key={i} delay={i * 0.15}>
                                <Link to={item.link} className={styles.featuredCard}>
                                    <div className={styles.featuredImage}>
                                        <div className={styles.featuredPlaceholder}>
                                            {item.icon}
                                        </div>
                                    </div>
                                    <div className={styles.featuredInfo}>
                                        <span className={styles.featuredTag}>{item.tag}</span>
                                        <h3 className={styles.featuredTitle}>{item.title}</h3>
                                        <p className={styles.featuredDesc}>{item.desc}</p>
                                    </div>
                                </Link>
                            </ScrollReveal>
                        ))}
                    </div>
                </div>
            </section>

            {/* ===== TIMELINE ===== */}
            <section className={`section ${styles.timelineSection}`}>
                <div className="container container--narrow">
                    <ScrollReveal>
                        <h2 className="section-title">Nossa Trajetória</h2>
                        <p className="section-subtitle">A história dos Bombeiros de Goiás</p>
                    </ScrollReveal>
                    <div className={styles.timeline}>
                        <div className={styles.timelineLine}></div>
                        {timelineEvents.map((ev, i) => (
                            <ScrollReveal key={i} delay={i * 0.2} direction={i % 2 === 0 ? 'left' : 'right'}>
                                <div className={`${styles.timelineItem} ${i % 2 === 0 ? styles.timelineLeft : styles.timelineRight}`}>
                                    <div className={styles.timelineDot}></div>
                                    <div className={styles.timelineContent}>
                                        <span className={styles.timelineYear}>{ev.year}</span>
                                        <h4 className={styles.timelineTitle}>{ev.title}</h4>
                                        <p className={styles.timelineDesc}>{ev.desc}</p>
                                    </div>
                                </div>
                            </ScrollReveal>
                        ))}
                    </div>
                </div>
            </section>

            {/* ===== CTA ===== */}
            <section className={`section ${styles.ctaSection}`}>
                <ParticlesBackground count={30} />
                <div className={styles.ctaOverlay}></div>
                <div className="container" style={{ position: 'relative', zIndex: 2 }}>
                    <ScrollReveal>
                        <div className={styles.ctaContent}>
                            <h2 className={styles.ctaTitle}>Preserve a Memória dos Bombeiros</h2>
                            <p className={styles.ctaText}>
                                Contribua com o acervo do CBMGO doando objetos, documentos ou fotografias
                                históricas. Juntos, honramos a coragem e dedicação dos que salvam vidas.
                            </p>
                            <div className={styles.ctaButtons}>
                                <Link to="/contribuir" className="btn btn--primary">Saiba Como Contribuir</Link>
                                <Link to="/contato" className="btn btn--outline">Entre em Contato</Link>
                            </div>
                        </div>
                    </ScrollReveal>
                </div>
            </section>
        </div>
    );
}
