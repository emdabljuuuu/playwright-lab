import { CreateUserDto, UserApiClient, UserDto } from "../api/UserApiClient"
import { DatabaseClient } from "../db/DatabaseClient"
import { APIRequestContext, expect } from "@playwright/test";
import { UserFactory } from "../factories/UserFactory";
import { test } from '@playwright/test'; // Importujemy test
import { LogMethod } from "../utils/decorators";

export class UserSteps {
    private readonly apiClient: UserApiClient;
    private readonly dbClient: DatabaseClient;

    constructor(request: APIRequestContext) {
        this.apiClient = new UserApiClient(request);
        this.dbClient = new DatabaseClient();
    }

    @LogMethod
    async createDefaultUser(): Promise<UserDto> {
        // Opakowujemy logikę w test.step
        return await test.step('Step: Create Default User via API', async () => {
            const userData: CreateUserDto = await UserFactory.createDefault();
            return this.apiClient.createUser(userData);
        });
    }

    async deleteUser(userId: number): Promise<UserDto | void> {
        return this.apiClient.deleteUser(userId);
    }

    @LogMethod
    async verifyUserInDb(user: UserDto): Promise<void> {
        await test.step(`Step: Verify User ${user.email} in Database`, async () => {
        // ... Twoja logika SQL ...
            await this.dbClient.executeQuery<UserDto>(
                'INSERT INTO users (name, username, email, address) VALUES ($1, $2, $3, $4) RETURNING *',
                [user.name, user.username, user.email, JSON.stringify(user.address)]
            );
            const dbRows = await this.dbClient.executeQuery<UserDto>('SELECT * FROM users WHERE email = $1', [user.email]);
            expect(dbRows[0]).toEqual(expect.objectContaining({
                name: user.name,
                username: user.username,
                email: user.email,
                address: user.address
            }));
        });
    }

    async verifyUserDeleted(userId: number, userEmail: string): Promise<void> {
        await this.dbClient.executeQuery<UserDto>('UPDATE users SET email = NULL WHERE id = $1', [userId]);
        const dbRows = await this.dbClient.executeQuery<UserDto>('SELECT * FROM users WHERE email = $1', [userEmail]);
        expect(dbRows[0]).toBeUndefined();
    }

    async close() {
        await this.dbClient.close();    
    }
}