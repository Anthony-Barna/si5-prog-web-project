import {ApiProperty} from "@nestjs/swagger";

export class LoginInfo {

    @ApiProperty({
        type: "string",
        example: "fake@mail.com"
    })
    email: string;
    @ApiProperty({
        type: "string",
        example: "secret-password"
    })
    password: string;
}