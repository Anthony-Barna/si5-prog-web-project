import {Body, Controller, HttpStatus, Post} from '@nestjs/common';
import {ApiOperation, ApiResponse, ApiTags} from "@nestjs/swagger";
import {AuthService} from "./auth.service";
import {UserService} from "../user/user.service";
import {User} from "../entity/user.entity";

@ApiTags('public')
@Controller('public')
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
    async register(@Body() body: User): Promise<User> {
        return this.userService.createUser(body);
    }

    @Post('/login')
    @ApiOperation({summary: "Authenticates an user"})
    @ApiResponse({
        status: HttpStatus.CREATED,
        description: "User authenticated",
    })
    async login(): Promise<any> {
    }
}
