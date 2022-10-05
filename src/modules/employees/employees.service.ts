import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ContactInfo } from './repository/contact-info.entity';
import { Employee } from './repository/employee.entity';
import { Meeting } from './repository/meeting.entity';
import { Task } from './repository/task.entity';

@Injectable()
export class EmployeesService {
  constructor(
    @InjectRepository(Employee)
    private readonly employeeRepo: Repository<Employee>,
    @InjectRepository(ContactInfo)
    private readonly contactInfoRepo: Repository<ContactInfo>,
    @InjectRepository(Task)
    private readonly taskRepo: Repository<Task>,
    @InjectRepository(Meeting)
    private readonly meetingRepo: Repository<Meeting>
  ) {}

  async seed() {
    // Employee 1 = CEO
    const ceo = this.employeeRepo.create({ name: 'Mr. CEO' });
    await this.employeeRepo.save(ceo);

    const ceoContactInfo = this.contactInfoRepo.create({ email: 'ceo@gmail.com', employee: ceo });
    await this.contactInfoRepo.save(ceoContactInfo);

    // Employee 1 = Manager
    const manager = this.employeeRepo.create({ name: 'Mana', manager: ceo });

    const task1 = this.taskRepo.create({ name: 'Hire new people' });
    await this.taskRepo.save(task1);
    const task2 = this.taskRepo.create({ name: 'Present report to CEO' });
    await this.taskRepo.save(task2);
    manager.tasks = [task1, task2];

    const meeting1 = this.meetingRepo.create({ zoomUrl: 'meeting.com' });
    meeting1.attendees = [ceo];
    await this.meetingRepo.save(meeting1);

    manager.meetings = [meeting1];

    await this.employeeRepo.save(manager);
  }

  async searchEmployeeById(id: number) {
    // return await this.employeeRepo.findOne({
    //   where: { id: id },
    //   relations: {
    //     contactInfo: true,
    //     manager: true,
    //     directReports: true,
    //     tasks: true,
    //     meetings: true,
    //   },
    // });
    const employee = await this.employeeRepo
      .createQueryBuilder('employee')
      .leftJoinAndSelect('employee.directReports', 'directReports')
      .leftJoinAndSelect('employee.meetings', 'meetings')
      .leftJoinAndSelect('employee.tasks', 'tasks')
      .where('employee.id = :employeeId', { employeeId: id })
      .getOne();

    return employee;
  }

  async deleteEmployeeById(id: number) {
    return this.employeeRepo.delete(id);
  }
}
