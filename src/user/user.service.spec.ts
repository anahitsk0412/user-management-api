import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { BadRequestException, NotFoundException } from '@nestjs/common';
import { v4 as uuidv4 } from 'uuid';

import { UserService } from './user.service';
import { User } from './user.entity';

describe('UserService', () => {
  let service: UserService;
  let userRepository: Repository<User>;
  let repoMock: any;

  let userRepositoryToken: string | Function = getRepositoryToken(User);

  beforeEach(async () => {
    repoMock = {
      create: jest.fn(),
      save: jest.fn(),
      findOne: jest.fn(),
      find: jest.fn(),
      remove: jest.fn(),
    };

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UserService,
        {
          provide: userRepositoryToken,
          useValue: repoMock,
        },
      ],
    }).compile();

    service = module.get<UserService>(UserService);
    userRepository = module.get<Repository<User>>(userRepositoryToken);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('create', () => {
    it('should create a user', async () => {
      const userData = {
        username: `testuser-${uuidv4()}`,
        password: 'passworD!',
        confirmPassword: 'passworD!',
        phoneNumber: '1234567890',
      };
      const expectedUser = { ...userData, id: 1 };

      repoMock.create.mockReturnValueOnce(expectedUser);
      repoMock.save.mockResolvedValueOnce(expectedUser);

      const result = await service.create(userData);

      expect(result.username).toEqual(expectedUser.username);
      expect(result.phoneNumber).toEqual(expectedUser.phoneNumber);
    });

    it('should throw BadRequestException when passwords do not match', async () => {
      const userData = {
        username: 'testuser',
        password: 'password',
        confirmPassword: 'password123',
        phoneNumber: '1234567890',
      };

      await expect(service.create(userData)).rejects.toThrow(
        BadRequestException,
      );
    });

    it('should throw BadRequestException when save operation fails', async () => {
      const userData = {
        username: 'testuser',
        password: 'password',
        confirmPassword: 'password',
        phoneNumber: '1234567890',
      };
      repoMock.create.mockReturnValueOnce(userData);
      repoMock.save.mockRejectedValueOnce(new BadRequestException());

      await expect(service.create(userData)).rejects.toThrow(
        BadRequestException,
      );
    });
  });

  describe('findOne', () => {
    it('should find a user by id', async () => {
      const userId = 1;
      const expectedUser = { id: userId, username: 'testuser' };
      repoMock.findOne.mockResolvedValueOnce(expectedUser);

      const result = await service.findOne(userId);

      expect(result).toEqual(expectedUser);
      expect(repoMock.findOne).toHaveBeenCalledWith({ where: { id: userId } });
    });

    it('should throw NotFoundException when user is not found', async () => {
      const userId = 1;
      repoMock.findOne.mockResolvedValueOnce(undefined);

      await expect(service.findOne(userId)).rejects.toThrow(NotFoundException);
    });
  });

  describe('findByName', () => {
    it('should find users by username', async () => {
      const username = 'testuser';
      const expectedUsers = [{ id: 1, username: 'testuser' }];
      repoMock.find.mockResolvedValueOnce(expectedUsers);

      const result = await service.findByName(username);

      expect(result).toEqual(expectedUsers);
      expect(repoMock.find).toHaveBeenCalledWith({ where: { username } });
    });
  });

  describe('findAll', () => {
    it('should find all users', async () => {
      const expectedUsers = [{ id: 1, username: 'testuser1' }, { id: 2, username: 'testuser2' }];
      repoMock.find.mockResolvedValueOnce(expectedUsers);

      const result = await service.findAll();

      expect(result).toEqual(expectedUsers);
      expect(repoMock.find).toHaveBeenCalled();
    });
  });

  describe('remove', () => {
    it('should remove a user', async () => {
      const userId = 1;
      const expectedUser = { id: userId, username: 'testuser' };
      repoMock.findOne.mockResolvedValueOnce(expectedUser);

      await service.remove(userId);

      expect(repoMock.remove).toHaveBeenCalledWith(expectedUser);
    });

    it('should throw NotFoundException when user is not found', async () => {
      const userId = 1;
      repoMock.findOne.mockResolvedValueOnce(undefined);

      await expect(service.remove(userId)).rejects.toThrow(NotFoundException);
    });
  });
});
