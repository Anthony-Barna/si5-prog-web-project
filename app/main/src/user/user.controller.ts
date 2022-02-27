import {BadRequestException, Controller, Delete, Get, HttpStatus, Param, UseGuards} from '@nestjs/common';
import {ApiOperation, ApiResponse, ApiTags} from "@nestjs/swagger";
import {UserService} from "./user.service";
import {User} from "../model/entity/user.entity";
import {UserDtoOut} from "../model/dto/out/user.dto.out";
import {JwtAuthGuard} from "../auth/jwt-auth.guard";

@ApiTags("/api/users")
@Controller('/api/users')
@UseGuards(JwtAuthGuard)
export class UserController {

    constructor(private readonly userService: UserService) {}

    @Get('/:email')
    @ApiOperation({summary: "Return an user by email"})
    @ApiResponse({
        status: HttpStatus.OK,
        description: "Ok",
        type: User,
    })
    @ApiResponse({
        status: HttpStatus.NOT_FOUND,
        description: "User not found",
    })
    @ApiResponse({
        status: HttpStatus.BAD_REQUEST,
        description: "Email not mentioned",
    })
    async findByEmail(@Param() params): Promise<UserDtoOut> {
        if (!params.email) {
            throw new BadRequestException("Email not mentioned");
        }
        return new UserDtoOut(await this.userService.findByEmail(params.email));
    }

    @Delete('/:email')
    @ApiOperation({ summary: "Delete an user by id" })
    @ApiResponse({
        status: HttpStatus.NO_CONTENT,
        description: "User deleted",
        type: User,
    })
    @ApiResponse({
        status: HttpStatus.NOT_FOUND,
        description: "User not found",
    })
    @ApiResponse({
        status: HttpStatus.BAD_REQUEST,
        description: "Id not mentioned",
    })
    deleteById(@Param() params): Promise<void> {
        if(!params.id) {
            throw new BadRequestException("User id not mentioned");
        }
        return this.userService.deleteById(params.id);
    }
}
