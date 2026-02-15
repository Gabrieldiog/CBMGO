import { useEffect, useRef } from 'react';
import styles from './InteractiveConstellation.module.css';

interface DashColor {
    r: number;
    g: number;
    b: number;
}

interface Dash {
    x: number;
    y: number;
    vx: number;
    vy: number;
    length: number;
    thickness: number;
    angle: number;
    targetAngle: number;
    color: DashColor;
    opacity: number;
    idleRotSpeed: number;
}

interface InteractiveConstellationProps {
    count?: number;
}

/*
 * FloatingLines — Efeito idêntico ao antigravity.google
 */
export default function InteractiveConstellation({ count = 120 }: InteractiveConstellationProps) {
    const canvasRef = useRef<HTMLCanvasElement | null>(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext('2d');
        if (!ctx) return;
        let animId: number;
        let dashes: Dash[] = [];
        const mouse = { x: -9999, y: -9999 };
        let w: number, h: number;

        const palette: DashColor[] = [
            { r: 255, g: 102, b: 0 },
            { r: 255, g: 133, b: 51 },
            { r: 204, g: 0, b: 0 },
            { r: 230, g: 32, b: 32 },
            { r: 255, g: 215, b: 0 },
            { r: 255, g: 51, b: 0 },
            { r: 255, g: 102, b: 0 },
            { r: 255, g: 133, b: 51 },
            { r: 255, g: 215, b: 0 },
        ];

        function resize() {
            const dpr = window.devicePixelRatio || 1;
            w = canvas!.offsetWidth;
            h = canvas!.offsetHeight;
            canvas!.width = w * dpr;
            canvas!.height = h * dpr;
            ctx!.setTransform(dpr, 0, 0, dpr, 0, 0);
        }

        function createDashes() {
            dashes = [];
            for (let i = 0; i < count; i++) {
                dashes.push(makeDash());
            }
        }

        function makeDash(): Dash {
            const col = palette[Math.floor(Math.random() * palette.length)];
            const speed = Math.random() * 0.6 + 0.15;
            const moveAngle = Math.random() * Math.PI * 2;

            return {
                x: Math.random() * w,
                y: Math.random() * h,
                vx: Math.cos(moveAngle) * speed,
                vy: Math.sin(moveAngle) * speed,
                length: Math.random() * 6 + 4,
                thickness: Math.random() * 1.5 + 0.8,
                angle: Math.random() * Math.PI * 2,
                targetAngle: Math.random() * Math.PI * 2,
                color: col,
                opacity: Math.random() * 0.5 + 0.3,
                idleRotSpeed: (Math.random() - 0.5) * 0.015,
            };
        }

        function lerpAngle(from: number, to: number, t: number): number {
            let diff = to - from;
            while (diff > Math.PI) diff -= Math.PI * 2;
            while (diff < -Math.PI) diff += Math.PI * 2;
            return from + diff * t;
        }

        function onMouseMove(e: MouseEvent) {
            const rect = canvas!.getBoundingClientRect();
            mouse.x = e.clientX - rect.left;
            mouse.y = e.clientY - rect.top;
        }

        function onMouseLeave() {
            mouse.x = -9999;
            mouse.y = -9999;
        }

        function draw() {
            ctx!.clearRect(0, 0, w, h);
            const mouseActive = mouse.x > -1000;

            for (const d of dashes) {
                d.x += d.vx;
                d.y += d.vy;

                if (d.x < -30) d.x = w + 30;
                if (d.x > w + 30) d.x = -30;
                if (d.y < -30) d.y = h + 30;
                if (d.y > h + 30) d.y = -30;

                if (mouseActive) {
                    const dx = mouse.x - d.x;
                    const dy = mouse.y - d.y;
                    const dist = Math.sqrt(dx * dx + dy * dy);

                    d.targetAngle = Math.atan2(dy, dx);
                    const lerpSpeed = dist < 150 ? 0.15 : dist < 300 ? 0.06 : 0.02;
                    d.angle = lerpAngle(d.angle, d.targetAngle, lerpSpeed);

                    if (dist < 250 && dist > 5) {
                        const pullForce = (250 - dist) / 250 * 1.2;
                        d.x += (dx / dist) * pullForce;
                        d.y += (dy / dist) * pullForce;
                    }
                } else {
                    d.angle += d.idleRotSpeed;
                }

                let alpha = d.opacity;
                if (mouseActive) {
                    const dx = mouse.x - d.x;
                    const dy = mouse.y - d.y;
                    const dist = Math.sqrt(dx * dx + dy * dy);
                    if (dist < 200) {
                        alpha = Math.min(1, d.opacity + (1 - dist / 200) * 0.5);
                    }
                }

                const halfLen = d.length / 2;
                const cosA = Math.cos(d.angle);
                const sinA = Math.sin(d.angle);
                const x1 = d.x - cosA * halfLen;
                const y1 = d.y - sinA * halfLen;
                const x2 = d.x + cosA * halfLen;
                const y2 = d.y + sinA * halfLen;

                ctx!.beginPath();
                ctx!.moveTo(x1, y1);
                ctx!.lineTo(x2, y2);
                ctx!.strokeStyle = `rgba(${d.color.r}, ${d.color.g}, ${d.color.b}, ${alpha})`;
                ctx!.lineWidth = d.thickness;
                ctx!.lineCap = 'round';
                ctx!.stroke();
            }

            animId = requestAnimationFrame(draw);
        }

        resize();
        createDashes();
        draw();

        const parent = canvas.closest('section') || canvas.parentElement;
        if (parent) {
            parent.addEventListener('mousemove', onMouseMove as EventListener);
            parent.addEventListener('mouseleave', onMouseLeave);
        }

        const handleResize = () => { resize(); createDashes(); };
        window.addEventListener('resize', handleResize);

        return () => {
            cancelAnimationFrame(animId);
            if (parent) {
                parent.removeEventListener('mousemove', onMouseMove as EventListener);
                parent.removeEventListener('mouseleave', onMouseLeave);
            }
            window.removeEventListener('resize', handleResize);
        };
    }, [count]);

    return <canvas ref={canvasRef} className={styles.canvas} />;
}
