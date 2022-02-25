import {ForbiddenException, Injectable} from '@nestjs/common';
import {UserService} from "../user/user.service";
import {User} from "../entity/user.entity";

@Injectable()
export class AuthService {

    constructor(private readonly userService: UserService) {}

    private async validateUser(email: string, password: string): Promise<void> {
        let user: User = await this.userService.findByEmail(email);
        if(password !== user.password) {
            throw new ForbiddenException("Invalid credentials");
        }
    }

    public async login(user: User): Promise<any> {

    }
}
