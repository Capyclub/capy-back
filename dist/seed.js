"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@nestjs/core");
const app_module_1 = require("./app.module");
const user_service_1 = require("./user/user.service");
const faker_1 = require("@faker-js/faker");
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
    const generateUser = () => ({
        first_name: faker_1.faker.person.firstName(),
        last_name: faker_1.faker.person.lastName(),
        email: faker_1.faker.internet.email(),
        password: faker_1.faker.internet.password(),
        city: faker_1.faker.location.city(),
        postal_code: parseInt(faker_1.faker.location.zipCode(), 10),
        date_of_birth: faker_1.faker.date.birthdate({ min: 18, max: 65, mode: 'age' }),
        isAdmin: faker_1.faker.datatype.boolean(),
    });
    const users = Array.from({ length: 10 }, generateUser);
    for (const user of users) {
        await userService.create(user);
    }
    console.log('Database seeded with fake users.');
    await app.close();
}
bootstrap();
//# sourceMappingURL=seed.js.map