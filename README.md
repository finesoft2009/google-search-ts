# google-search-ts

TypeScript библиотека для выполнения Google поиска с поддержкой прокси, пагинации и настройки параметров.

## Установка

```bash
npm install google-search-ts
```

## Использование

```typescript
import { GoogleSearch, SearchOptions } from 'google-search-ts';

// Базовый поиск
const results = await GoogleSearch.search('nodejs typescript');

// Поиск с опциями
const options: SearchOptions = {
    numResults: 20,        // Количество возвращаемых результатов
    lang: 'en',           // Язык результатов поиска
    safe: 'active',       // Настройки безопасного поиска ('active' или 'off')
    region: 'US',         // Регион для результатов поиска
    start: 0,             // Начальная позиция для пагинации
    unique: true,         // Удалить дубликаты URL
    proxy: 'http://proxy.example.com:8080',  // Опциональный прокси
    timeout: 5000         // Таймаут запроса в миллисекундах
};

const resultsWithOptions = await GoogleSearch.search('nodejs typescript', options);

// Каждый результат содержит:
// {
//     url: string;        // URL результата поиска
//     title: string;      // Заголовок результата поиска
//     description: string; // Описание/отрывок результата поиска
// }
```

## Примеры

### Базовый поиск
```typescript
import { GoogleSearch } from 'google-search-ts';

async function basicSearch() {
    try {
        const results = await GoogleSearch.search('nodejs typescript');
        console.log(`Найдено ${results.length} результатов`);
        
        // Вывести первый результат
        console.log('Первый результат:', {
            title: results[0].title,
            url: results[0].url,
            description: results[0].description
        });
    } catch (error) {
        console.error('Поиск не удался:', error.message);
    }
}
```

### Пагинация
```typescript
import { GoogleSearch } from 'google-search-ts';

async function paginatedSearch() {
    const query = 'typescript tutorials';
    const resultsPerPage = 10;
    
    try {
        // Получить первую страницу
        const page1 = await GoogleSearch.search(query, {
            numResults: resultsPerPage,
            start: 0
        });
        
        // Получить вторую страницу
        const page2 = await GoogleSearch.search(query, {
            numResults: resultsPerPage,
            start: resultsPerPage
        });
        
        const allResults = [...page1, ...page2];
        console.log(`Всего результатов: ${allResults.length}`);
    } catch (error) {
        console.error('Пагинированный поиск не удался:', error.message);
    }
}
```

### Поиск с учетом языка и региона
```typescript
import { GoogleSearch } from 'google-search-ts';

async function localizedSearch() {
    try {
        // Поиск на французском, ограниченный Францией
        const frenchResults = await GoogleSearch.search('développeur web', {
            lang: 'fr',
            region: 'FR',
            numResults: 10
        });
        
        // Поиск на немецком, ограниченный Германией
        const germanResults = await GoogleSearch.search('webentwickler', {
            lang: 'de',
            region: 'DE',
            numResults: 10
        });
        
        console.log('Французские результаты:', frenchResults.length);
        console.log('Немецкие результаты:', germanResults.length);
    } catch (error) {
        console.error('Локализованный поиск не удался:', error.message);
    }
}
```

### Использование прокси
```typescript
import { GoogleSearch } from 'google-search-ts';

async function searchWithProxy() {
    try {
        const results = await GoogleSearch.search('programming jobs', {
            proxy: 'http://your-proxy-server:8080',
            timeout: 10000,  // Увеличенный таймаут для прокси
            numResults: 15
        });
        
        console.log(`Найдено ${results.length} вакансий`);
    } catch (error) {
        console.error('Поиск с прокси не удался:', error.message);
    }
}
```

### Обработка ошибок
```typescript
import { GoogleSearch } from 'google-search-ts';

async function robustSearch() {
    try {
        const results = await GoogleSearch.search('typescript examples', {
            numResults: 20,
            unique: true  // Удалить дубликаты URL
        });
        
        if (results.length === 0) {
            console.log('Результаты не найдены');
            return;
        }
        
        // Обработка результатов
        results.forEach((result, index) => {
            console.log(`${index + 1}. ${result.title}`);
            console.log(`   URL: ${result.url}`);
            console.log(`   Описание: ${result.description}\n`);
        });
        
    } catch (error) {
        if (error.message.includes('timeout')) {
            console.error('Поиск превысил время ожидания. Попробуйте увеличить значение таймаута.');
        } else if (error.message.includes('proxy')) {
            console.error('Ошибка прокси. Проверьте настройки прокси.');
        } else {
            console.error('Поиск не удался:', error.message);
        }
    }
}
```

## Особенности

- 🔍 Выполнение Google поиска программно
- 🌍 Поддержка разных языков и регионов
- 🔐 Поддержка безопасного поиска
- 📄 Поддержка пагинации
- 🔄 Поддержка прокси
- 🎯 Настраиваемое количество результатов
- 🚫 Фильтрация дубликатов URL
- ⏱️ Настраиваемый таймаут
- 📝 Включены определения типов TypeScript

## Опции

| Опция | Тип | По умолчанию | Описание |
|--------|------|---------|-------------|
| numResults | number | 10 | Количество возвращаемых результатов |
| lang | string | 'en' | Язык для результатов поиска |
| proxy | string | undefined | URL прокси (например, 'http://proxy.example.com:8080') |
| timeout | number | 5000 | Таймаут запроса в миллисекундах |
| safe | 'active' \| 'off' | 'active' | Настройки безопасного поиска |
| region | string | undefined | Регион для результатов поиска |
| start | number | 0 | Начальная позиция для пагинации |
| unique | boolean | false | Удалить дубликаты URL из результатов |

## Лицензия

MIT

## Участие в разработке

Вклады приветствуются! Пожалуйста, не стесняйтесь отправлять Pull Request в [репозиторий GitHub](https://github.com/tkattkat/google-search-ts).