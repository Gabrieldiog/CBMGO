import { useState, useEffect } from 'react';
import { fetchItem } from '../api/tainacan';
import type { TainacanItem } from '../api/tainacan';

interface UseItemReturn {
    item: TainacanItem | null;
    loading: boolean;
    error: string | null;
}

export function useItem(itemId: string | undefined): UseItemReturn {
    const [item, setItem] = useState<TainacanItem | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        if (!itemId) return;
        let cancelled = false;
        setLoading(true);
        fetchItem(itemId)
            .then(data => {
                if (!cancelled) {
                    setItem(data);
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
    }, [itemId]);

    return { item, loading, error };
}
