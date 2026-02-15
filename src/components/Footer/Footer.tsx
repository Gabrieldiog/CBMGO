import { Link } from 'react-router-dom';
import styles from './Footer.module.css';

export default function Footer() {
    return (
        <footer className={styles.footer}>
            <div className={styles.geoPattern}></div>
            <div className={styles.container}>
                <div className={styles.grid}>
                    <div className={styles.brand}>
                        <div className={styles.logoRow}>
                            <span className={styles.logoIcon}>
                                <img src="/img/logo_bm.png" alt="CBMGO" width="36" height="36" style={{ borderRadius: '50%', objectFit: 'cover' }} />
                            </span>
                            <h3 className={styles.logoTitle}>Museu Virtual CBMGO</h3>
                        </div>
                        <p className={styles.description}>
                            Preservando a memória e a história do Corpo de Bombeiros Militar
                            de Goiás desde 1957 através da tecnologia digital.
                        </p>
                        <div className={styles.divider}></div>
                    </div>

                    <div className={styles.column}>
                        <h4 className={styles.columnTitle}>Explorar</h4>
                        <ul>
                            <li><Link to="/colecoes">Coleções</Link></li>
                            <li><Link to="/colecao/objetos">Objetos</Link></li>
                            <li><Link to="/colecao/documentos">Documentos</Link></li>
                            <li><Link to="/colecao/fotografias">Fotografias</Link></li>
                        </ul>
                    </div>

                    <div className={styles.column}>
                        <h4 className={styles.columnTitle}>Institucional</h4>
                        <ul>
                            <li><Link to="/sobre">Sobre o Museu</Link></li>
                            <li><Link to="/corporacao">O CBMGO</Link></li>
                            <li><Link to="/contribuir">Como Contribuir</Link></li>
                            <li><Link to="/contato">Contato</Link></li>
                        </ul>
                    </div>

                    <div className={styles.column}>
                        <h4 className={styles.columnTitle}>Contato</h4>
                        <ul>
                            <li className={styles.contactItem}>
                                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#FF6600" strokeWidth="2" strokeLinecap="round"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z" /><circle cx="12" cy="10" r="3" /></svg>
                                <span>Goiânia, Goiás</span>
                            </li>
                            <li className={styles.contactItem}>
                                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#FF6600" strokeWidth="2" strokeLinecap="round"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" /><path d="M22 6l-10 7L2 6" /></svg>
                                <span>museu@bombeiros.go.gov.br</span>
                            </li>
                            <li className={styles.contactItem}>
                                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#FF6600" strokeWidth="2" strokeLinecap="round"><circle cx="12" cy="12" r="10" /><path d="M12 6v6l4 2" /></svg>
                                <span>Seg–Sex: 09h às 17h</span>
                            </li>
                        </ul>
                    </div>
                </div>

                <div className={styles.bottom}>
                    <div className={styles.bottomDivider}></div>
                    <div className={styles.bottomContent}>
                        <p>© {new Date().getFullYear()} Museu Virtual CBMGO. Todos os direitos reservados.</p>
                        <p className={styles.credits}>Corpo de Bombeiros Militar do Estado de Goiás</p>
                    </div>
                </div>
            </div>
        </footer>
    );
}
