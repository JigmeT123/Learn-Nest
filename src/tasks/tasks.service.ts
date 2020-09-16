import { Injectable } from '@nestjs/common';
import { Tasks, TaskStatus } from './tasks.model';
import { CreateTasksDtop } from './create-tasks.dto';
import {v1} from 'uuid'
import { CreateFilterDto } from './create-filter.dto';
@Injectable()
export class TasksService {
    private tasks :Tasks[] = [];

    getTasks():Tasks[]{
        return this.tasks;
    }

    getFilterSearch(filterDTO: CreateFilterDto){
        let tasks = this.getTasks();

        const {status, search} = filterDTO

        if(search){
            tasks = tasks.filter(task => task.title.includes(search) || task.description.includes(search))
        }

        if(status){
            tasks = tasks.filter(task => task.status === status);
        }

        return tasks;
    }

    getTasksById(id:string):Tasks{
       return this.tasks.find(task => task.id === id);
    }

    createTasks(createTasksDto: CreateTasksDtop):Tasks{
       const {title, description} = createTasksDto;
       const task: Tasks = {
           id : v1(),
           title,
           description,
           status: TaskStatus.OPEN 
       };
       this.tasks.push(task);
       return task;
    }

    deleteTask(id: string): void{
        this.tasks = this.tasks.filter(task => task.id !== id)
    }

    updateTask(id:string, status: TaskStatus): Tasks{
        const task = this.getTasksById(id);
        task.status = status;
        return task;
    }


   
}
