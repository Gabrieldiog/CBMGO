import { useState, useEffect } from 'react';
import { fetchCollectionItems } from '../api/tainacan';
import type { TainacanItem } from '../api/tainacan';

interface UseItemsReturn {
    items: TainacanItem[];
    totalItems: number;
    totalPages: number;
    loading: boolean;
    error: string | null;
}

export function useItems(collectionId: number | undefined, page: number = 1, perPage: number = 12): UseItemsReturn {
    const [items, setItems] = useState<TainacanItem[]>([]);
    const [totalItems, setTotalItems] = useState(0);
    const [totalPages, setTotalPages] = useState(1);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

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
