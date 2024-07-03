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

    @Patch('/:id/status')
    updateTaskStatus(
        @Param('id') id : string, 
        @Body() updateTaskDto : UpdateTasksDto): Promise<Task> {
            const { status } = updateTaskDto;
            return this.tasksService.updateTaskStatus(id, status);
    }


    @Get()
    getTasks(@Query() filterTaskDto : GetTasksFilterDto) : Promise<Task[]> {
        return this.tasksService.getTasks(filterTaskDto);
    }
}
