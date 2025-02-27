import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from './schemas/user.schema';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';


@Injectable()
export class UserService {
  constructor(@InjectModel(User.name) private userModel: Model<User>) {}

  async findAll(): Promise<User[]> {
    const users = await this.userModel
      .find()
      .exec();
    return users;
  }

  async findOne(id: string): Promise<User> {
    const user = await this.userModel.findById(id).exec();
    if (!user) {
      throw new NotFoundException(`User with ID "${id}" not found`);
    }
    return user;
  }

  async findEmail(email: string): Promise<User> {
    console.log(`Searching for user with email: ${email}`);

    const user = await this.userModel.findOne({ email: email }).exec();

    if (!user) {
      console.log(`No user found with email: ${email}`);
      throw new NotFoundException('User not found');
    }

    console.log(`User found: ${JSON.stringify(user)}`);
    return user;
  }

  async create(createUserDto: CreateUserDto): Promise<User> {
    const birthDate = new Date(createUserDto.date_of_birth);
    const age = new Date().getFullYear() - birthDate.getFullYear();

    if (age < 18) {
      throw new BadRequestException('You must be at least 18 years old');
    }

    // Set a default password if not provided (in the case of a noun admin user)
    createUserDto.password = 'defaultPassword123';

    const newUser = new this.userModel(createUserDto);
    return newUser.save();
  }

  async update(id: string, updateUserDto: UpdateUserDto): Promise<User> {
    const updatedUser = await this.userModel
      .findByIdAndUpdate(id, updateUserDto, { new: true })
      .exec();
    if (!updatedUser) {
      throw new NotFoundException(`User with ID "${id}" not found`);
    }
    return updatedUser;
  }

  async delete(id: string): Promise<void> {
    const result = await this.userModel.findByIdAndDelete(id).exec();
    if (!result) {
      throw new NotFoundException(`User with ID "${id}" not found`);
    }
  }
}
