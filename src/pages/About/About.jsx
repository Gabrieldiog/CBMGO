import ScrollReveal from '../../components/ScrollReveal/ScrollReveal';
import ParticlesBackground from '../../components/ParticlesBackground/ParticlesBackground';
import styles from './About.module.css';

export default function About() {
    return (
        <div className={styles.page}>
            <section className={styles.hero}>
                <div className={styles.heroOverlay}></div>
                <ParticlesBackground count={40} />
                <div className={styles.heroContent}>
                    <span className={styles.label}>Institucional</span>
                    <h1>Sobre o Museu</h1>
                    <p className={styles.subtitle}>Preservando a memória, construindo o futuro</p>
                </div>
            </section>

            <section className="section">
                <div className="container container--narrow">
                    <ScrollReveal>
                        <div className={styles.block}>
                            <h2>Nossa Missão</h2>
                            <p>
                                O Museu Virtual tem como missão preservar, pesquisar e difundir o patrimônio
                                histórico e cultural da corporação, promovendo o acesso à memória institucional
                                através de tecnologias digitais inovadoras.
                            </p>
                        </div>
                    </ScrollReveal>

                    <ScrollReveal delay={0.15}>
                        <div className={styles.block}>
                            <h2>Nossa Visão</h2>
                            <p>
                                Ser referência nacional em museologia digital, democratizando o acesso ao
                                patrimônio cultural e militar brasileiro, contribuindo para a formação de uma
                                consciência histórica e identitária na sociedade.
                            </p>
                        </div>
                    </ScrollReveal>

                    <ScrollReveal delay={0.3}>
                        <div className={styles.block}>
                            <h2>O Acervo</h2>
                            <p>
                                Nosso acervo é composto por mais de 4.700 itens distribuídos em três coleções
                                principais: Objetos, Documentos e Fotografias. Cada peça foi cuidadosamente
                                catalogada e digitalizada para garantir sua preservação e acessibilidade.
                            </p>
                            <p>
                                A digitalização do acervo utiliza a plataforma Tainacan, desenvolvida pela
                                Universidade Federal de Goiás, permitindo catalogação padronizada segundo
                                normas internacionais de museologia.
                            </p>
                        </div>
                    </ScrollReveal>

                    <ScrollReveal delay={0.45}>
                        <div className={styles.block}>
                            <h2>Valores</h2>
                            <div className={styles.valuesGrid}>
                                {[
                                    { icon: '🛡️', title: 'Preservação', desc: 'Compromisso com a salvaguarda do patrimônio' },
                                    { icon: '🔍', title: 'Pesquisa', desc: 'Investigação contínua do acervo histórico' },
                                    { icon: '🌐', title: 'Acessibilidade', desc: 'Democratização do acesso à cultura' },
                                    { icon: '🤝', title: 'Colaboração', desc: 'Parcerias para enriquecer o acervo' },
                                ].map((v, i) => (
                                    <div key={i} className={styles.valueCard}>
                                        <span className={styles.valueIcon}>{v.icon}</span>
                                        <h4>{v.title}</h4>
                                        <p>{v.desc}</p>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </ScrollReveal>
                </div>
            </section>
        </div>
    );
}
