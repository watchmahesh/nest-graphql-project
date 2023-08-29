import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Employee } from './entities/employee.entity';
import { Repository } from 'typeorm';
import { EmployeeCreateDto } from './dto/create-employee.input';
import { ProjectService } from 'src/project/project.service';
import { Project } from 'src/project/entities/project.entity';

@Injectable()
export class EmployeeService {
    constructor(@InjectRepository(Employee)
    private employeeRepository: Repository<Employee>,
        private projectService: ProjectService) {

    }

    async findAll(): Promise<any> {
        return await this.employeeRepository.find();

    }

    async create(employee: EmployeeCreateDto): Promise<Employee> {
        const emp = this.employeeRepository.create(employee);
        return this.employeeRepository.save(emp)
    }

    async findById(id: string): Promise<Employee> {
        return this.employeeRepository.findOne({ where: { 'id': id } });
    }

    async getProject(id:string):Promise<Project> {
        return this.projectService.findOne(id)
    }
}
