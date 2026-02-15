import { useEffect, useState, useRef } from 'react';

interface UseCounterAnimationReturn {
    count: number;
    ref: React.RefObject<HTMLDivElement | null>;
}

export function useCounterAnimation(end: number, duration: number = 2000): UseCounterAnimationReturn {
    const [count, setCount] = useState(0);
    const ref = useRef<HTMLDivElement | null>(null);
    const [started, setStarted] = useState(false);

    useEffect(() => {
        const el = ref.current;
        if (!el) return;

        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting && !started) {
                    setStarted(true);
                    observer.unobserve(el);
                }
            },
            { threshold: 0.5 }
        );

        observer.observe(el);
        return () => observer.disconnect();
    }, [started]);

    useEffect(() => {
        if (!started) return;
        let startTime: number | null = null;
        const step = (timestamp: number) => {
            if (!startTime) startTime = timestamp;
            const progress = Math.min((timestamp - startTime) / duration, 1);
            const eased = 1 - Math.pow(1 - progress, 3);
            setCount(Math.floor(eased * end));
            if (progress < 1) {
                requestAnimationFrame(step);
            }
        };
        requestAnimationFrame(step);
    }, [started, end, duration]);

    return { count, ref };
}
