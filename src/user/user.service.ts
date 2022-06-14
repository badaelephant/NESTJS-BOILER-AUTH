import { CreateUserDto } from './dto/create-user.dto';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './user.entity';
import { randomUUID } from 'crypto';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}

  findAll(): Promise<User[]> {
    return this.usersRepository.find();
  }
  async createUser(createUserDto: CreateUserDto): Promise<void> {
    const { firstName, lastName } = createUserDto;
    const newUser = await this.usersRepository.create({
      id: randomUUID(),
      firstName,
      lastName,
    });
    this.usersRepository.insert(newUser);
  }
}
