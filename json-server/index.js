const fs = require('fs');
const jsonServer = require('json-server');
const path = require('path');

const server = jsonServer.create();

const router = jsonServer.router(path.resolve(__dirname, 'db.json'));

server.use(jsonServer.defaults({}));
server.use(jsonServer.bodyParser);

// Нужно для небольшой задержки, чтобы запрос проходил не мгновенно, имитация реального апи
server.use(async (req, res, next) => {
    await new Promise((res) => {
        setTimeout(res, 800);
    });
    next();
});

// Эндпоинт для логина
server.post('/login', (req, res) => {
    try {
        const { username, password } = req.body;
        const db = JSON.parse(fs.readFileSync(path.resolve(__dirname, 'db.json'), 'UTF-8'));
        const { users = [] } = db;

        const userFromBd = users.find(
            (user) => user.username === username && user.password === password,
        );

        if (userFromBd) {
            return res.json(userFromBd);
        }

        return res.status(403).json({ message: 'User not found' });
    } catch (e) {
        console.log(e);
        return res.status(500).json({ message: e.message });
    }
});

// Эндпоинт для регистрации
server.post('/register', (req, res) => {
    try {
        const { username, password } = req.body;
        const dbPath = path.resolve(__dirname, 'db.json');
        const db = JSON.parse(fs.readFileSync(dbPath, 'UTF-8'));
        const { users = [] } = db;

        // Проверяем, существует ли уже пользователь с таким именем
        const userExists = users.some((user) => user.username === username);

        if (userExists) {
            return res.status(409).json({ message: 'User already exists' });
        }

        // Создаем нового пользователя с ролью и пустым аватаром
        const newUser = {
            id: users.length + 1,
            username,
            password,
            role: 'USER', // Присваиваем базовую роль
            avatar: '', // Пустой URL аватара
        };
        users.push(newUser);

        // Сохраняем обновленные данные в db.json
        fs.writeFileSync(dbPath, JSON.stringify(db, null, 2), 'UTF-8');

        return res.status(201).json(newUser);
    } catch (e) {
        console.error(e);
        return res.status(500).json({ message: e.message });
    }
});

// проверяем, авторизован ли пользователь
// eslint-disable-next-line
server.use((req, res, next) => {
    if (!req.headers.authorization) {
        return res.status(403).json({ message: 'AUTH ERROR' });
    }

    next();
});

server.use(router);

// запуск сервера
server.listen(8080, () => {
    console.log('server is running on 8080 port');
});
