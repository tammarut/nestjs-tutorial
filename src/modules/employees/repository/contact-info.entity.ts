import { Column, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Employee } from './employee.entity';

@Entity('contact_info')
export class ContactInfo {
  @PrimaryGeneratedColumn()
  readonly id: number;

  @Column({ nullable: true })
  readonly phone: string;

  @Column()
  readonly email: string;

  @OneToOne(() => Employee, (employee) => employee.contactInfo, { onDelete: 'CASCADE' })
  @JoinColumn()
  readonly employee: Employee;
}
