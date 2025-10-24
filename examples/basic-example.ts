import { GoogleSearch, SearchOptions } from '../src/googleSearch';

async function runExample() {
    try {
        console.log('Запуск поискового запроса...');
        
        // Простой пример поиска
        const results = await GoogleSearch.search('TypeScript tutorial', {
            numResults: 5,        // Количество результатов
            lang: 'en',           // Язык результатов
            safe: 'active',       // Безопасный поиск
            unique: true          // Только уникальные URL
        });

        console.log(`\nНайдено ${results.length} результатов:`);
        console.log('='.repeat(50));
        
        results.forEach((result, index) => {
            console.log(`${index + 1}. ${result.title}`);
            console.log(`   URL: ${result.url}`);
            console.log(`   Описание: ${result.description || 'Нет описания'}`);
            console.log('');
        });

        console.log('='.repeat(50));
        console.log('Поиск завершен успешно!');

    } catch (error) {
        console.error('Ошибка при выполнении поиска:', error.message);
    }
}

// Запуск примера
runExample();