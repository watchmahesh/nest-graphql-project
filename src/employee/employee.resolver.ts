import { EmployeeService } from './employee.service';
import { Resolver, Query, Mutation, Args, Parent, ResolveField } from '@nestjs/graphql';
import { Employee } from './entities/employee.entity';
import { EmployeeCreateDto } from './dto/create-employee.input';
import { Project } from 'src/project/entities/project.entity';

@Resolver(() => Employee)
export class EmployeeResolver {
    constructor(private employeeService: EmployeeService) { }
    @Query(() => [Employee], { name: "getAllEmployeess" })
    findAll() {
        return this.employeeService.findAll();
    }
    @Mutation(() => Employee, { name: "createEmployee" })
    create(@Args('employeeInput') employee: EmployeeCreateDto) {
        return this.employeeService.create(employee)
    }

    @ResolveField(() => Project)
    project(@Parent() employee: Employee): Promise<Project> {
        return this.employeeService.getProject(employee.projectId)
    }

    @Query(() => Employee, { name: 'employeeFindById' })
    findOneEmployee(@Args('id', { type: () => String }) id: string) {
        return this.employeeService.findById(id);
    }

}
