import {ForbiddenException, Injectable} from '@nestjs/common';
import {UserService} from "../user/user.service";
import {User} from "../entity/user.entity";
import {EncryptService} from "./encrypt.service";

@Injectable()
export class AuthService {

    constructor(
        private readonly userService: UserService,
        private readonly encryptService: EncryptService
    ) {}

    private async validateUser(email: string, password: string): Promise<void> {
        let user: User = await this.userService.findByEmail(email);
        if(!await this.encryptService.validatePassword(password, user.password)) {
            throw new ForbiddenException("Invalid credentials");
        }
    }

    public async login(user: User): Promise<any> {
        await this.validateUser(user.email, user.password);
    }
}
