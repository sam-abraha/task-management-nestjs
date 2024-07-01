import { IsEnum } from "class-validator";
import { TaskStatus } from "../task.model";

export class UpdateTasksDto {
    @IsEnum(TaskStatus)
    status : TaskStatus;
}