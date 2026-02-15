import { useState, useEffect } from 'react';
import { fetchCollections } from '../api/tainacan';
import type { TainacanItem } from '../api/tainacan';

interface UseCollectionsReturn {
    collections: TainacanItem[];
    loading: boolean;
    error: string | null;
}

export function useCollections(): UseCollectionsReturn {
    const [collections, setCollections] = useState<TainacanItem[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        let cancelled = false;
        setLoading(true);
        fetchCollections()
            .then(data => {
                if (!cancelled) {
                    setCollections(data);
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
    }, []);

    return { collections, loading, error };
}
