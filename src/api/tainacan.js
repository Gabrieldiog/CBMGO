const API_BASE = '/wp-json/tainacan/v2';
const WP_ORIGIN = 'http://museu-virtual.local';

/**
 * Reescreve URLs absolutas de museu-virtual.local para caminhos relativos,
 * permitindo que o proxy do Vite encaminhe as requisições corretamente.
 */
function rewriteUrl(url) {
    if (!url || typeof url !== 'string') return url;
    if (url.startsWith(WP_ORIGIN)) {
        return url.replace(WP_ORIGIN, '');
    }
    return url;
}

/**
 * Extrai a melhor URL de thumbnail de um item do Tainacan.
 *
 * Formato retornado pela API (com fetch_only=thumbnail):
 *   item.thumbnail = {
 *     medium: [url, width, height, cropped, blurHash],
 *     full: [url, width, height, cropped, blurHash],
 *     tainacan-medium: [...], etc
 *   }
 *
 * Também tenta extrair de document_as_html como fallback.
 */
export function getThumbnailUrl(item) {
    if (!item) return null;

    // caso 1: thumbnail é um objeto com tamanhos (Tainacan v2 com fetch_only)
    if (item.thumbnail && typeof item.thumbnail === 'object') {
        const thumb = item.thumbnail;
        const sizes = ['tainacan-medium', 'medium_large', 'medium', 'large', 'full', 'thumbnail'];
        for (const size of sizes) {
            if (thumb[size]) {
                const val = thumb[size];
                const url = Array.isArray(val) ? val[0] : val;
                if (url && typeof url === 'string') return rewriteUrl(url);
            }
        }
        // fallback: qualquer chave que seja array com URL
        for (const key of Object.keys(thumb)) {
            const val = thumb[key];
            const url = Array.isArray(val) ? val[0] : (typeof val === 'string' ? val : null);
            if (url && typeof url === 'string' && (url.startsWith('http') || url.startsWith('/'))) return rewriteUrl(url);
        }
    }

    // caso 2: thumbnail é uma string URL direta
    if (item.thumbnail && typeof item.thumbnail === 'string') {
        return rewriteUrl(item.thumbnail);
    }

    // caso 3: extrair URL de document_as_html (que contém <img src="...">)
    if (item.document_as_html && typeof item.document_as_html === 'string') {
        const match = item.document_as_html.match(/src="([^"]+)"/);
        if (match && match[1]) return rewriteUrl(match[1]);
    }

    return null;
}

export async function fetchCollections() {
    try {
        const res = await fetch(`${API_BASE}/collections`);
        if (!res.ok) throw new Error('Erro ao buscar coleções');
        return await res.json();
    } catch (err) {
        console.error('fetchCollections:', err);
        return [];
    }
}

export async function fetchCollectionItems(collectionId, page = 1, perPage = 12) {
    try {
        const res = await fetch(
            `${API_BASE}/collection/${collectionId}/items?paged=${page}&perpage=${perPage}&fetch_only=id,title,description,thumbnail,document,document_as_html,_thumbnail_id,document_type,document_mimetype`
        );
        if (!res.ok) throw new Error('Erro ao buscar itens');
        const data = await res.json();

        // Debug: log da estrutura do primeiro item
        const firstItem = data.items?.[0] || (Array.isArray(data) ? data[0] : null);
        if (firstItem) {
            console.log('[Tainacan] Item structure:', {
                id: firstItem.id,
                title: firstItem.title,
                thumbnailKeys: firstItem.thumbnail ? Object.keys(firstItem.thumbnail) : 'undefined',
                thumbnailUrl: getThumbnailUrl(firstItem),
                document: firstItem.document,
            });
        }

        const totalItems = res.headers.get('X-WP-Total') || '0';
        const totalPages = res.headers.get('X-WP-TotalPages') || '1';
        return { items: data.items || data, totalItems: parseInt(totalItems), totalPages: parseInt(totalPages) };
    } catch (err) {
        console.error('fetchCollectionItems:', err);
        return { items: [], totalItems: 0, totalPages: 1 };
    }
}

export async function fetchItem(itemId) {
    try {
        const res = await fetch(`${API_BASE}/items/${itemId}`);
        if (!res.ok) throw new Error('Erro ao buscar item');
        const item = await res.json();

        console.log('[Tainacan] Item detail:', {
            id: item.id,
            title: item.title,
            thumbnailKeys: item.thumbnail ? Object.keys(item.thumbnail) : 'undefined',
            thumbnailUrl: getThumbnailUrl(item),
        });

        return item;
    } catch (err) {
        console.error('fetchItem:', err);
        return null;
    }
}

// Map coleções com slug para roteamento
export const COLLECTIONS_MAP = {
    objetos: { id: 66, name: 'Objetos', slug: 'objetos', description: 'Coleção de objetos históricos preservados que contam a história da corporação.', icon: '🏛️' },
    documentos: { id: 39, name: 'Documentos', slug: 'documentos', description: 'Documentos históricos, registros e publicações de relevância institucional.', icon: '📜' },
    fotografias: { id: 5, name: 'Fotografias', slug: 'fotografias', description: 'Acervo fotográfico que registra momentos marcantes da história.', icon: '📷' },
};

export function getCollectionBySlug(slug) {
    return COLLECTIONS_MAP[slug] || null;
}

export function getCollectionById(id) {
    return Object.values(COLLECTIONS_MAP).find(c => c.id === id) || null;
}
