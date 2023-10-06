import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Task } from 'src/schemas/task.schema';
import { Model } from 'mongoose';
import { CreateTaskDto } from 'src/data/create-task.dto';
import { UpdateTaskDto } from 'src/data/update-task.dto';

@Injectable()
export class TasksService {
    constructor(@InjectModel(Task.name) private taskModel: Model<Task>) { }

    finAll() {
        return this.taskModel.find();
    }

    async create(createTask: CreateTaskDto) {
        const newTask = new this.taskModel(createTask);
        return newTask.save();
    }

    async findOne(id: string) {
        return this.taskModel.findById(id);
    }

    async delete(id: string) {
        return this.taskModel.findByIdAndDelete(id);
    }

    async update(id: string, task: UpdateTaskDto) {
        return this.taskModel.findByIdAndUpdate(id, task, { new: true });
    }
}
