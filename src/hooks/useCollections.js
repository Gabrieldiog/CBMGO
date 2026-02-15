import { useState, useEffect } from 'react';
import { fetchCollections } from '../api/tainacan';

export function useCollections() {
    const [collections, setCollections] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

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
