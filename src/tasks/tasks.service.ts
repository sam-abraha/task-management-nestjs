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

    async getTasks(filterTaskDto: GetTasksFilterDto, user : User) : Promise<Task[]> {
        return this.tasksRepository.getTasks(filterTaskDto, user);
    }

    async getTaskById(id: string, user: User) : Promise<Task> {
        const found = await this.tasksRepository.findOne({ where : {id, user} });

        if(!found) {
            throw new NotFoundException(`Task with ID ${ id } not found`);
        }
        return found;
    }

    async createTask(createTaskDto: CreateTaskDto, user: User): Promise<Task> {
        return this.tasksRepository.createTask(createTaskDto, user);
    }

    async deleteTask(id: string, user : User): Promise<void> {
        const result = await this.tasksRepository.deleteTask(id, user);
        if (result.affected === 0) {
          throw new NotFoundException(`Task with ID ${id} not found`);
        }
    }

    async updateTaskStatus(id : string, status : TaskStatus, user : User) : Promise<Task> {
        const task = await this.getTaskById(id, user );
        task.status = status;

        await this.tasksRepository.save(task);
        return task;
    }
}
