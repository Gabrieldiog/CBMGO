import { useState } from 'react';
import ScrollReveal from '../../components/ScrollReveal/ScrollReveal';
import ParticlesBackground from '../../components/ParticlesBackground/ParticlesBackground';
import styles from './Contact.module.css';

export default function Contact() {
    const [formData, setFormData] = useState({ nome: '', email: '', assunto: '', mensagem: '' });

    const handleChange = (e) => {
        setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        alert('Mensagem enviada! (demonstração)');
        setFormData({ nome: '', email: '', assunto: '', mensagem: '' });
    };

    return (
        <div className={styles.page}>
            <section className={styles.hero}>
                <div className={styles.heroOverlay}></div>
                <ParticlesBackground count={40} />
                <div className={styles.heroContent}>
                    <span className={styles.label}>Fale Conosco</span>
                    <h1>Contato</h1>
                    <p className={styles.subtitle}>Entre em contato com a equipe do Museu Virtual</p>
                </div>
            </section>

            <section className="section">
                <div className="container">
                    <div className={styles.grid}>
                        <ScrollReveal direction="left">
                            <div className={styles.info}>
                                <h2 className={styles.infoTitle}>Informações</h2>
                                <div className={styles.infoList}>
                                    <div className={styles.infoItem}>
                                        <span className={styles.infoIcon}><svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#FF6600" strokeWidth="2" strokeLinecap="round"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z" /><circle cx="12" cy="10" r="3" /></svg></span>
                                        <div>
                                            <h4>Endereço</h4>
                                            <p>Quartel da Corporação<br />Cidade, UF — CEP 00000-000</p>
                                        </div>
                                    </div>
                                    <div className={styles.infoItem}>
                                        <span className={styles.infoIcon}><svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#FF6600" strokeWidth="2" strokeLinecap="round"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" /><path d="M22 6l-10 7L2 6" /></svg></span>
                                        <div>
                                            <h4>E-mail</h4>
                                            <p>museu@corporacao.gov.br</p>
                                        </div>
                                    </div>
                                    <div className={styles.infoItem}>
                                        <span className={styles.infoIcon}><svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#FF6600" strokeWidth="2" strokeLinecap="round"><path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07 19.5 19.5 0 01-6-6 19.79 19.79 0 01-3.07-8.67A2 2 0 014.11 2h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L8.09 9.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 16.92z" /></svg></span>
                                        <div>
                                            <h4>Telefone</h4>
                                            <p>(00) 0000-0000</p>
                                        </div>
                                    </div>
                                    <div className={styles.infoItem}>
                                        <span className={styles.infoIcon}><svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#FF6600" strokeWidth="2" strokeLinecap="round"><circle cx="12" cy="12" r="10" /><path d="M12 6v6l4 2" /></svg></span>
                                        <div>
                                            <h4>Horário</h4>
                                            <p>Segunda a Sexta: 09h às 17h</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </ScrollReveal>

                        <ScrollReveal direction="right">
                            <form onSubmit={handleSubmit} className={styles.form}>
                                <h2 className={styles.formTitle}>Envie sua Mensagem</h2>
                                <div className={styles.field}>
                                    <label htmlFor="nome">Nome Completo</label>
                                    <input id="nome" name="nome" type="text" value={formData.nome} onChange={handleChange} required />
                                </div>
                                <div className={styles.field}>
                                    <label htmlFor="email">E-mail</label>
                                    <input id="email" name="email" type="email" value={formData.email} onChange={handleChange} required />
                                </div>
                                <div className={styles.field}>
                                    <label htmlFor="assunto">Assunto</label>
                                    <input id="assunto" name="assunto" type="text" value={formData.assunto} onChange={handleChange} required />
                                </div>
                                <div className={styles.field}>
                                    <label htmlFor="mensagem">Mensagem</label>
                                    <textarea id="mensagem" name="mensagem" rows="5" value={formData.mensagem} onChange={handleChange} required />
                                </div>
                                <button type="submit" className="btn btn--primary">Enviar Mensagem</button>
                            </form>
                        </ScrollReveal>
                    </div>
                </div>
            </section>
        </div>
    );
}
