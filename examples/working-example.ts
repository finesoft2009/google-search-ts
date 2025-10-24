import { GoogleSearch } from '../src/googleSearch';

async function runWorkingExample() {
    try {
        console.log('Запуск поискового запроса с рекомендуемыми настройками...');
        
        // Пример поиска с рекомендуемыми параметрами для обхода ограничений
        const results = await GoogleSearch.search('TypeScript tutorial', {
            numResults: 5,        // Количество результатов
            lang: 'en',           // Язык результатов
            safe: 'active',       // Безопасный поиск
            unique: true,         // Только уникальные URL
            timeout: 10000        // Увеличенный таймаут
            // Для использования прокси, раскомментируйте следующую строку:
            // proxy: 'http://your-proxy-server:port'
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
            console.log('='.repeat(50));
            console.log('Поиск завершен успешно!');
        } else {
            console.log('Результаты не найдены. Это может быть связано с:');
            console.log('1. Блокировкой запросов со стороны Google');
            console.log('2. Необходимостью использования прокси-сервера');
            console.log('3. Изменением структуры страницы Google');
            console.log('\nРекомендации:');
            console.log('- Попробуйте использовать прокси-сервер');
            console.log('- Добавьте случайные задержки между запросами');
            console.log('- Обновите CSS-селекторы в методе parseResults при необходимости');
        }

    } catch (error: any) {
        console.error('Ошибка при выполнении поиска:', error.message);
    }
}

// Запуск примера
runWorkingExample();