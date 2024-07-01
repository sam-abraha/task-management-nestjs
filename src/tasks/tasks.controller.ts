import { Body, Controller, Get, Post, Param, Delete, Patch, Query } from '@nestjs/common';
import { TasksService } from './tasks.service';
import { Task } from './task.model';
import { CreateTaskDto } from './dto/create-task.dto';
import { GetTasksFilterDto } from './dto/filter-task.dto';
import { UpdateTasksDto } from './dto/update.task.dto';

@Controller('tasks')
export class TasksController {
    constructor(private tasksService : TasksService) {}

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

    @Delete('/:id')
    deleteTask(@Param('id') id : string) : void {
        return this.tasksService.deleteTask(id);
    }

    @Patch('/:id/status')
    updateTaskStatus(
        @Param('id') id : string, 
        @Body() updateTaskDto : UpdateTasksDto): Task {
            const { status } = updateTaskDto;
            return this.tasksService.updateTaskStatus(id, status);
    }
}
