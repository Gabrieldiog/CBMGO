import { useState, useRef, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import ParticlesBackground from '../../components/ParticlesBackground/ParticlesBackground';
import styles from './HistoriaCorporacao.module.css';
import type { TouchEvent as ReactTouchEvent, WheelEvent as ReactWheelEvent } from 'react';

interface CoverPage {
    type: 'cover';
    title: string;
    subtitle: string;
    year: string;
    desc: string;
    content?: never;
    chapter?: never;
    highlight?: never;
}

interface ChapterPage {
    type: 'chapter';
    chapter: string;
    title: string;
    content: string;
    highlight: string;
    year: string;
    subtitle?: never;
    desc?: never;
}

interface FinalPage {
    type: 'final';
    title: string;
    content: string;
    highlight: string;
    year: string;
    subtitle?: never;
    desc?: never;
    chapter?: never;
}

type BookPage = CoverPage | ChapterPage | FinalPage;

const PAGES: BookPage[] = [
    {
        type: 'cover',
        title: 'História do CBMGO',
        subtitle: 'Corpo de Bombeiros Militar do Estado de Goiás',
        year: '1957 – Presente',
        desc: 'Uma jornada através da história, coragem e dedicação dos bombeiros goianos',
    },
    {
        type: 'chapter',
        chapter: 'Capítulo I',
        title: 'O Início (1957)',
        content: `Em 5 de novembro de 1957, foram designados 11 policiais militares para frequentarem no Estado de Minas Gerais o Curso de Bombeiros, com duração de 8 meses. Este foi o primeiro passo para a criação do serviço de bombeiros em Goiás.

A necessidade surgiu após incêndios que ocorreram na Capital, mais especificamente um incêndio no salão de festas do Palácio do Governo, que evidenciou a urgência de se ter uma corporação especializada no combate ao fogo.

Aqueles 11 homens representaram a semente de uma corporação que viria a se tornar referência nacional em proteção e salvamento.`,
        highlight: '11 policiais militares — os primeiros bombeiros de Goiás',
        year: '1957',
    },
    {
        type: 'chapter',
        chapter: 'Capítulo II',
        title: 'A Primeira Companhia (1958)',
        content: `Em 17 de dezembro de 1958 foi editada a Lei nº 2.400, que criava uma Companhia de Bombeiros na Capital, dentro da estrutura da Polícia Militar do Estado de Goiás.

A sede inicial ficava na Avenida Anhanguera, próximo ao Lago das Rosas. O trem de socorro era composto de apenas um Auto Bomba Tanque, tipo Thames 2000, e uma viatura Pirsch — Auto-Pó Químico, ambos doados pelo Governador Carlos Lacerda, então Governador do Rio de Janeiro.

Em 1963, a companhia mudou-se para a Rua 66, nº 253, no Setor Central, buscando melhores condições para atender a crescente demanda da população goianiense.`,
        highlight: 'Lei nº 2.400 — criação oficial da Companhia de Bombeiros',
        year: '1958',
    },
    {
        type: 'chapter',
        chapter: 'Capítulo III',
        title: 'Estruturação e Crescimento',
        content: `A Lei nº 5.542, de 10 de novembro de 1964, situou a Companhia de Bombeiros no 1º Batalhão da Polícia Militar, denominado Batalhão Anhanguera.

Em 1967, pela Lei nº 6.814, de 14 de novembro, o Corpo de Bombeiros recebeu pela primeira vez esta denominação em Goiás, além de ganhar estrutura de Batalhão.

Com a Lei nº 8.125 de 1976 e o Decreto nº 1.936 de 1981, foram criados os seguintes órgãos:
• Comando do Corpo de Bombeiros (CCB)
• 1º Grupamento de Incêndio
• Seções de Combate a Incêndio em Campinas, Anápolis e Itumbiara
• Seção no Aeroporto Santa Genoveva

Em 1985, foi criada a Seção Contra Incêndio na cidade de Rio Verde, expandindo a presença para o interior do estado.`,
        highlight: 'De Companhia a Batalhão — crescimento constante',
        year: '1964–1985',
    },
    {
        type: 'chapter',
        chapter: 'Capítulo IV',
        title: 'A Separação (1989)',
        content: `O momento mais transformador da história do CBMGO veio com a Constituição Estadual, promulgada em 5 de outubro de 1989, que criou o Corpo de Bombeiros Militar como um dos órgãos componentes da Segurança Pública Estadual.

O CBMGO passou a constituir-se numa corporação independente e autônoma, com as seguintes missões:

I — A execução de atividades de defesa civil;
II — A prevenção e o combate a incêndios e a situações de pânico, assim como ações de busca e salvamento de pessoas e bens;
III — O desenvolvimento de atividades educativas relacionadas com a defesa civil e a prevenção de incêndio e pânico;
IV — A análise de projetos e inspeção de instalações preventivas de proteção contra incêndio e pânico nas edificações.`,
        highlight: 'Constituição de 1989 — autonomia e independência',
        year: '1989',
    },
    {
        type: 'chapter',
        chapter: 'Capítulo V',
        title: 'O Primeiro Comando',
        content: `Em 1º de janeiro de 1990, o Governador do Estado nomeou o primeiro Comandante Geral da Corporação — o Coronel PM Pedro Francisco da Silva — determinando-lhe empreender esforços para a estruturação do Corpo de Bombeiros.

O Coronel Pedro Francisco recebeu da Polícia Militar o efetivo, viaturas e equipamentos para iniciar a estruturação. Dentre suas realizações:
• Efetivação da separação institucional
• Criação de estrutura básica administrativa e operacional
• Instalação do QCG na antiga Rodoviária de Goiânia, no Lago das Rosas
• Implantação do serviço "Chame Ambulância — 192"
• Criação da Banda de Música do CBMGO`,
        highlight: 'Cel. Pedro Francisco — o arquiteto do CBMGO moderno',
        year: '1990',
    },
    {
        type: 'chapter',
        chapter: 'Capítulo VI',
        title: 'Expansão pelo Estado',
        content: `Sob o comando do Coronel João de Oliveira Godinho (1991-1994), iniciaram-se os grandes avanços estruturais. Foram incluídas as primeiras turmas de novos bombeiros e realizados marcos importantes:

• Ampliação física do Comando Geral
• Construção do complexo esportivo e primeira piscina
• Formação da primeira turma de Oficiais Bombeiros
• Aquisição da Auto Plataforma Aérea (APA)

Nos anos seguintes, unidades foram ativadas em diversas cidades: Jataí, Caldas Novas, Luziânia, Formosa, Porangatu, Uruaçu, Trindade, Aparecida de Goiânia, Catalão, São Miguel do Araguaia, Ceres, Aruanã e Ipameri.

Em 2002, o CBMGO realizou seu primeiro Curso de Formação de Oficiais na própria Corporação, em parceria com a Universidade Estadual de Goiás, tornando-se um dos primeiros estados brasileiros a formar oficiais com graduação superior.`,
        highlight: 'De 1 unidade para mais de 15 — presença em todo o estado',
        year: '1991–2002',
    },
    {
        type: 'chapter',
        chapter: 'Capítulo VII',
        title: 'O Símbolo da Fênix',
        content: `Instituído pelo Decreto nº 4.793, de 14 de maio de 1997, o Símbolo do CBMGO tem sua ênfase na figura da ave mitológica Fênix.

A Fênix enfrenta o fogo para gerar a vida, "ressurgindo das cinzas" — ela dá a vida para gerar outras vidas, representando perfeitamente a essência do bombeiro militar.

O círculo dá a ideia de continuidade e evolução. As mangueiras, em sentido anti-horário, revelam o desafio do bombeiro de correr contra o tempo no combate ao incêndio e no resgate de vidas.

As cores possuem significados:
• Vermelha — combate a incêndio
• Laranja — resgate e salvamento
• Amarela e preta — destaque visual para os elementos heráldicos

As cores básicas — vermelha rubi e laranja — são as cores heráldicas oficiais do Corpo de Bombeiros Militar do Estado de Goiás.`,
        highlight: 'A Fênix renasce das cinzas — assim como o bombeiro salva vidas do fogo',
        year: '1997',
    },
    {
        type: 'chapter',
        chapter: 'Capítulo VIII',
        title: 'Grandes Operações',
        content: `O CBMGO participou de operações de grande porte que marcaram a história do estado:

Parque Nacional da Chapada dos Veadeiros (2001): Em 11 de setembro, um incêndio de grandes proporções atingiu o parque. O CBMGO empregou 17 viaturas e uma média de 79 militares por dia. O combate ao fogo perdurou por 3 dias, resultando na preservação de 70% da área total.

Parque Nacional das Emas: Localizado nos municípios de Mineiros e Chapadão do Céu, com área de 132.642 hectares, o parque passou por inúmeros incêndios. A última grande ocorrência foi em 2010, com o incêndio iniciado em 12 de agosto, controlado apenas no final do dia 16.

O Corpo de Bombeiros também atuou decisivamente na gestão de desastres urbanos, salvamentos aquáticos e atendimentos pré-hospitalares, consolidando-se como referência em proteção à vida.`,
        highlight: 'Coragem em ação — protegendo vidas e o meio ambiente',
        year: '2001–2010',
    },
    {
        type: 'final',
        title: 'CBMGO Hoje',
        content: `Hoje, o Corpo de Bombeiros Militar do Estado de Goiás é uma corporação sólida, com presença em todo o território goiano, formando profissionais de excelência e servindo à sociedade com dedicação incansável.

Com mais de 65 anos de história, o CBMGO continua a honrar o lema de seus fundadores: proteger vidas, preservar o patrimônio e servir à comunidade com coragem e competência.

Este museu virtual é mais uma expressão desse compromisso — preservar a memória para inspirar as futuras gerações de bombeiros e fortalecer o sentimento de pertencimento de todos os goianos.`,
        highlight: 'Mais de 65 anos protegendo Goiás',
        year: 'Presente',
    },
];

export default function HistoriaCorporacao() {
    const [currentPage, setCurrentPage] = useState(0);
    const [direction, setDirection] = useState(0);
    const [isFlipping, setIsFlipping] = useState(false);
    const touchStart = useRef<number | null>(null);
    const containerRef = useRef<HTMLDivElement | null>(null);

    const totalPages = PAGES.length;

    const goToPage = useCallback((newPage: number, dir: number) => {
        if (isFlipping || newPage < 0 || newPage >= totalPages) return;
        setIsFlipping(true);
        setDirection(dir);
        setCurrentPage(newPage);
        setTimeout(() => setIsFlipping(false), 600);
    }, [isFlipping, totalPages]);

    const nextPage = useCallback(() => goToPage(currentPage + 1, 1), [currentPage, goToPage]);
    const prevPage = useCallback(() => goToPage(currentPage - 1, -1), [currentPage, goToPage]);

    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.key === 'ArrowRight' || e.key === 'ArrowDown') nextPage();
            if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') prevPage();
        };
        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [nextPage, prevPage]);

    const handleTouchStart = (e: ReactTouchEvent) => {
        touchStart.current = e.touches[0].clientX;
    };

    const handleTouchEnd = (e: ReactTouchEvent) => {
        if (touchStart.current === null) return;
        const diff = touchStart.current - e.changedTouches[0].clientX;
        if (Math.abs(diff) > 50) {
            if (diff > 0) nextPage();
            else prevPage();
        }
        touchStart.current = null;
    };

    const handleWheel = useCallback((e: ReactWheelEvent) => {
        if (Math.abs(e.deltaX) > Math.abs(e.deltaY)) {
            if (e.deltaX > 30) nextPage();
            else if (e.deltaX < -30) prevPage();
        }
    }, [nextPage, prevPage]);

    const page = PAGES[currentPage];

    const pageVariants = {
        enter: (dir: number) => ({
            rotateY: dir > 0 ? 90 : -90,
            opacity: 0,
            scale: 0.95,
        }),
        center: {
            rotateY: 0,
            opacity: 1,
            scale: 1,
        },
        exit: (dir: number) => ({
            rotateY: dir > 0 ? -90 : 90,
            opacity: 0,
            scale: 0.95,
        }),
    };

    return (
        <div
            className={styles.bookContainer}
            ref={containerRef}
            onTouchStart={handleTouchStart}
            onTouchEnd={handleTouchEnd}
            onWheel={handleWheel}
        >
            <ParticlesBackground count={30} />

            <div className={styles.bookSpine}></div>

            <AnimatePresence mode="wait" custom={direction}>
                <motion.div
                    key={currentPage}
                    className={styles.page}
                    custom={direction}
                    variants={pageVariants}
                    initial="enter"
                    animate="center"
                    exit="exit"
                    transition={{
                        duration: 0.5,
                        ease: [0.25, 0.46, 0.45, 0.94],
                    }}
                    style={{ perspective: 1200, transformStyle: 'preserve-3d' }}
                >
                    {page.type === 'cover' && (
                        <div className={styles.coverPage}>
                            <div className={styles.coverLogo}>
                                <img src="/img/logo_bm.png" alt="CBMGO" className={styles.coverLogoImg} />
                            </div>
                            <div className={styles.coverLine}></div>
                            <h1 className={styles.coverTitle}>{page.title}</h1>
                            <p className={styles.coverSubtitle}>{page.subtitle}</p>
                            <span className={styles.coverYear}>{page.year}</span>
                            <p className={styles.coverDesc}>{page.desc}</p>
                            <div className={styles.coverLine}></div>
                            <p className={styles.coverHint}>← Arraste ou use as setas para navegar →</p>
                        </div>
                    )}

                    {page.type === 'chapter' && (
                        <div className={styles.chapterPage}>
                            <div className={styles.chapterHeader}>
                                <span className={styles.chapterLabel}>{page.chapter}</span>
                                <span className={styles.chapterYear}>{page.year}</span>
                            </div>
                            <h2 className={styles.chapterTitle}>{page.title}</h2>
                            <div className={styles.chapterDivider}></div>
                            <div className={styles.chapterContent}>
                                {page.content.split('\n\n').map((p, i) => (
                                    <p key={i}>{p}</p>
                                ))}
                            </div>
                            {page.highlight && (
                                <div className={styles.chapterHighlight}>
                                    <span className={styles.highlightIcon}>🔥</span>
                                    <span>{page.highlight}</span>
                                </div>
                            )}
                        </div>
                    )}

                    {page.type === 'final' && (
                        <div className={styles.finalPage}>
                            <div className={styles.finalLogo}>
                                <img src="/img/logo_bm.png" alt="CBMGO" className={styles.coverLogoImg} />
                            </div>
                            <h2 className={styles.finalTitle}>{page.title}</h2>
                            <div className={styles.chapterDivider}></div>
                            <div className={styles.chapterContent}>
                                {page.content.split('\n\n').map((p, i) => (
                                    <p key={i}>{p}</p>
                                ))}
                            </div>
                            <div className={styles.chapterHighlight}>
                                <span className={styles.highlightIcon}>🔥</span>
                                <span>{page.highlight}</span>
                            </div>
                        </div>
                    )}
                </motion.div>
            </AnimatePresence>

            {/* Navigation */}
            <div className={styles.nav}>
                <button
                    className={styles.navBtn}
                    onClick={prevPage}
                    disabled={currentPage === 0}
                    aria-label="Página anterior"
                >
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                        <path d="M15 18l-6-6 6-6" />
                    </svg>
                </button>

                <div className={styles.pagination}>
                    {PAGES.map((_, i) => (
                        <button
                            key={i}
                            className={`${styles.dot} ${i === currentPage ? styles.dotActive : ''}`}
                            onClick={() => goToPage(i, i > currentPage ? 1 : -1)}
                            aria-label={`Página ${i + 1}`}
                        />
                    ))}
                </div>

                <button
                    className={styles.navBtn}
                    onClick={nextPage}
                    disabled={currentPage === totalPages - 1}
                    aria-label="Próxima página"
                >
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                        <path d="M9 18l6-6-6-6" />
                    </svg>
                </button>
            </div>

            {/* Page Counter */}
            <div className={styles.pageCounter}>
                {currentPage + 1} / {totalPages}
            </div>
        </div>
    );
}
