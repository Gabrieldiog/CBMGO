import { useEffect, useRef } from 'react';
import styles from './ParticlesBackground.module.css';

const FIRE_COLORS = ['#FF6600', '#FF8533', '#CC0000', '#E62020', '#FFD700', '#FF3300'];

interface Particle {
    x: number;
    y: number;
    size: number;
    speedX: number;
    speedY: number;
    opacity: number;
    pulse: number;
    pulseSpeed: number;
    color: string;
}

interface ParticlesBackgroundProps {
    count?: number;
}

export default function ParticlesBackground({ count = 50 }: ParticlesBackgroundProps) {
    const canvasRef = useRef<HTMLCanvasElement | null>(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext('2d');
        if (!ctx) return;
        let animId: number;
        let particles: Particle[] = [];

        function resize() {
            canvas!.width = canvas!.offsetWidth * window.devicePixelRatio;
            canvas!.height = canvas!.offsetHeight * window.devicePixelRatio;
            ctx!.scale(window.devicePixelRatio, window.devicePixelRatio);
        }

        function createParticles() {
            particles = [];
            const w = canvas!.offsetWidth;
            const h = canvas!.offsetHeight;
            for (let i = 0; i < count; i++) {
                particles.push({
                    x: Math.random() * w,
                    y: Math.random() * h,
                    size: Math.random() * 3 + 1,
                    speedX: (Math.random() - 0.5) * 0.4,
                    speedY: -Math.random() * 0.6 - 0.1,
                    opacity: Math.random() * 0.6 + 0.2,
                    pulse: Math.random() * Math.PI * 2,
                    pulseSpeed: Math.random() * 0.02 + 0.005,
                    color: FIRE_COLORS[Math.floor(Math.random() * FIRE_COLORS.length)],
                });
            }
        }

        function draw() {
            const w = canvas!.offsetWidth;
            const h = canvas!.offsetHeight;
            ctx!.clearRect(0, 0, w, h);

            particles.forEach(p => {
                p.x += p.speedX;
                p.y += p.speedY;
                p.pulse += p.pulseSpeed;

                if (p.y < -10) { p.y = h + 10; p.x = Math.random() * w; }
                if (p.x < -10) p.x = w + 10;
                if (p.x > w + 10) p.x = -10;

                const currentOpacity = p.opacity * (0.5 + 0.5 * Math.sin(p.pulse));

                ctx!.beginPath();
                ctx!.arc(p.x, p.y, p.size, 0, Math.PI * 2);
                ctx!.fillStyle = p.color;
                ctx!.globalAlpha = currentOpacity;
                ctx!.fill();

                ctx!.beginPath();
                ctx!.arc(p.x, p.y, p.size * 2.5, 0, Math.PI * 2);
                ctx!.fillStyle = p.color;
                ctx!.globalAlpha = currentOpacity * 0.15;
                ctx!.fill();

                ctx!.globalAlpha = 1;
            });

            animId = requestAnimationFrame(draw);
        }

        resize();
        createParticles();
        draw();

        const handleResize = () => { resize(); createParticles(); };
        window.addEventListener('resize', handleResize);
        return () => {
            cancelAnimationFrame(animId);
            window.removeEventListener('resize', handleResize);
        };
    }, [count]);

    return <canvas ref={canvasRef} className={styles.canvas} />;
}
