"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const user_schema_1 = require("./schemas/user.schema");
let UserService = class UserService {
    constructor(userModel) {
        this.userModel = userModel;
    }
    async findAll() {
        const users = await this.userModel
            .find()
            .exec();
        return users;
    }
    async findOne(id) {
        const user = await this.userModel.findById(id).exec();
        if (!user) {
            throw new common_1.NotFoundException(`User with ID "${id}" not found`);
        }
        return user;
    }
    async findEmail(email) {
        console.log(`Searching for user with email: ${email}`);
        const user = await this.userModel.findOne({ email: email }).exec();
        if (!user) {
            console.log(`No user found with email: ${email}`);
            throw new common_1.NotFoundException('User not found');
        }
        console.log(`User found: ${JSON.stringify(user)}`);
        return user;
    }
    async create(createUserDto) {
        const birthDate = new Date(createUserDto.date_of_birth);
        const age = new Date().getFullYear() - birthDate.getFullYear();
        if (age < 18) {
            throw new common_1.BadRequestException('You must be at least 18 years old');
        }
        createUserDto.password = 'defaultPassword123';
        const newUser = new this.userModel(createUserDto);
        return newUser.save();
    }
    async update(id, updateUserDto) {
        const updatedUser = await this.userModel
            .findByIdAndUpdate(id, updateUserDto, { new: true })
            .exec();
        if (!updatedUser) {
            throw new common_1.NotFoundException(`User with ID "${id}" not found`);
        }
        return updatedUser;
    }
    async delete(id) {
        const result = await this.userModel.findByIdAndDelete(id).exec();
        if (!result) {
            throw new common_1.NotFoundException(`User with ID "${id}" not found`);
        }
    }
};
exports.UserService = UserService;
exports.UserService = UserService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(user_schema_1.User.name)),
    __metadata("design:paramtypes", [mongoose_2.Model])
], UserService);
//# sourceMappingURL=user.service.js.map