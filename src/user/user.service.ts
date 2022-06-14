import { UpdateUserDto } from './dto/update-user.dto';
import { CreateUserDto } from './dto/create-user.dto';
import { BadRequestException, Injectable } from '@nestjs/common';
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
  async updateUser(id: string, updateUserDto: UpdateUserDto): Promise<User> {
    const { firstName, lastName, isActive } = updateUserDto;
    if (!firstName && !lastName && !isActive) {
      throw new BadRequestException('you didnt put any updateInfos');
    }
    const savedUser = await this.usersRepository.findOne({ where: { id } });
    if (firstName) savedUser.firstName = firstName;
    if (lastName) savedUser.lastName = lastName;
    if (isActive) savedUser.isActive = isActive;

    return this.usersRepository.save(savedUser);
  }
}
