# Currency-graph

## Описание
Приложение с актуальными графиками курсов к рублю доллара, евро и юаня. 

Доступно для работы [здесь](https://c-graph.netlify.app/).

## Технологии
**React, TypeScript, Chart.js, Jest, Testing Library**

## API
Используется [этот апи](https://github.com/fawazahmed0/exchange-api). У него есть определенные ограничения - показывает данные только со 2 марта этого года. 

Для оптимизации запросов реализовано кэширование в localStorage. 

## Установка и запуск
Чтобы запустить проект локально:

1. Склонируйте репозиторий:

   ```
   git clone https://github.com/AlexGusarov/currency-graph.git
   ```
2. Перейдите в директорию проекта:

   ```
   cd currency-graph
   ```
3. Установите зависимости:

   ```
   npm install
   ```
4. Запустите проект:

   ```
   npm start
   ```
5. Откройте [http://localhost:3000](http://localhost:3000) для просмотра в браузере.


