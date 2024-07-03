import { IsEnum } from "class-validator";
import { TaskStatus } from "../task-status.enum";

export class UpdateTasksDto {
    @IsEnum(TaskStatus)
    status : TaskStatus;
}