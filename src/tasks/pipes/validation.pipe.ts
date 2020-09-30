import { PipeTransform, BadRequestException } from "@nestjs/common";
import { TaskStatus } from "../taskStatus.enum";

export class statusValidatePipe implements PipeTransform{

    readonly validStatus = [
        TaskStatus.OPEN, 
        TaskStatus.IN_PROGRESS,
        TaskStatus.DONE
    ]

    transform(value:any){
        value = value.toUpperCase();

        if(!this.isValid(value)){
            throw new BadRequestException(`The ${value} is not a valid status`);
        }
       
        return value;

    }

    private isValid(status:TaskStatus){
        const index = this.validStatus.indexOf(status);
        return index !== -1;
    }
    

    
}