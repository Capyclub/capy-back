"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@nestjs/core");
const app_module_1 = require("./app.module");
const user_service_1 = require("./user/user.service");
async function bootstrap() {
    const app = await core_1.NestFactory.createApplicationContext(app_module_1.AppModule);
    const userService = app.get(user_service_1.UserService);
    const admin = {
        first_name: 'Loise',
        last_name: 'Fenoll',
        email: 'loise.fenoll@ynov.com',
        password: 'ANKymoUTFu4rbybmQ9Mt',
        city: 'Paris',
        postal_code: 75001,
        date_of_birth: new Date('2000-01-01'),
        isAdmin: true,
    };
    await userService.create(admin);
    console.log('Admin created successfully!');
    await app.close();
}
bootstrap();
//# sourceMappingURL=seed.js.map