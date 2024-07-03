import { Body, Controller, Get, Post, Param, Delete, Patch, Query } from '@nestjs/common';
import { TasksService } from './tasks.service';
import { TaskStatus } from './task-status.enum';
import { CreateTaskDto } from './dto/create-task.dto';
import { GetTasksFilterDto } from './dto/filter-task.dto';
import { UpdateTasksDto } from './dto/update.task.dto';
import { Task } from './dto/task.entity.dto';

@Controller('tasks')
export class TasksController {
    constructor(private tasksService : TasksService) {}

    @Get('/:id') 
    getTaskById(@Param('id') id : string) : Promise<Task> {
        return this.tasksService.getTaskById(id);
    }

    @Post()
    createTask(@Body() createTaskDto : CreateTaskDto) : Promise<Task>{
         return this.tasksService.createTask(createTaskDto);
    }

    @Delete('/:id')
    deleteTask(@Param('id') id : string) : Promise<void> {
        return this.tasksService.deleteTask(id);
    }

    /*

        @Post()
    createTask(@Body() createTaskDto : CreateTaskDto) {
         return this.tasksService.createTask(createTaskDto);
    }

    @Get()
    getTasks(@Query() filterTaskDto : GetTasksFilterDto) : Task[] {

        if(Object.keys(filterTaskDto).length) {
            return this.tasksService.getTasksWithFilter(filterTaskDto);
        }
        else {
            return this.tasksService.getAllTasks();
        }
    }

    @Get('/:id') 
    getTaskById(@Param('id') id : string) : Task {
        return this.tasksService.getTaskById(id);
    }

    @Patch('/:id/status')
    updateTaskStatus(
        @Param('id') id : string, 
        @Body() updateTaskDto : UpdateTasksDto): Task {
            const { status } = updateTaskDto;
            return this.tasksService.updateTaskStatus(id, status);
    }

     */
}
