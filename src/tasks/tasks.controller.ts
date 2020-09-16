import {
  Controller,
  Get,
  Body,
  Post,
  Delete,
  Param,
  Patch,
  Query,
} from '@nestjs/common';
import { TasksService } from './tasks.service';
import { Tasks, TaskStatus } from './tasks.model';
import { CreateTasksDtop } from './create-tasks.dto';
import { CreateFilterDto } from './create-filter.dto';

@Controller('tasks')
export class TasksController {
  constructor(private readonly taskService: TasksService) {}

  @Get()
  getTasks(@Query() filterDTO: CreateFilterDto): Tasks[] {
    if (Object.keys(filterDTO).length) {
      return this.taskService.getFilterSearch(filterDTO);
    } else {
      return this.taskService.getTasks();
    }
  }
  @Get('/:id')
  getTasksById(@Param('id') id: string): Tasks {
    return this.taskService.getTasksById(id);
  }
  @Post()
  createTask(@Body() createTaskDto: CreateTasksDtop): Tasks {
    return this.taskService.createTasks(createTaskDto);
  }
  @Delete('/:id')
  deleteTasks(@Param('id') id: string): void {
    return this.taskService.deleteTask(id);
  }

  @Patch('/:id/status')
  updateStatus(
    @Param('id') id: string,
    @Body('status') status: TaskStatus,
  ): Tasks {
    return this.taskService.updateTask(id, status);
  }
}
