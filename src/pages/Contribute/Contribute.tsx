import { Link } from 'react-router-dom';
import ScrollReveal from '../../components/ScrollReveal/ScrollReveal';
import ParticlesBackground from '../../components/ParticlesBackground/ParticlesBackground';
import { FireHelmetIcon, DocumentScrollIcon, CameraHistoricIcon } from '../../components/Icons/BombeiroIcons';
import styles from './Contribute.module.css';

export default function Contribute() {
    const steps = [
        { num: '01', title: 'Identifique', desc: 'Verifique se o item possui relevância histórica para a corporação.' },
        { num: '02', title: 'Entre em Contato', desc: 'Envie informações sobre o item pela nossa página de contato.' },
        { num: '03', title: 'Avaliação', desc: 'Nossa equipe de curadoria analisará o material enviado.' },
        { num: '04', title: 'Incorporação', desc: 'O item aprovado será catalogado e integrado ao acervo digital.' },
    ];

    return (
        <div className={styles.page}>
            <section className={styles.hero}>
                <div className={styles.heroOverlay}></div>
                <ParticlesBackground count={40} />
                <div className={styles.heroContent}>
                    <span className={styles.label}>Participe</span>
                    <h1>Como Contribuir</h1>
                    <p className={styles.subtitle}>Ajude a preservar a memória histórica da corporação</p>
                </div>
            </section>

            <section className="section">
                <div className="container container--narrow">
                    <ScrollReveal>
                        <div className={styles.intro}>
                            <h2>Por que Contribuir?</h2>
                            <p>
                                A preservação da memória é uma responsabilidade coletiva. Se você possui
                                objetos, documentos ou fotografias relacionados à história da corporação,
                                sua contribuição é fundamental para enriquecer o acervo e manter viva a
                                nossa história.
                            </p>
                        </div>
                    </ScrollReveal>

                    <div className={styles.stepsTitle}>
                        <ScrollReveal>
                            <h2 className="section-title">Como Funciona</h2>
                        </ScrollReveal>
                    </div>

                    <div className={styles.steps}>
                        {steps.map((step, i) => (
                            <ScrollReveal key={i} delay={i * 0.15}>
                                <div className={styles.step}>
                                    <span className={styles.stepNum}>{step.num}</span>
                                    <div>
                                        <h3 className={styles.stepTitle}>{step.title}</h3>
                                        <p className={styles.stepDesc}>{step.desc}</p>
                                    </div>
                                </div>
                            </ScrollReveal>
                        ))}
                    </div>

                    <ScrollReveal>
                        <div className={styles.types}>
                            <h2>O que Aceitamos</h2>
                            <div className={styles.typesGrid}>
                                <div className={styles.typeCard}>
                                    <span><FireHelmetIcon size={32} /></span>
                                    <h4>Objetos</h4>
                                    <p>Uniformes, medalhas, insígnias, equipamentos e artefatos históricos.</p>
                                </div>
                                <div className={styles.typeCard}>
                                    <span><DocumentScrollIcon size={32} /></span>
                                    <h4>Documentos</h4>
                                    <p>Cartas, ofícios, publicações, registros e diários institucionais.</p>
                                </div>
                                <div className={styles.typeCard}>
                                    <span><CameraHistoricIcon size={32} /></span>
                                    <h4>Fotografias</h4>
                                    <p>Fotos de eventos, formaturas, cerimônias e momentos históricos.</p>
                                </div>
                            </div>
                        </div>
                    </ScrollReveal>

                    <ScrollReveal>
                        <div className={styles.cta}>
                            <h3>Pronto para Contribuir?</h3>
                            <p>Entre em contato com nossa equipe de curadoria.</p>
                            <Link to="/contato" className="btn btn--primary">Fale Conosco</Link>
                        </div>
                    </ScrollReveal>
                </div>
            </section>
        </div>
    );
}
