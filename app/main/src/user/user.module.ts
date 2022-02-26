import {Module} from '@nestjs/common';
import {UserService} from './user.service';
import {UserController} from './user.controller';
import {TypeOrmModule} from "@nestjs/typeorm";
import {User} from "../model/entity/user.entity";
import {EncryptService} from "../auth/encrypt.service";

@Module({
  imports: [TypeOrmModule.forFeature([User])],
  providers: [UserService, EncryptService],
  controllers: [UserController]
})
export class UserModule {}
