import {Module} from '@nestjs/common';
import {AuthService} from './auth.service';
import {PublicController} from './public.controller';
import {TypeOrmModule} from "@nestjs/typeorm";
import {User} from "../model/entity/user.entity";
import {UserService} from "../user/user.service";
import {EncryptService} from './encrypt.service';
import {jwtConstants} from "./constants";
import {JwtModule} from "@nestjs/jwt";
import {JwtStrategy} from "./jwt.strategy";

@Module({
  imports: [
      TypeOrmModule.forFeature([User]),
      JwtModule.register({
      secret: jwtConstants.secret,
      signOptions: { expiresIn: '1h' },
    }),
  ],
  providers: [AuthService, UserService, EncryptService, JwtStrategy],
  controllers: [PublicController]
})
export class AuthModule {}
