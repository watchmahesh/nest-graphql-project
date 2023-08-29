import { InjectRepository } from '@nestjs/typeorm';
import { Injectable } from '@nestjs/common';
import { CreateProjectInput } from './dto/create-project.input';
import { UpdateProjectInput } from './dto/update-project.input';
import { Project } from './entities/project.entity';
import { Repository } from 'typeorm';

@Injectable()
export class ProjectService {
  constructor(@InjectRepository(Project)
  private projectRepository: Repository<Project>
  ) {

  }
  create(createProjectInput: CreateProjectInput): Promise<Project> {
    const data = this.projectRepository.create(createProjectInput);
    return this.projectRepository.save(data);
  }

  async findAll(): Promise<Project[]> {
    return await this.projectRepository.find({
      relations: ["employees"]
    });
  }

  findOne(id: string): Promise<Project> {
    const data = this.projectRepository.findOne({ where: { 'id': id }, relations: ["employees"] })
    return data;
  }

  update(id: string, updateProjectInput: UpdateProjectInput) {
    let project: Project = this.projectRepository.create(updateProjectInput)
    project.id = id;
    return this.projectRepository.save(project)
  }

  remove(id: string) {
  }
}
