import { Test, TestingModule } from '@nestjs/testing';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { CreateUserDto } from './dtos/create-user.dto';
import { User } from './user.entity';
import { NotFoundException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { getRepositoryToken } from '@nestjs/typeorm';

describe('UserController', () => {
  let controller: UserController;
  let service: UserService;
  let userRepository: Repository<User>;
  let repoMock: any;

  let userRepositoryToken: string | Function = getRepositoryToken(User);

  repoMock = {
    create: jest.fn(),
    save: jest.fn(),
    findOne: jest.fn(),
    find: jest.fn(),
    remove: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UserController],
      providers: [
        UserService,
        {
            provide: userRepositoryToken,
            useValue: repoMock,
        },
    ],
    }).compile();

    controller = module.get<UserController>(UserController);
    userRepository = module.get<Repository<User>>(userRepositoryToken);
    service = module.get<UserService>(UserService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('findUserById', () => {
    it('should return a user by ID', async () => {
      const user = { id: 1, username: 'testuser' } as User;
      jest.spyOn(service, 'findOne').mockResolvedValueOnce(user);

      const result = await controller.findUserById(1);

      expect(result).toEqual(user);
      expect(service.findOne).toHaveBeenCalledWith(1);
    });

    it('should throw NotFoundException when user is not found', async () => {
      jest.spyOn(service, 'findOne').mockRejectedValueOnce(new NotFoundException());

      await expect(controller.findUserById(1)).rejects.toThrow(NotFoundException);
    });
  });

  describe('findAllUsers', () => {
    it('should return all users', async () => {
      const users = [{ id: 1, username: 'user1' }, { id: 2, username: 'user2' }] as User[];
      jest.spyOn(service, 'findAll').mockResolvedValueOnce(users);

      const result = await controller.findAllUsers();

      expect(result).toEqual(users);
      expect(service.findAll).toHaveBeenCalled();
    });
  });

  describe('create', () => {
    it('should create a user', async () => {
      const createUserDto: CreateUserDto = { username: 'testuser', password: 'password', confirmPassword: 'password', phoneNumber: '1234567890' };
      const user = { ...createUserDto, id: 1 } as unknown as User;
      jest.spyOn(service, 'create').mockResolvedValueOnce(user);

      const result = await controller.create(createUserDto);

      expect(result).toEqual(user);
      expect(service.create).toHaveBeenCalledWith(createUserDto);
    });
  });

  describe('remove', () => {
    it('should remove a user', async () => {
      jest.spyOn(service, 'remove').mockResolvedValueOnce(undefined);

      const result = await controller.remove(1);

      expect(result).toBeUndefined();
      expect(service.remove).toHaveBeenCalledWith(1);
    });
  });
});
