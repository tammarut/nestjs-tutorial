import { Column, Entity, ManyToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Employee } from './employee.entity';

@Entity('meetings')
export class Meeting {
  @PrimaryGeneratedColumn()
  readonly id: number;

  @Column()
  readonly zoomUrl: string;

  @ManyToMany(() => Employee, (employee) => employee.meetings)
  attendees: Employee[];
}
