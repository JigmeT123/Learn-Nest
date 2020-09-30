import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { TaskRepository } from './task.repository';
import { Task } from './task.entity';
import { CreatetaskDto } from './dto/create-task.dto';
import { TaskStatus } from './taskStatus.enum';
import { CreateFilterDto } from './dto/createFilter.dto';
@Injectable()
export class TasksService {
  constructor(
    @InjectRepository(TaskRepository) private readonly taskRepo: TaskRepository,
  ) {}

  async getTaskById(id:number):Promise<Task>{
      const found = await this.taskRepo.findOne(id);
      if(!found){
          throw new NotFoundException(`the task with the id ${id} is nopt found `);
      }
      return found;

  }
  async createTask( createTaskDto:CreatetaskDto):Promise<Task>{
      return this.taskRepo.createTask(createTaskDto);
  }

  async deletetask(id:number):Promise<void>{
      const result = await this.taskRepo.delete(id);

      if(!result.affected){
          throw new NotFoundException(`the task with the id: ${id} is not found`);
      }
  }

  async updateTask(id:number, status:TaskStatus):Promise<Task>{
      const task = await this.getTaskById(id);
      task.status = status;
      await task.save()
      return task;
  }

  async getTask(filterDto:CreateFilterDto):Promise<Task[]>{
      return this.taskRepo.getTask(filterDto);
  }
}
