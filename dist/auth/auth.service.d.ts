import { JwtService } from '@nestjs/jwt';
import { Model } from 'mongoose';
import { User } from '../user/schemas/user.schema';
import { LoginDto } from './dto/login.dto';
export declare class AuthService {
    private userModel;
    private jwtService;
    constructor(userModel: Model<User>, jwtService: JwtService);
    validateUser(email: string, password: string): Promise<any>;
    login(loginDto: LoginDto): Promise<{
        access_token: string;
    }>;
}
