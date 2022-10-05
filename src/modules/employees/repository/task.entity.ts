import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Employee } from './employee.entity';

@Entity('tasks')
export class Task {
  @PrimaryGeneratedColumn()
  readonly id: number;

  @Column()
  readonly name: string;

  @ManyToOne(() => Employee, (employee) => employee.tasks, { onDelete: 'SET NULL' })
  readonly employee: Employee;
}
