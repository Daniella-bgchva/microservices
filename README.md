🚀 Main Features
🔐 Auth Service
JWT Authentication: Выдача пары Access Token (1 час) и Refresh Token.
Token Refresh: Механизм обновления токенов при истечении Access-периода.
Security: Хеширование паролей и защищенные роуты.

✅ Todo Service (CRUD)
Read: Получение списка задач авторизованного пользователя.
Create: Создание новых задач с валидацией данных.
Update: Изменение статуса или текста задачи.
Delete: Удаление записей.
Validation: Строгая проверка входящих данных через class-validator.

🧩 Tech Stack
Backend
Framework: NestJS (Node.js)
Databases: * PostgreSQL (Todo Service) + TypeORM
MongoDB (Auth Service) + Mongoose
Documentation: Swagger (OpenAPI 3.0)
Validation: Class-validator & Class-transformer
Logging: NestJS Built-in Logger

DevOps
Docker: Containerization of services
Docker Compose: Multi-container orchestration

🐳 Docker Deployment
Проект полностью готов к запуску в одну команду.

Services & Ports
Auth API: http://localhost:8000
Todo API: http://localhost:8021

Swagger Auth: http://localhost:8000/api-docs
Swagger Todo: http://localhost:8021/api/docs

📁 Project Structure

NEW-POST/
├── auth-service/          # Микросервис авторизации (Express/Nest)
│   ├── controllers/       # Обработка запросов
│   ├── models/            # Схемы MongoDB (Mongoose)
│   ├── routers/           # Определение путей API
│   ├── index.ts           # Точка входа в приложение
│   ├── fixtures.ts        # Seed-скрипт для пользователей
│   ├── config.ts          # Конфигурация JWT и БД
│   ├── .env               # (Скрыт) Настройки окружения
│   └── Dockerfile         # Инструкции для сборки образа
│
├── todo-service/          # Микросервис задач (NestJS)
│   ├── src/               # Исходный код сервиса
│   │   ├── app.module.ts  # Главный модуль
│   │   └── ...            # Контроллеры и сервисы задач (PostgreSQL)
│   ├── fixtures.ts        # Seed-скрипт для задач
│   ├── nest-cli.json      # Конфигурация Nest
│   ├── .env               # (Скрыт) Настройки окружения
│   └── Dockerfile         # Инструкции для сборки образа
│
├── compose.yaml           # Основной файл оркестрации Docker
├── README.md              # Документация проекта
└── .gitignore             # Исключения для Git (node_modules, .env)

📝 API Specification
Interactive Spec: Доступна через Swagger UI при запущенных контейнерах по адресам /api каждого сервиса.
Auth Spec:
POST /auth/login — Принимает email, password. Возвращает accessToken, refreshToken.
POST /auth/refresh — Принимает refreshToken. Возвращает новую пару токенов.
![Auth](docs/swaggerauth.png)
Todo Spec:
GET /todos — Требует JWT. Возвращает список задач.
POST /todos — Валидация: title (string, required).
![Todo](docs/swaggertodo.png)