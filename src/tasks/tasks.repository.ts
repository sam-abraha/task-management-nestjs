import { Repository } from "typeorm";
import { Task } from "./dto/task.entity.dto";

export class TasksRepository extends Repository<Task> {

  }