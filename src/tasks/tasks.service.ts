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
        console.log(result)
        if (result.affected === 0) {
          throw new NotFoundException(`Task with ID ${id} not found`);
        }
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

    deleteTask(id : string) : void {
        const found = this.getTaskById(id);
        this.tasks = this.tasks.filter((task) => task.id !== found.id);
    }

    updateTaskStatus(id : string, status : TaskStatus) : Task {
        const task = this.getTaskById(id);
        task.status = status;
        return task;
    }

    */
}
