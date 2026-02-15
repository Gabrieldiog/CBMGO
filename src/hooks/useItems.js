import { useState, useEffect } from 'react';
import { fetchCollectionItems } from '../api/tainacan';

export function useItems(collectionId, page = 1, perPage = 12) {
    const [items, setItems] = useState([]);
    const [totalItems, setTotalItems] = useState(0);
    const [totalPages, setTotalPages] = useState(1);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        if (!collectionId) return;
        let cancelled = false;
        setLoading(true);
        fetchCollectionItems(collectionId, page, perPage)
            .then(data => {
                if (!cancelled) {
                    setItems(data.items);
                    setTotalItems(data.totalItems);
                    setTotalPages(data.totalPages);
                    setLoading(false);
                }
            })
            .catch(err => {
                if (!cancelled) {
                    setError(err.message);
                    setLoading(false);
                }
            });
        return () => { cancelled = true; };
    }, [collectionId, page, perPage]);

    return { items, totalItems, totalPages, loading, error };
}
