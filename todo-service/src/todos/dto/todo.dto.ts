import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsNotEmpty, IsString } from 'class-validator';

export class CreateTodoDto {
    @ApiProperty({ example: 'Learn NestJS' })
    @IsString()
    @IsNotEmpty()
    title: string;

    @ApiProperty({ example: false })
    @IsBoolean()
    completed: boolean;
}