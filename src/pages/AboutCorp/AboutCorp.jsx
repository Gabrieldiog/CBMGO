import ScrollReveal from '../../components/ScrollReveal/ScrollReveal';
import ParticlesBackground from '../../components/ParticlesBackground/ParticlesBackground';
import styles from './AboutCorp.module.css';

export default function AboutCorp() {
    return (
        <div className={styles.page}>
            <section className={styles.hero}>
                <div className={styles.heroOverlay}></div>
                <ParticlesBackground count={40} />
                <div className={styles.heroContent}>
                    <span className={styles.label}>Institucional</span>
                    <h1>A Corporação</h1>
                    <p className={styles.subtitle}>Tradição, honra e compromisso com a sociedade</p>
                </div>
            </section>

            <section className="section">
                <div className="container container--narrow">
                    <ScrollReveal>
                        <div className={styles.block}>
                            <h2>História</h2>
                            <p>
                                Com mais de um século de história, a corporação tem sido guardiã dos valores
                                de disciplina, honra e serviço à comunidade. Desde sua fundação, mantém o
                                compromisso de preservar a ordem e a segurança, formando gerações de
                                profissionais dedicados.
                            </p>
                            <p>
                                Ao longo dos anos, acumulou um rico acervo de objetos, documentos e fotografias
                                que registram sua trajetória e contribuição para a história regional e nacional.
                            </p>
                        </div>
                    </ScrollReveal>

                    <ScrollReveal delay={0.15}>
                        <div className={styles.block}>
                            <h2>Símbolos e Tradições</h2>
                            <p>
                                Os símbolos da corporação representam seus valores fundamentais e sua
                                conexão com a história. Cada elemento heráldico carrega significado profundo,
                                refletindo a missão institucional e o compromisso com a excelência.
                            </p>
                        </div>
                    </ScrollReveal>

                    <ScrollReveal delay={0.3}>
                        <div className={styles.block}>
                            <h2>Compromisso Social</h2>
                            <p>
                                Além de suas atribuições primárias, a corporação mantém forte compromisso
                                com a educação patrimonial e a preservação cultural, reconhecendo que a
                                memória institucional é parte do patrimônio de toda a sociedade.
                            </p>
                        </div>
                    </ScrollReveal>
                </div>
            </section>
        </div>
    );
}
