import { Document } from 'mongoose';
export declare class User extends Document {
    first_name: string;
    last_name: string;
    email: string;
    city: string;
    postal_code: number;
    date_of_birth: Date;
    password: string;
    isAdmin: boolean;
}
export declare const UserSchema: import("mongoose").Schema<User, import("mongoose").Model<User, any, any, any, Document<unknown, any, User> & User & Required<{
    _id: unknown;
}> & {
    __v: number;
}, any>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, User, Document<unknown, {}, import("mongoose").FlatRecord<User>> & import("mongoose").FlatRecord<User> & Required<{
    _id: unknown;
}> & {
    __v: number;
}>;
