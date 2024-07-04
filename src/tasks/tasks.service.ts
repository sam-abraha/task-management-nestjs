import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { TaskStatus} from './task-status.enum';
import { CreateTaskDto } from './dto/create-task.dto';
import { GetTasksFilterDto } from './dto/filter-task.dto';
import { TasksRepository } from './tasks.repository';
import { Task } from './task.entity';
import { User } from 'src/auth/user.entity';

@Injectable()
export class TasksService {

    constructor(
        @Inject('TasksRepository')
        private tasksRepository: TasksRepository,
    ) {}

    async getTasks(filterTaskDto: GetTasksFilterDto): Promise<Task[]> {
        return this.tasksRepository.getTasks(filterTaskDto);
    }

    async getTaskById(id: string) : Promise<Task> {
        const found = await this.tasksRepository.findOne({ where : {id} });

        if(!found) {
            throw new NotFoundException(`Task with ID ${ id } not found`);
        }
        return found;
    }

    async createTask(createTaskDto: CreateTaskDto, user: User): Promise<Task> {
        return this.tasksRepository.createTask(createTaskDto, user);
    }

    async deleteTask(id: string): Promise<void> {
        const result = await this.tasksRepository.deleteTask(id);
        if (result.affected === 0) {
          throw new NotFoundException(`Task with ID ${id} not found`);
        }
    }

    async updateTaskStatus(id : string, status : TaskStatus) : Promise<Task> {
        const task = await this.getTaskById(id);
        task.status = status;

        await this.tasksRepository.save(task);
        return task;
    }
}
