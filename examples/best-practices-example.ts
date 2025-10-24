import { GoogleSearch } from '../src/googleSearch';

async function runBestPracticesExample() {
    try {
        console.log('Запуск поискового запроса с рекомендуемыми практиками...');
        
        // Добавляем случайную задержку перед запросом (имитация реального пользователя)
        const delay = Math.floor(Math.random() * 2000) + 1000; // 1-3 секунды
        console.log(`Задержка перед запросом: ${delay}мс`);
        await new Promise(resolve => setTimeout(resolve, delay));

        const results = await GoogleSearch.search('TypeScript tutorial', {
            numResults: 3,        // Меньше результатов для снижения подозрений
            lang: 'en',           // Язык
            safe: 'active',       // Безопасный поиск
            unique: true,         // Только уникальные URL
            timeout: 10000       // Увеличенный таймаут
        });

        console.log(`\nНайдено ${results.length} результатов:`);
        console.log('='.repeat(50));
        
        if (results.length > 0) {
            results.forEach((result, index) => {
                console.log(`${index + 1}. ${result.title}`);
                console.log(`   URL: ${result.url}`);
                console.log(`   Описание: ${result.description || 'Нет описания'}`);
                console.log('');
            });
        } else {
            console.log('Результаты не найдены. Рекомендуется использовать прокси-сервер.');
        }

        console.log('='.repeat(50));
        console.log('Поиск завершен!');

    } catch (error: any) {
        console.error('Ошибка при выполнении поиска:', error.message);
    }
}

// Запуск примера
runBestPracticesExample();