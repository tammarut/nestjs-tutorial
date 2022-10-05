import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ContactInfo } from './repository/contact-info.entity';
import { Employee } from './repository/employee.entity';
import { EmployeesController } from './employees.controller';
import { EmployeesService } from './employees.service';
import { Meeting } from './repository/meeting.entity';
import { Task } from './repository/task.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Employee, ContactInfo, Task, Meeting])],
  controllers: [EmployeesController],
  providers: [EmployeesService],
})
export class EmployeesModule {}
