import { APIRequestContext } from "@playwright/test";
import { z } from "zod";
import { BaseApiClient } from "./BaseApiClient";

export const AddressSchema = z.object({
  street: z.string(),
  city: z.string(),
});

export type AddressDto = z.infer<typeof AddressSchema>;

export const UserSchema = z.object({
  id: z.number(),
  name: z.string(),
  username: z.string(),
  email: z.email(),
  address: AddressSchema,
});

export const CreateUserSchema = UserSchema.omit({ id: true });

export type UserDto = z.infer<typeof UserSchema>;

export type CreateUserDto = z.infer<typeof CreateUserSchema>;

export class UserApiClient extends BaseApiClient {
    readonly usersUrl: string = `${process.env.BASE_URL}/users/`

    constructor(request: APIRequestContext) {
        super (request);
    }

    async getUser(userId: number): Promise<UserDto> {
        const fullUrl: string = `${this.usersUrl}${userId}`; 
        return this.get(fullUrl, UserSchema);
    }

    async createUser(userData: CreateUserDto): Promise<UserDto> {
        return this.post(this.usersUrl, userData, UserSchema);
    }

    async deleteUser(userId: number): Promise<UserDto | void> {
        const fullUrl: string = `${this.usersUrl}${userId}`;
        return this.delete(fullUrl);
    }

}