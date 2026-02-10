import {
    Controller, Get, Post, Patch, Delete, Body, Param, UseGuards, ParseIntPipe
} from '@nestjs/common';
import { TodosService } from './todos.service';
import { CreateTodoDto } from './dto/todo.dto';
import { JwtAuthGuard } from '../auth/auth.guard';
import { ApiBearerAuth, ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { Todo } from './entities/todo.entity';

@ApiTags('todos')
@ApiBearerAuth()
@Controller('todos')
@UseGuards(JwtAuthGuard)
export class TodosController {
    constructor(private readonly todosService: TodosService) {}

    @Post()
    @ApiOperation({ summary: 'Create a new todo' })
    @ApiResponse({ status: 201, description: 'Todo created', type: Todo })
    create(@Body() dto: CreateTodoDto) {
        return this.todosService.create(dto);
    }

    @Get()
    @ApiOperation({ summary: 'Get all todos' })
    @ApiResponse({ status: 200, description: 'List of todos', type: [Todo] })
    findAll() {
        return this.todosService.findAll();
    }

    @Get(':id')
    @ApiOperation({ summary: 'Get one todo by id' })
    @ApiResponse({ status: 200, description: 'Todo found', type: Todo })
    findOne(@Param('id', ParseIntPipe) id: number) {
        return this.todosService.findOne(id);
    }

    @Patch(':id')
    @ApiOperation({ summary: 'Update a todo by id' })
    @ApiResponse({ status: 200, description: 'Todo updated', type: Todo })
    update(
        @Param('id', ParseIntPipe) id: number,
        @Body() dto: CreateTodoDto,
    ) {
        return this.todosService.update(id, dto);
    }

    @Delete(':id')
    @ApiOperation({ summary: 'Delete a todo by id' })
    @ApiResponse({ status: 200, description: 'Todo deleted' })
    remove(@Param('id', ParseIntPipe) id: number) {
        return this.todosService.remove(id);
    }
}