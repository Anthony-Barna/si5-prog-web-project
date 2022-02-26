import {Body, Controller, HttpStatus, Post} from '@nestjs/common';
import {ApiOperation, ApiResponse, ApiTags} from "@nestjs/swagger";
import {AuthService} from "./auth.service";
import {UserService} from "../user/user.service";
import {User} from "../model/entity/user.entity";
import {UserDtoOut} from "../model/dto/out/user.entity";
import {LoginInfo} from "../model/login-info";
import {JwtToken} from "../model/jwt-token";

@ApiTags('public')
@Controller('')
export class PublicController {

    constructor(
        private readonly authService: AuthService,
        private readonly userService: UserService,
    ) {}

    @Post('/register')
    @ApiOperation({summary: "Creates an user"})
    @ApiResponse({
        status: HttpStatus.CREATED,
        description: "User created",
    })
    async register(@Body() body: User): Promise<UserDtoOut> {
        return new UserDtoOut(await this.userService.createUser(body));
    }

    @Post('/login')
    @ApiOperation({summary: "Authenticates an user"})
    @ApiResponse({
        status: HttpStatus.CREATED,
        description: "jwt generated after user authentication",
        type: JwtToken,
    })
    async login(@Body() loginInfo: LoginInfo): Promise<any> {
        return await this.authService.login(loginInfo);
    }
}
