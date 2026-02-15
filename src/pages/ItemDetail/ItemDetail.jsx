import { useParams, Link } from 'react-router-dom';
import { useItem } from '../../hooks/useItem';
import { getThumbnailUrl } from '../../api/tainacan';
import styles from './ItemDetail.module.css';

export default function ItemDetail() {
    const { id } = useParams();
    const { item, loading } = useItem(id);

    if (loading) {
        return (
            <div className={styles.loading}>
                <div className={styles.spinner}></div>
                <p>Carregando item...</p>
            </div>
        );
    }

    if (!item) {
        return (
            <div className={styles.notFound}>
                <h2>Item não encontrado</h2>
                <p>O item solicitado não pôde ser carregado.</p>
                <Link to="/colecoes" className="btn btn--outline">Voltar às Coleções</Link>
            </div>
        );
    }

    const title = typeof item.title === 'string' ? item.title : item.title?.rendered || 'Sem título';
    const description = item.description || item.content?.rendered || '';
    const thumbnail = getThumbnailUrl(item);
    const metadata = item.metadata || {};

    return (
        <div className={styles.page}>
            <section className={styles.hero}>
                <div className={styles.heroOverlay}></div>
                <div className={styles.heroContent}>
                    <Link to="/colecoes" className={styles.backLink}>← Voltar às Coleções</Link>
                    <h1>{title}</h1>
                </div>
            </section>

            <section className="section">
                <div className={`container ${styles.content}`}>
                    <div className={styles.mainCol}>
                        {thumbnail && (
                            <div className={styles.imageWrapper}>
                                <img src={thumbnail} alt={title} className={styles.mainImage} />
                            </div>
                        )}
                        {description && (
                            <div className={styles.descBlock}>
                                <h3>Descrição</h3>
                                <div dangerouslySetInnerHTML={{ __html: description }} />
                            </div>
                        )}
                    </div>

                    <aside className={styles.sidebar}>
                        <div className={styles.metaCard}>
                            <h3 className={styles.metaTitle}>Metadados</h3>
                            <div className={styles.metaList}>
                                {Object.entries(metadata).length > 0 ? (
                                    Object.entries(metadata).map(([key, val]) => {
                                        const value = val?.value_as_string || val?.value || '';
                                        if (!value) return null;
                                        return (
                                            <div key={key} className={styles.metaItem}>
                                                <span className={styles.metaLabel}>{val?.name || key}</span>
                                                <span className={styles.metaValue}>{value}</span>
                                            </div>
                                        );
                                    })
                                ) : (
                                    <p className={styles.noMeta}>Metadados disponíveis quando a API estiver ativa.</p>
                                )}
                            </div>
                        </div>
                    </aside>
                </div>
            </section>
        </div>
    );
}
