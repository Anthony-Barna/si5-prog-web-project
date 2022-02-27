import {ForbiddenException, Injectable} from '@nestjs/common';
import {UserService} from "../user/user.service";
import {User} from "../model/entity/user.entity";
import {EncryptService} from "./encrypt.service";
import {LoginInfo} from "../model/login-info";
import {JwtService} from "@nestjs/jwt";
import {UserDtoOut} from "../model/dto/out/user.dto.out";

@Injectable()
export class AuthService {

    constructor(
        private readonly userService: UserService,
        private readonly encryptService: EncryptService,
        private jwtService: JwtService
    ) {}

    private async validateUser(email: string, password: string): Promise<User> {
        let user: User = await this.userService.findByEmail(email);
        if(!await this.encryptService.validatePassword(password, user.password)) {
            throw new ForbiddenException("Invalid credentials");
        }
        return user;
    }

    public async login(loginInfo: LoginInfo): Promise<any> {
        let validatedUser: User = await this.validateUser(loginInfo.email, loginInfo.password);
        let plainObject : string = JSON.stringify(new UserDtoOut(validatedUser));
        return {
            access_token: this.jwtService.sign({plainObject}),
        };
    }
}
