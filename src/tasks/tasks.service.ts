import { GetTasksFilterDto } from './dto/get-tasks-filter.dto';
import { CreateTaskDto } from './dto/create-task.dto';
import { Injectable } from '@nestjs/common';
import { Task, TaskStatus } from './task.model';
import { v4 as uuid } from 'uuid';

@Injectable()
export class TasksService {
  private tasks: Task[] = [
    {
      id: '1',
      title: 'First task',
      description: 'This is the first task',
      status: TaskStatus.OPEN,
    },
    {
      id: '2',
      title: 'Second task',
      description: 'This is the first task',
      status: TaskStatus.IN_PROGRESS,
    },
  ];

  // getTasks(): Task[] {
  //   return this.tasks;
  // }

  getTaskById(id: string): Task {
    return this.tasks.find((task) => task.id === id);
  }

  getTasks(getTasksFilterDto?: GetTasksFilterDto): Task[] {
    const { status, search } = getTasksFilterDto;
    console.log(getTasksFilterDto);
    if (!getTasksFilterDto) return this.tasks;
    if (status && search)
      return this.tasks.filter(
        (task) => task.status === status && task.title.includes(search),
      );
    if (status) return this.tasks.filter((task) => task.status === status);
    if (search) return this.tasks.filter((task) => task.title.includes(search));
  }

  createTask(createTaskDto: CreateTaskDto): Task {
    const { title, description } = createTaskDto;
    const task: Task = {
      id: uuid(),
      title,
      description,
      status: TaskStatus.OPEN,
    };

    this.tasks.push(task);
    return task;
  }

  deleteTask(id: string): void {
    this.tasks = this.tasks.filter((task) => task.id !== id);
  }

  updateTaskStatus(id: string, status: TaskStatus): Task[] {
    for (let i = 0; i < this.tasks.length; i++) {
      this.tasks[i].id === id ? (this.tasks[i].status = status) : null;
    }
    return this.getTasks();
  }
}
