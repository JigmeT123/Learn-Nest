import { IsOptional, IsNotEmpty, IsIn } from "class-validator";
import { TaskStatus } from "../taskStatus.enum";

export class CreateFilterDto{
    @IsOptional()
    @IsNotEmpty()
    search:string;

    @IsOptional()
    @IsIn([TaskStatus.OPEN, TaskStatus.DONE, TaskStatus.IN_PROGRESS])
    status:TaskStatus;
}