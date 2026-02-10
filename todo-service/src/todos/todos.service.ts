import { Injectable, Logger, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Todo } from './entities/todo.entity';
import { CreateTodoDto } from './dto/todo.dto';

@Injectable()
export class TodosService {
    private readonly logger = new Logger(TodosService.name);

    constructor(
        @InjectRepository(Todo)
        private readonly todoRepository: Repository<Todo>,
    ) {}

    async create(dto: CreateTodoDto): Promise<Todo> {
        const todo = this.todoRepository.create(dto);
        const saved = await this.todoRepository.save(todo);
        this.logger.log(`Created todo: "${dto.title}"`);
        return saved;
    }

    async findAll(): Promise<Todo[]> {
        const todos = await this.todoRepository.find();
        this.logger.log(`Returned all todos (count: ${todos.length})`);
        return todos;
    }

    async findOne(id: number): Promise<Todo> {
        const todo = await this.todoRepository.findOne({ where: { id } });
        if (!todo) {
            this.logger.warn(`Todo with id ${id} not found`);
            throw new NotFoundException(`Todo with id ${id} not found`);
        }
        return todo;
    }

    async update(id: number, dto: CreateTodoDto): Promise<Todo> {
        const todo = await this.findOne(id);
        Object.assign(todo, dto);
        const updated = await this.todoRepository.save(todo);
        this.logger.log(`Updated todo id ${id}`);
        return updated;
    }

    async remove(id: number): Promise<void> {
        const result = await this.todoRepository.delete(id);
        if (result.affected === 0) {
            this.logger.warn(`Failed to delete todo id ${id}: not found`);
            throw new NotFoundException(`Todo with id ${id} not found`);
        }
        this.logger.log(`Deleted todo id ${id}`);
    }
}