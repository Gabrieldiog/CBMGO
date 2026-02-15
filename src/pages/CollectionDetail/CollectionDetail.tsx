import { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import ScrollReveal from '../../components/ScrollReveal/ScrollReveal';
import { getCollectionBySlug, getThumbnailUrl } from '../../api/tainacan';
import { useItems } from '../../hooks/useItems';
import styles from './CollectionDetail.module.css';

export default function CollectionDetail() {
    const { slug } = useParams<{ slug: string }>();
    const collection = getCollectionBySlug(slug || '');
    const [page, setPage] = useState(1);
    const { items, totalItems, totalPages, loading } = useItems(collection?.id, page);

    if (!collection) {
        return (
            <div className={styles.notFound}>
                <h2>Coleção não encontrada</h2>
                <Link to="/colecoes" className="btn btn--outline">Voltar às Coleções</Link>
            </div>
        );
    }

    return (
        <div className={styles.page}>
            <section className={styles.hero}>
                <div className={styles.heroOverlay}></div>
                <div className={styles.heroContent}>
                    <span className={styles.label}>{collection.icon} Coleção</span>
                    <h1>{collection.name}</h1>
                    <p className={styles.subtitle}>{collection.description}</p>
                    {totalItems > 0 && <span className={styles.count}>{totalItems} itens no acervo</span>}
                </div>
            </section>

            <section className="section">
                <div className="container">
                    {loading ? (
                        <div className={styles.loading}>
                            <div className={styles.spinner}></div>
                            <p>Carregando itens...</p>
                        </div>
                    ) : items.length === 0 ? (
                        <div className={styles.empty}>
                            <p>Nenhum item encontrado nesta coleção.</p>
                            <p className={styles.emptyHint}>Os itens serão exibidos quando a API estiver disponível.</p>
                        </div>
                    ) : (
                        <>
                            <div className={styles.grid}>
                                {items.map((item, i) => (
                                    <ScrollReveal key={item.id || i} delay={i * 0.05}>
                                        <Link to={`/item/${item.id}`} className={styles.itemCard}>
                                            <div className={styles.itemImage}>
                                                {getThumbnailUrl(item) ? (
                                                    <img src={getThumbnailUrl(item)!} alt={typeof item.title === 'string' ? item.title : (item.title as { rendered: string })?.rendered || ''} />
                                                ) : (
                                                    <div className={styles.itemPlaceholder}>{collection.icon}</div>
                                                )}
                                            </div>
                                            <div className={styles.itemInfo}>
                                                <h3>{typeof item.title === 'string' ? item.title : (item.title as { rendered: string })?.rendered || 'Sem título'}</h3>
                                            </div>
                                        </Link>
                                    </ScrollReveal>
                                ))}
                            </div>
                            {totalPages > 1 && (
                                <div className={styles.pagination}>
                                    <button
                                        className={`btn btn--outline ${styles.pageBtn}`}
                                        onClick={() => setPage(p => Math.max(1, p - 1))}
                                        disabled={page <= 1}
                                    >
                                        ← Anterior
                                    </button>
                                    <span className={styles.pageInfo}>Página {page} de {totalPages}</span>
                                    <button
                                        className={`btn btn--outline ${styles.pageBtn}`}
                                        onClick={() => setPage(p => Math.min(totalPages, p + 1))}
                                        disabled={page >= totalPages}
                                    >
                                        Próxima →
                                    </button>
                                </div>
                            )}
                        </>
                    )}
                </div>
            </section>
        </div>
    );
}
