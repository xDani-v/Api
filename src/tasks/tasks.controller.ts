import { Controller, Get, Post, Delete, Put, Body, Param, ConflictException, NotFoundException, HttpCode } from '@nestjs/common';
import { TasksService } from './tasks.service';
import { CreateTaskDto } from 'src/data/create-task.dto';

@Controller('tasks')
export class TasksController {
    constructor(private TasksService: TasksService) { }

    @Get()
    findAll() {
        return this.TasksService.finAll();
    }

    @Get(':id')
    async findOne(@Param('id') id: string) {
        const task = await this.TasksService.findOne(id);
        if (!task) throw new NotFoundException('No se encontro');
        else return task;
    }

    @Post()
    async create(@Body() body: CreateTaskDto) {
        try {
            return await this.TasksService.create(body);
        } catch (error) {
            if (error.code = 11000) {
                throw new ConflictException('Ya existe')
            }
            throw error;
        }
    }

    @Delete(':id')
    @HttpCode(204)
    async delete(@Param('id') id: string) {
        const task = await this.TasksService.delete(id);
        if (!task) throw new NotFoundException('No se encontro');
        else return task;
    }


    @Put(':id')
    async Update(@Param('id') id: string, @Body() body: CreateTaskDto) {
        const task = await this.TasksService.update(id, body);
        if (!task) throw new NotFoundException('No se encontro');
        else return task;
    }


}
