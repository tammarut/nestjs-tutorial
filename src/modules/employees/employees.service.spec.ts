import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { createMock, DeepMocked } from '@golevelup/ts-jest';
import { Repository } from 'typeorm/repository/Repository';

import { EmployeesService } from './employees.service';
import { ContactInfo } from './repository/contact-info.entity';
import { Employee } from './repository/employee.entity';
import { Meeting } from './repository/meeting.entity';
import { Task } from './repository/task.entity';

describe('EmployeesService', () => {
  let employeeService: EmployeesService;
  let employeeRepo: DeepMocked<Repository<Employee>>;

  beforeEach(async () => {
    const mockEmployeeRepo = createMock<Repository<Employee>>();
    const mockContactInfoRepo = createMock<Repository<ContactInfo>>();
    const mockTaskRepo = createMock<Repository<Task>>();
    const mockMeetingRepo = createMock<Repository<Meeting>>();

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        EmployeesService,
        { provide: getRepositoryToken(Employee), useValue: mockEmployeeRepo },
        { provide: getRepositoryToken(ContactInfo), useValue: mockContactInfoRepo },
        { provide: getRepositoryToken(Task), useValue: mockTaskRepo },
        { provide: getRepositoryToken(Meeting), useValue: mockMeetingRepo },
      ],
    }).compile();

    employeeService = module.get<EmployeesService>(EmployeesService);
    employeeRepo = module.get(getRepositoryToken(Employee));
  });

  it('should be defined', () => {
    expect(employeeService).toBeDefined();
    expect(employeeRepo).toBeDefined();
  });
});
