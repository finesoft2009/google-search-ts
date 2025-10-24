import { GoogleSearch } from '../src/googleSearch';

async function runAdvancedExample() {
    try {
        console.log('Запуск расширенного поискового запроса...');

        // Пример поиска с расширенными параметрами
        const results = await GoogleSearch.search('javascript tutorial', {
            numResults: 3,        // Меньше результатов для тестирования
            lang: 'en',           // Язык
            region: 'US',         // Регион
            safe: 'active',       // Безопасный поиск
            unique: true          // Только уникальные URL
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
            console.log('Результаты не найдены. Возможно, запрос был заблокирован Google.');
            console.log('Это может быть связано с:');
            console.log('- Необходимостью использовать прокси');
            console.log('- Изменением структуры страницы Google');
            console.log('- Ограничениями на частоту запросов');
        }

        console.log('='.repeat(50));
        console.log('Расширенный поиск завершен!');

    } catch (error: any) {
        console.error('Ошибка при выполнении расширенного поиска:', error.message);
    }
}

// Запуск расширенного примера
runAdvancedExample();