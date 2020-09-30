import { Controller, Param, ParseIntPipe, Get, Post, Body, Delete, Patch, Query, ValidationPipe } from '@nestjs/common';
import { TasksService } from './tasks.service';
import { Task } from './task.entity';
import { CreatetaskDto } from './dto/create-task.dto';
import { TaskStatus } from './taskStatus.enum';
import { CreateFilterDto } from './dto/createFilter.dto';
import { statusValidatePipe } from './pipes/validation.pipe';

@Controller('tasks')
export class TasksController {
    constructor(private readonly taskService:TasksService){}

    @Get('/:id')
    getTaskById(@Param('id', ParseIntPipe) id:number):Promise<Task>{
        return this.taskService.getTaskById(id);
    }

    @Post()
    createTask(@Body() createTaskDto:CreatetaskDto):Promise<Task>{
        return this.taskService.createTask(createTaskDto);
    }

    @Delete('/:id')
    deleteTaks(@Param('id', ParseIntPipe) id:number):Promise<void>{
        return this.taskService.deletetask(id);
    }

    @Patch('/:id/status')
    updatetaskStatus(@Param('id', ParseIntPipe) id:number, @Body('status', statusValidatePipe)status:TaskStatus ):Promise<Task>{
        return this.taskService.updateTask(id, status);
    }

    @Get()
    getTask(@Query(ValidationPipe) filterDto:CreateFilterDto):Promise<Task[]>{
        return this.taskService.getTask(filterDto);
    }
}
