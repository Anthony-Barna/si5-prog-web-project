import {ApiProperty} from "@nestjs/swagger";

export class JwtToken {

    @ApiProperty({
        type: "string",
        example: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJwbGFpbk9iamVjdCI6IntcImlkXCI6XCI2MjE4YTY1YjVmMGJhYjNlMDhiNGU3MzRcIixcImVtYWlsXCI6XCJlZG9AYmVua3Muc2t1XCIsXCJmaXJzdG5hbWVcIjpcIkVkb1wiLFwibGFzdG5hbWVcIjpcIkJlbmtzXCJ9IiwiaWF0IjoxNjQ1OTA4NDY3LCJleHAiOjE2NDU5MTIwNjd9.gjWexQ6sGDUoE44kNVN5rUyY3sOFI5xP9jVBVquDJr4",
        description: "jwt token generated after user authentication",
    })
    access_token: string;
}