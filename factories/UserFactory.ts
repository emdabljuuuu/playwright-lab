import { CreateUserDto } from "../api/UserApiClient";
import { faker } from "@faker-js/faker"

export class UserFactory {
    static createDefault(): CreateUserDto {
        return {
            address: {
                street: faker.location.street(),
                city: faker.location.city(),
            },
            name: faker.person.firstName(),
            username: faker.person.lastName(),
            email: faker.internet.email()
        }
    }
}