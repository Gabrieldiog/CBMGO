import { useState, useEffect } from 'react';
import { fetchItem } from '../api/tainacan';

export function useItem(itemId) {
    const [item, setItem] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

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
