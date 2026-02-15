import { useEffect, useRef } from 'react';
import styles from './InteractiveConstellation.module.css';

/*
 * FloatingLines — Efeito idêntico ao antigravity.google
 * 
 * - Dashes flutuam continuamente pelo espaço (drift real, não só bobbing)
 * - Rotação rápida e suave na direção do mouse
 * - Dashes perto do mouse são empurrados levemente
 * - Wrap around nas bordas
 */
export default function InteractiveConstellation({ count = 120 }) {
    const canvasRef = useRef(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext('2d');
        let animId;
        let dashes = [];
        let mouse = { x: -9999, y: -9999 };
        let w, h;

        // Paleta Bombeiros de Goiás
        const palette = [
            { r: 255, g: 102, b: 0 },    // laranja (salvamento)
            { r: 255, g: 133, b: 51 },   // laranja claro
            { r: 204, g: 0, b: 0 },      // vermelho bombeiro
            { r: 230, g: 32, b: 32 },    // vermelho vivo
            { r: 255, g: 215, b: 0 },    // amarelo
            { r: 255, g: 51, b: 0 },     // vermelho-laranja
            { r: 255, g: 102, b: 0 },    // laranja (weight)
            { r: 255, g: 133, b: 51 },   // laranja claro (weight)
            { r: 255, g: 215, b: 0 },    // amarelo (weight)
        ];

        function resize() {
            const dpr = window.devicePixelRatio || 1;
            w = canvas.offsetWidth;
            h = canvas.offsetHeight;
            canvas.width = w * dpr;
            canvas.height = h * dpr;
            ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
        }

        function createDashes() {
            dashes = [];
            for (let i = 0; i < count; i++) {
                dashes.push(makeDash());
            }
        }

        function makeDash() {
            const col = palette[Math.floor(Math.random() * palette.length)];
            const speed = Math.random() * 0.6 + 0.15; // 0.15–0.75 px/frame — real movement
            const moveAngle = Math.random() * Math.PI * 2;

            return {
                x: Math.random() * w,
                y: Math.random() * h,
                vx: Math.cos(moveAngle) * speed,
                vy: Math.sin(moveAngle) * speed,
                length: Math.random() * 6 + 4,          // 4–10px
                thickness: Math.random() * 1.5 + 0.8,   // 0.8–2.3px
                angle: Math.random() * Math.PI * 2,
                targetAngle: Math.random() * Math.PI * 2,
                color: col,
                opacity: Math.random() * 0.5 + 0.3,     // 0.3–0.8
                // Spin when no mouse
                idleRotSpeed: (Math.random() - 0.5) * 0.015,
            };
        }

        // Shortest angle lerp
        function lerpAngle(from, to, t) {
            let diff = to - from;
            while (diff > Math.PI) diff -= Math.PI * 2;
            while (diff < -Math.PI) diff += Math.PI * 2;
            return from + diff * t;
        }

        function onMouseMove(e) {
            const rect = canvas.getBoundingClientRect();
            mouse.x = e.clientX - rect.left;
            mouse.y = e.clientY - rect.top;
        }

        function onMouseLeave() {
            mouse.x = -9999;
            mouse.y = -9999;
        }

        function draw() {
            ctx.clearRect(0, 0, w, h);

            const mouseActive = mouse.x > -1000;

            for (const d of dashes) {
                // Move continuously
                d.x += d.vx;
                d.y += d.vy;

                // Wrap around edges
                if (d.x < -30) d.x = w + 30;
                if (d.x > w + 30) d.x = -30;
                if (d.y < -30) d.y = h + 30;
                if (d.y > h + 30) d.y = -30;

                // Mouse interaction
                if (mouseActive) {
                    const dx = mouse.x - d.x;
                    const dy = mouse.y - d.y;
                    const dist = Math.sqrt(dx * dx + dy * dy);

                    // Rotate toward mouse
                    d.targetAngle = Math.atan2(dy, dx);

                    // Lerp speed depends on distance — closer = faster rotation
                    const lerpSpeed = dist < 150 ? 0.15 : dist < 300 ? 0.06 : 0.02;
                    d.angle = lerpAngle(d.angle, d.targetAngle, lerpSpeed);

                    // Attract toward mouse — magnetic field effect
                    if (dist < 250 && dist > 5) {
                        const pullForce = (250 - dist) / 250 * 1.2;
                        d.x += (dx / dist) * pullForce;
                        d.y += (dy / dist) * pullForce;
                    }
                } else {
                    // Idle: gentle spin
                    d.angle += d.idleRotSpeed;
                }

                // Brightness boost near mouse
                let alpha = d.opacity;
                if (mouseActive) {
                    const dx = mouse.x - d.x;
                    const dy = mouse.y - d.y;
                    const dist = Math.sqrt(dx * dx + dy * dy);
                    if (dist < 200) {
                        alpha = Math.min(1, d.opacity + (1 - dist / 200) * 0.5);
                    }
                }

                // Draw dash
                const halfLen = d.length / 2;
                const cosA = Math.cos(d.angle);
                const sinA = Math.sin(d.angle);
                const x1 = d.x - cosA * halfLen;
                const y1 = d.y - sinA * halfLen;
                const x2 = d.x + cosA * halfLen;
                const y2 = d.y + sinA * halfLen;

                ctx.beginPath();
                ctx.moveTo(x1, y1);
                ctx.lineTo(x2, y2);
                ctx.strokeStyle = `rgba(${d.color.r}, ${d.color.g}, ${d.color.b}, ${alpha})`;
                ctx.lineWidth = d.thickness;
                ctx.lineCap = 'round';
                ctx.stroke();
            }

            animId = requestAnimationFrame(draw);
        }

        resize();
        createDashes();
        draw();

        // Listen on the hero section (parent), not the canvas
        const parent = canvas.closest('section') || canvas.parentElement;
        parent.addEventListener('mousemove', onMouseMove);
        parent.addEventListener('mouseleave', onMouseLeave);

        const handleResize = () => { resize(); createDashes(); };
        window.addEventListener('resize', handleResize);

        return () => {
            cancelAnimationFrame(animId);
            parent.removeEventListener('mousemove', onMouseMove);
            parent.removeEventListener('mouseleave', onMouseLeave);
            window.removeEventListener('resize', handleResize);
        };
    }, [count]);

    return <canvas ref={canvasRef} className={styles.canvas} />;
}
