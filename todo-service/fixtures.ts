import { DataSource } from 'typeorm';
import { Todo } from './src/todos/entities/todo.entity';
import * as dotenv from 'dotenv';

dotenv.config();

async function seed() {
    const dataSource = new DataSource({
        type: 'postgres',
        url: process.env.DATABASE_URL,
        entities: [Todo],
        synchronize: true,
        logging: false,
    });

    await dataSource.initialize();
    const repo = dataSource.getRepository(Todo);

    await repo.clear();

    const todos = [
        { title: 'Learn NestJS', completed: false, authorId: "698ad7043935824e8ce4c2a1" },
        { title: 'Build a Todo API', completed: false, authorId: "698ad7043935824e8ce4c2a1" },
        { title: 'Write documentation', completed: true, authorId: "698ad7043935824e8ce4c2a1" },
    ];

    await repo.save(todos);
    console.log('Seed completed: 3 todos added');
    await dataSource.destroy();
}

seed().catch(err => {
    console.error('Seed error:', err);
});