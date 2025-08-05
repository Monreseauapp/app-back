import { Test, TestingModule } from '@nestjs/testing'
import { UsersController } from './users.controller'
import { UsersService } from './users.service'

// Use partial Prisma types to avoid conflicts
type CreateUserInput = {
  email: string
  firstName?: string
  lastName?: string
  name?: string
  address?: string
  postalCode?: number
  city?: string
  country?: string
  phone?: string
  password?: string
  rententionDate?: Date
}

type UpdateUserInput = {
  email?: string
  firstName?: string
  lastName?: string
  name?: string
  address?: string
  postalCode?: number
  city?: string
  country?: string
  phone?: string
}

describe('UsersController', () => {
  let controller: UsersController
  let usersService: UsersService

  const mockUser = {
    id: 'user-123',
    email: 'test@example.com',
    firstName: 'John',
    lastName: 'Doe',
    name: 'John Doe',
    address: '123 Main St',
    postalCode: 12345,
    city: 'Testville',
    country: 'Testland',
    phone: '123-456-7890',
    createdAt: new Date(),
    updatedAt: new Date(),
  }

  const mockCompany = {
    id: 'company-123',
    name: 'Test Company',
    createdAt: new Date(),
    updatedAt: new Date(),
  }

  const mockUsersService = {
    create: jest.fn(),
    findAll: jest.fn(),
    findOne: jest.fn(),
    findByEmail: jest.fn(),
    findUserCompany: jest.fn(),
    update: jest.fn(),
    remove: jest.fn(),
  }

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UsersController],
      providers: [
        {
          provide: UsersService,
          useValue: mockUsersService,
        },
      ],
    }).compile()

    controller = module.get<UsersController>(UsersController)
    usersService = module.get<UsersService>(UsersService)

    // Reset mocks
    jest.clearAllMocks()
  })

  it('should be defined', () => {
    expect(controller).toBeDefined()
  })

  describe('create', () => {
    it('should create a user with all fields', async () => {
      const createUserDto: CreateUserInput = {
        email: 'test@example.com',
        firstName: 'John',
        lastName: 'Doe',
        address: '123 Main St',
        postalCode: 12345,
        city: 'Testville',
        country: 'Testland',
        phone: '123-456-7890',
        password: 'securepassword',
        retentionDate: new Date(),
      }

      mockUsersService.create.mockResolvedValue(mockUser)

      const result = await controller.create(createUserDto as any)

      expect(usersService.create).toHaveBeenCalledWith(createUserDto)
      expect(result).toEqual(mockUser)
    })

    it('should create a user with minimal fields', async () => {
      const createUserDto: CreateUserInput = {
        email: 'test@example.com',
        name: 'John Doe',
      }

      mockUsersService.create.mockResolvedValue(mockUser)

      const result = await controller.create(createUserDto as any)

      expect(usersService.create).toHaveBeenCalledWith(createUserDto)
      expect(result).toEqual(mockUser)
    })

    it('should handle create errors', async () => {
      const createUserDto: CreateUserInput = {
        email: 'test@example.com',
        name: 'John Doe',
      }

      const error = new Error('User creation failed')
      mockUsersService.create.mockRejectedValue(error)

      await expect(controller.create(createUserDto as any)).rejects.toThrow(
        error,
      )
      expect(usersService.create).toHaveBeenCalledWith(createUserDto)
    })

    it('should handle duplicate email error', async () => {
      const createUserDto: CreateUserInput = {
        email: 'existing@example.com',
        name: 'John Doe',
      }

      const error = new Error('Email already exists')
      mockUsersService.create.mockRejectedValue(error)

      await expect(controller.create(createUserDto as any)).rejects.toThrow(
        error,
      )
      expect(usersService.create).toHaveBeenCalledWith(createUserDto)
    })
  })

  describe('findAll', () => {
    it('should return all users', async () => {
      const mockUsers = [
        mockUser,
        { ...mockUser, id: 'user-456', email: 'test2@example.com' },
      ]
      mockUsersService.findAll.mockResolvedValue(mockUsers)

      const result = await controller.findAll()

      expect(usersService.findAll).toHaveBeenCalled()
      expect(result).toEqual(mockUsers)
    })

    it('should return empty array when no users exist', async () => {
      mockUsersService.findAll.mockResolvedValue([])

      const result = await controller.findAll()

      expect(usersService.findAll).toHaveBeenCalled()
      expect(result).toEqual([])
    })

    it('should handle service errors', async () => {
      const error = new Error('Database connection failed')
      mockUsersService.findAll.mockRejectedValue(error)

      await expect(controller.findAll()).rejects.toThrow(error)
      expect(usersService.findAll).toHaveBeenCalled()
    })
  })

  describe('findOne', () => {
    it('should return a user by id', async () => {
      const userId = 'user-123'
      mockUsersService.findOne.mockResolvedValue(mockUser)

      const result = await controller.findOne(userId)

      expect(usersService.findOne).toHaveBeenCalledWith(userId)
      expect(result).toEqual(mockUser)
    })

    it('should handle user not found', async () => {
      const userId = 'non-existent-user'
      mockUsersService.findOne.mockResolvedValue(null)

      const result = await controller.findOne(userId)

      expect(usersService.findOne).toHaveBeenCalledWith(userId)
      expect(result).toBeNull()
    })

    it('should handle invalid user id format', async () => {
      const userId = 'invalid-id'
      const error = new Error('Invalid user ID format')
      mockUsersService.findOne.mockRejectedValue(error)

      await expect(controller.findOne(userId)).rejects.toThrow(error)
      expect(usersService.findOne).toHaveBeenCalledWith(userId)
    })
  })

  describe('findByEmail', () => {
    it('should return a user by email', async () => {
      const email = 'test@example.com'
      mockUsersService.findByEmail.mockResolvedValue(mockUser)

      const result = await controller.findByEmail(email)

      expect(usersService.findByEmail).toHaveBeenCalledWith(email)
      expect(result).toEqual(mockUser)
    })

    it('should handle user not found by email', async () => {
      const email = 'nonexistent@example.com'
      mockUsersService.findByEmail.mockResolvedValue(null)

      const result = await controller.findByEmail(email)

      expect(usersService.findByEmail).toHaveBeenCalledWith(email)
      expect(result).toBeNull()
    })

    it('should handle invalid email format', async () => {
      const email = 'invalid-email'
      const error = new Error('Invalid email format')
      mockUsersService.findByEmail.mockRejectedValue(error)

      await expect(controller.findByEmail(email)).rejects.toThrow(error)
      expect(usersService.findByEmail).toHaveBeenCalledWith(email)
    })
  })

  describe('findUserCompany', () => {
    it('should return user company', async () => {
      const userId = 'user-123'
      mockUsersService.findUserCompany.mockResolvedValue(mockCompany)

      const result = await controller.findUserCompany(userId)

      expect(usersService.findUserCompany).toHaveBeenCalledWith(userId)
      expect(result).toEqual(mockCompany)
    })

    it('should handle user with no company', async () => {
      const userId = 'user-123'
      mockUsersService.findUserCompany.mockResolvedValue(null)

      const result = await controller.findUserCompany(userId)

      expect(usersService.findUserCompany).toHaveBeenCalledWith(userId)
      expect(result).toBeNull()
    })

    it('should handle user not found', async () => {
      const userId = 'non-existent-user'
      const error = new Error('User not found')
      mockUsersService.findUserCompany.mockRejectedValue(error)

      await expect(controller.findUserCompany(userId)).rejects.toThrow(error)
      expect(usersService.findUserCompany).toHaveBeenCalledWith(userId)
    })
  })

  describe('update', () => {
    it('should update a user with multiple fields', async () => {
      const userId = 'user-123'
      const updateUserDto: UpdateUserInput = {
        firstName: 'John Updated',
        lastName: 'Doe Updated',
        email: 'updated@example.com',
        city: 'New City',
      }
      const updatedUser = { ...mockUser, ...updateUserDto }

      mockUsersService.update.mockResolvedValue(updatedUser)

      const result = await controller.update(userId, updateUserDto as any)

      expect(usersService.update).toHaveBeenCalledWith(userId, updateUserDto)
      expect(result).toEqual(updatedUser)
    })

    it('should handle update with partial data', async () => {
      const userId = 'user-123'
      const updateUserDto: UpdateUserInput = {
        firstName: 'John Updated',
      }
      const updatedUser = { ...mockUser, firstName: 'John Updated' }

      mockUsersService.update.mockResolvedValue(updatedUser)

      const result = await controller.update(userId, updateUserDto as any)

      expect(usersService.update).toHaveBeenCalledWith(userId, updateUserDto)
      expect(result).toEqual(updatedUser)
    })

    it('should handle update errors', async () => {
      const userId = 'user-123'
      const updateUserDto: UpdateUserInput = {
        firstName: 'John Updated',
      }
      const error = new Error('Update failed')

      mockUsersService.update.mockRejectedValue(error)

      await expect(
        controller.update(userId, updateUserDto as any),
      ).rejects.toThrow(error)
      expect(usersService.update).toHaveBeenCalledWith(userId, updateUserDto)
    })

    it('should handle email conflict on update', async () => {
      const userId = 'user-123'
      const updateUserDto: UpdateUserInput = {
        email: 'existing@example.com',
      }
      const error = new Error('Email already exists')

      mockUsersService.update.mockRejectedValue(error)

      await expect(
        controller.update(userId, updateUserDto as any),
      ).rejects.toThrow(error)
      expect(usersService.update).toHaveBeenCalledWith(userId, updateUserDto)
    })
  })

  describe('remove', () => {
    it('should remove a user', async () => {
      const userId = 'user-123'
      mockUsersService.remove.mockResolvedValue(mockUser)

      const result = await controller.remove(userId)

      expect(usersService.remove).toHaveBeenCalledWith(userId)
      expect(result).toEqual(mockUser)
    })

    it('should handle remove errors', async () => {
      const userId = 'user-123'
      const error = new Error('Remove failed')

      mockUsersService.remove.mockRejectedValue(error)

      await expect(controller.remove(userId)).rejects.toThrow(error)
      expect(usersService.remove).toHaveBeenCalledWith(userId)
    })

    it('should handle removing non-existent user', async () => {
      const userId = 'non-existent-user'
      const error = new Error('User not found')

      mockUsersService.remove.mockRejectedValue(error)

      await expect(controller.remove(userId)).rejects.toThrow(error)
      expect(usersService.remove).toHaveBeenCalledWith(userId)
    })

    it('should handle cascade deletion constraints', async () => {
      const userId = 'user-123'
      const error = new Error('Cannot delete user with existing relations')

      mockUsersService.remove.mockRejectedValue(error)

      await expect(controller.remove(userId)).rejects.toThrow(error)
      expect(usersService.remove).toHaveBeenCalledWith(userId)
    })
  })
})
