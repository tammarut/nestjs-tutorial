import { Controller, Delete, Get, Param } from '@nestjs/common';
import { EmployeesService } from './employees.service';

@Controller('employees')
export class EmployeesController {
  constructor(private readonly employeeService: EmployeesService) {}

  @Get('seed')
  async seed() {
    return await this.employeeService.seed();
  }

  @Get(':employeeId')
  async getEmployeeById(@Param('employeeId') employeeId: string) {
    return await this.employeeService.searchEmployeeById(+employeeId);
  }

  @Delete(':id')
  async deleteEmployeeById() {
    return await this.employeeService.deleteEmployeeById(7);
  }
}
