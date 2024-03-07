import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './user.entity';
import { Repository } from 'typeorm';
import { generatedHashedPassword } from '../utils/generated-hashed-password';
import { CreateUserDto } from './dtos/create-user.dto';

@Injectable()
export class UserService {
  constructor(@InjectRepository(User) private repo: Repository<User>) {}

  async create(userData: CreateUserDto) {
    if(userData.password !== userData.confirmPassword) {
      throw new BadRequestException('Passwords do not match. Check data again.')
    }
    // Hash the user's password
    // Generate a salt
    const saltedPass = await generatedHashedPassword(userData.password);
    // Create a new user and save it
    try {
      const user = await this.repo.create({
        username: userData.username,
        password: saltedPass,
        phoneNumber: userData.phoneNumber
      });
      return this.repo.save(user);
    } catch (e) {
      console.log(e, userData)
      throw new BadRequestException('Problem with payload data. Check and try again');
    }
  }

  async findOne(id: number) {
    const user = await this.repo.findOne({ where: { id } });
    if (!user) {
      throw new NotFoundException('User not found!');
    }
    return user;
  }

  findByName(username: string) {
    return this.repo.find({ where: { username } });
  }

  findAll() {
    return this.repo.find();
  }

  async remove(id: number) {
    const user = await this.findOne(id);
    return this.repo.remove(user);
  }
}
