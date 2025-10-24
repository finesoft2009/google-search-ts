import { GoogleSearch } from './googleSearch';

async function test() {
    try {
        // Базовый поиск с опциями по умолчанию
        const results = await GoogleSearch.search('TypeScript programming', {
            numResults: 10,
            lang: 'en',
            safe: 'active',
            unique: true  // Получать только уникальные результаты
        });

        console.log('Результаты:\n');
        console.log(results);
    } catch (error) {
        console.error('Поиск не удался:', error);
    }
}

test(); 