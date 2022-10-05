import { Controller, Delete, Get } from '@nestjs/common';
import { EmployeesService } from './employees.service';

@Controller('employees')
export class EmployeesController {
  constructor(private readonly employeeService: EmployeesService) {}

  @Get('seed')
  async seed() {
    return await this.employeeService.seed();
  }
  @Get(':id')
  async getEmployeeById() {
    return this.employeeService.searchEmployeeById(7);
  }

  @Delete(':id')
  async deleteEmployeeById() {
    return this.employeeService.deleteEmployeeById(7);
  }
}
