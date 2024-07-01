import { Injectable } from '@nestjs/common';
import { Task , TaskStatus} from './task.model';
import { v4  as uuid } from 'uuid'
import { CreateTaskDto } from './dto/create-task.dto';
import { GetTasksFilterDto } from './dto/filter-task.dto';

@Injectable()
export class TasksService {
    private tasks : Task[] = [];

    createTask(CreateTaskDto : CreateTaskDto) : Task {

        const {title , description } = CreateTaskDto;


        const task : Task = {
            id : uuid(),
            description : description,
            title : title,
            status : TaskStatus.OPEN,

        }
        this.tasks.push(task);
        return task;
    }

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

    getTaskById(id: string) : Task {
        return this.tasks.find((task) => task.id === id);
    }

    deleteTask(id : string) : void {
        this.tasks = this.tasks.filter((task) => task.id !== id);
    }

    updateTaskStatus(id : string, status : TaskStatus) : Task {
        const task = this.getTaskById(id);
        task.status = status;
        return task;
    }
}
