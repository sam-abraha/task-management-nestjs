import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { TaskStatus} from './task-status.enum';
import { CreateTaskDto } from './dto/create-task.dto';
import { GetTasksFilterDto } from './dto/filter-task.dto';
import { TasksRepository } from './tasks.repository';
import { Task } from './dto/task.entity.dto';

@Injectable()
export class TasksService {

    constructor(
        @Inject('TasksRepository')
        private tasksRepository: TasksRepository,
      ) {}
    

    async getTaskById(id: string) : Promise<Task> {
        const found = await this.tasksRepository.findOne({ where : {id} });

        if(!found) {
            throw new NotFoundException(`Task with ID ${ id } not found`);
        }
        return found;
    }

    async createTask(createTaskDto: CreateTaskDto): Promise<Task> {
        return this.tasksRepository.createTask(createTaskDto);
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

    /*

    getTasksWithFilter(filterTaskDto : GetTasksFilterDto) : Task[]{
        const {status, search } = filterTaskDto;

        let tasks = this.getAllTasks();

        if(status) {
            tasks = tasks.filter((task) => task.status === status);
        }

        if(search) {
            tasks = tasks.filter((task) => {
                if(task.title.includes(search) || task.description.includes(search)) {
                    return true;
                }
                return false;
            })
        }

        return tasks;
    }

    getAllTasks() {
        return this.tasks;
    }

    */
}
