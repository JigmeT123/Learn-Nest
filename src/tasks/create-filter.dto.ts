import { TaskStatus } from "./tasks.model";

export class CreateFilterDto{
    status: TaskStatus;
    search: string;
}