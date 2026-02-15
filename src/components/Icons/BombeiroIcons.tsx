/*
 * SVG Icons para o Museu Virtual CBMGO
 * Ícones vetoriais temáticos de bombeiros
 */

interface IconProps {
    size?: number;
    color?: string;
}

export function FireHelmetIcon({ size = 48, color = '#FF6600' }: IconProps) {
    return (
        <svg width={size} height={size} viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M32 6C20 6 12 14 10 24C8 34 10 40 10 40H54C54 40 56 34 54 24C52 14 44 6 32 6Z" fill={color} opacity="0.9" />
            <path d="M8 40C8 40 6 44 6 46C6 50 10 52 10 52H54C54 52 58 50 58 46C58 44 56 40 56 40H8Z" fill={color} />
            <path d="M28 42H36V52H28V42Z" fill="#FFD700" />
            <path d="M30 12C30 12 24 18 24 26C24 30 26 34 32 34C38 34 40 30 40 26C40 18 34 12 34 12" stroke="#FFD700" strokeWidth="2" strokeLinecap="round" fill="none" />
            <path d="M32 18V28M28 24H36" stroke="#FFD700" strokeWidth="2" strokeLinecap="round" />
            <rect x="18" y="38" width="28" height="4" rx="1" fill="#FFD700" opacity="0.6" />
        </svg>
    );
}

export function FireExtinguisherIcon({ size = 48, color = '#CC0000' }: IconProps) {
    return (
        <svg width={size} height={size} viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
            <rect x="22" y="16" width="20" height="38" rx="4" fill={color} />
            <rect x="26" y="24" width="12" height="6" rx="1" fill="#FFD700" opacity="0.8" />
            <path d="M28 16V10H36V16" stroke={color} strokeWidth="2" />
            <path d="M36 10C36 10 42 6 44 8" stroke="#FF6600" strokeWidth="2" strokeLinecap="round" />
            <circle cx="32" cy="42" r="5" fill="#FFD700" opacity="0.6" />
            <rect x="24" y="54" width="16" height="4" rx="2" fill={color} opacity="0.7" />
        </svg>
    );
}

export function DocumentScrollIcon({ size = 48, color = '#FF8533' }: IconProps) {
    return (
        <svg width={size} height={size} viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M16 8H40L48 16V56H16V8Z" fill={color} opacity="0.15" stroke={color} strokeWidth="2" />
            <path d="M40 8V16H48" stroke={color} strokeWidth="2" />
            <line x1="22" y1="24" x2="42" y2="24" stroke={color} strokeWidth="1.5" opacity="0.6" />
            <line x1="22" y1="30" x2="42" y2="30" stroke={color} strokeWidth="1.5" opacity="0.6" />
            <line x1="22" y1="36" x2="36" y2="36" stroke={color} strokeWidth="1.5" opacity="0.6" />
            <line x1="22" y1="42" x2="40" y2="42" stroke={color} strokeWidth="1.5" opacity="0.6" />
            <line x1="22" y1="48" x2="34" y2="48" stroke={color} strokeWidth="1.5" opacity="0.6" />
            <circle cx="44" cy="44" r="12" fill="#0A0A0A" stroke="#FFD700" strokeWidth="2" />
            <path d="M44 38V44L48 46" stroke="#FFD700" strokeWidth="2" strokeLinecap="round" />
        </svg>
    );
}

export function CameraHistoricIcon({ size = 48, color = '#FFD700' }: IconProps) {
    return (
        <svg width={size} height={size} viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M8 20H56V52H8V20Z" fill={color} opacity="0.15" stroke={color} strokeWidth="2" rx="3" />
            <path d="M24 20L28 12H36L40 20" stroke={color} strokeWidth="2" />
            <circle cx="32" cy="36" r="10" stroke={color} strokeWidth="2" fill="none" />
            <circle cx="32" cy="36" r="6" fill={color} opacity="0.3" />
            <circle cx="32" cy="36" r="3" fill={color} opacity="0.6" />
            <circle cx="48" cy="26" r="2" fill="#FF6600" />
        </svg>
    );
}

export function PhoenixIcon({ size = 48, color = '#FF6600' }: IconProps) {
    return (
        <svg width={size} height={size} viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M32 58C32 58 16 46 16 32C16 22 22 14 32 10C42 14 48 22 48 32C48 46 32 58 32 58Z" fill={color} opacity="0.2" />
            <path d="M32 10C32 10 26 18 26 28C26 34 28 38 32 42C36 38 38 34 38 28C38 18 32 10 32 10Z" fill={color} opacity="0.6" />
            <path d="M32 20C32 20 29 24 29 30C29 34 30 36 32 38C34 36 35 34 35 30C35 24 32 20 32 20Z" fill="#FFD700" />
            <path d="M20 16C20 16 14 12 10 14C14 18 18 20 22 20" stroke={color} strokeWidth="1.5" strokeLinecap="round" fill="none" />
            <path d="M44 16C44 16 50 12 54 14C50 18 46 20 42 20" stroke={color} strokeWidth="1.5" strokeLinecap="round" fill="none" />
            <path d="M24 8C24 8 20 4 18 6C20 8 22 10 26 10" stroke="#FFD700" strokeWidth="1.5" strokeLinecap="round" fill="none" />
            <path d="M40 8C40 8 44 4 46 6C44 8 42 10 38 10" stroke="#FFD700" strokeWidth="1.5" strokeLinecap="round" fill="none" />
        </svg>
    );
}
