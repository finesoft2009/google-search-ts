import axios from 'axios';
import * as cheerio from 'cheerio';

interface SearchOptions {
    numResults?: number;      // Количество результатов
    lang?: string;            // Язык
    proxy?: string;           // Прокси
    timeout?: number;         // Таймаут
    safe?: 'active' | 'off';  // Безопасный поиск
    region?: string;          // Регион
    start?: number;           // Стартовая позиция
    unique?: boolean;         // Уникальные результаты
}

interface SearchResult {
    url: string;              // URL результата
    title: string;            // Заголовок результата
    description: string;      // Описание результата
}

class GoogleSearch {
    private static getRandomUserAgent(): string {
        // Генерация случайного User-Agent
        const lynxVersion = `Lynx/${2 + Math.floor(Math.random() * 2)}.${8 + Math.floor(Math.random() * 2)}.${Math.floor(Math.random() * 3)}`;
        const libwwwVersion = `libwww-FM/${2 + Math.floor(Math.random() * 2)}.${13 + Math.floor(Math.random() * 3)}`;
        const sslMmVersion = `SSL-MM/${1 + Math.floor(Math.random())}.${3 + Math.floor(Math.random() * 3)}`;
        const opensslVersion = `OpenSSL/${1 + Math.floor(Math.random() * 3)}.${Math.floor(Math.random() * 5)}.${Math.floor(Math.random() * 10)}`;
        return `${lynxVersion} ${libwwwVersion} ${sslMmVersion} ${opensslVersion}`;
    }

    private static async makeRequest(
        term: string,        // Поисковый запрос
        options: SearchOptions = {}  // Опции поиска
    ): Promise<string> {
        const {
            numResults = 10,
            lang = 'en',
            proxy,
            timeout = 5000,
            safe = 'active',
            region,
            start = 0,
        } = options;

        const url = 'https://www.google.com/search';
        const params = new URLSearchParams({
            q: term,
            num: (numResults + 2).toString(),  // Запрашиваем немного больше результатов, чтобы компенсировать фильтрацию
            hl: lang,
            start: start.toString(),
            safe: safe,
            ...(region && { gl: region }),  // Добавляем параметр региона, если указан
        });

        const headers = {
            'User-Agent': GoogleSearch.getRandomUserAgent(),
            'Accept': '*/*',
            'Cookie': 'CONSENT=PENDING+987; SOCS=CAESHAgBEhIaAB'
        };

        const axiosConfig = {
            headers,
            timeout,
            ...(proxy && {
                proxy: {
                    protocol: proxy.startsWith('https') ? 'https' : 'http',
                    host: new URL(proxy).hostname,
                    port: parseInt(new URL(proxy).port) || (proxy.startsWith('https') ? 443 : 80)
                }
            }),
            validateStatus: (status: number) => status === 200,
            maxRedirects: 5,
            decompress: true
        };

        try {
            const response = await axios.get(`${url}?${params.toString()}`, axiosConfig);
            return response.data;
        } catch (error) {
            if (axios.isAxiosError(error)) {
                throw new Error(`Запрос поиска в Google не удался: ${error.message}`);
            }
            throw error;
        }
    }

    private static parseResults(html: string, unique: boolean = false): SearchResult[] {
        const $ = cheerio.load(html);
        const results: SearchResult[] = [];
        const seenUrls = new Set<string>();

     
        // Удалить отладочные сообщения перед продакшеном
        // console.log('First 1000 characters of HTML:', html.substring(0, 1000));
        
      
        const resultBlocks = $('div.g, div.ezO2md, div.MjjYud');

        resultBlocks.each((_, element) => {
            // Удалить отладочные сообщения перед продакшеном
            // console.log('Processing result block:', $(element).html());
            const linkElement = $(element).find('a[href]').first();
            const titleElement = $(element).find('h3, span.CVA68e').first();
            const descriptionElement = $(element).find('div.VwiC3b, span.FrIlee, div.s').first();

            if (linkElement.length && titleElement.length) {
                const rawUrl = linkElement.attr('href');
                if (rawUrl) {
                    const url = decodeURIComponent(
                        rawUrl.startsWith('/url?q=') ? 
                        rawUrl.split('&')[0].replace('/url?q=', '') : 
                        rawUrl
                    );
                    if (unique && seenUrls.has(url)) {
                        return;
                    }
                    seenUrls.add(url);

                    if (url.startsWith('http')) {
                        results.push({
                            url,
                            title: titleElement.text().trim(),
                            description: descriptionElement.text().trim() || '',
                        });
                    }
                }
            }
        });

        return results;
    }

    public static async search(
        term: string,         // Поисковый запрос
        options: SearchOptions = {}  // Опции поиска
    ): Promise<SearchResult[]> {
        const html = await GoogleSearch.makeRequest(term, options);
        return GoogleSearch.parseResults(html, options.unique);
    }
}

export { GoogleSearch, SearchOptions, SearchResult }; 