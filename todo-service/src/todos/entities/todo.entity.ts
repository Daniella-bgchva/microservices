import { ApiProperty } from '@nestjs/swagger';
import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class Todo {
    @ApiProperty({ example: 1, description: 'Уникальный идентификатор задачи' })
    @PrimaryGeneratedColumn()
    id: number;

    @ApiProperty({ example: 'Купить продукты', description: 'Название задачи' })
    @Column()
    title: string;

    @ApiProperty({ example: false, description: 'Статус выполнения' })
    @Column({ default: false })
    completed: boolean;
}