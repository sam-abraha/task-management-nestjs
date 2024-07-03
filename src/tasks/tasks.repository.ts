import { DataSource, Repository } from "typeorm";
import { Task } from "./dto/task.entity.dto";
import { CreateTaskDto } from "./dto/create-task.dto";
import { TaskStatus } from "./task-status.enum";
import { GetTasksFilterDto } from "./dto/filter-task.dto";

export class TasksRepository extends Repository<Task> {

  constructor(private dataSource: DataSource) {
    super(Task, dataSource.createEntityManager());
  }

  async getTasks(filterTaskDto: GetTasksFilterDto): Promise<Task[]> {
    const { status, search } = filterTaskDto;
    const query = this.createQueryBuilder('task');

    if (status) {
      query.andWhere('task.status = :status', { status });
    }

    if (search) {
      query.andWhere('(task.title LIKE :search OR task.description LIKE :search)', { search: `%${search}%` });
    }

    const tasks = await query.getMany();
    return tasks;
  }

  async createTask(createTaskDto: CreateTaskDto): Promise<Task> {
    const { title, description } = createTaskDto;
    const task = this.create({
      title,
      description,
      status: TaskStatus.OPEN,
    });

    await this.save(task);
    return task;
  }

  async deleteTask(id: string): Promise<any> {
    const result = await this.delete(id);
    return result;
  }


  }