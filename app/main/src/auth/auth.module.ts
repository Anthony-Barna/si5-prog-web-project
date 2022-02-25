import {Module} from '@nestjs/common';
import {AuthService} from './auth.service';
import {PublicController} from './public.controller';
import {TypeOrmModule} from "@nestjs/typeorm";
import {User} from "../entity/user.entity";
import {UserService} from "../user/user.service";

@Module({
  imports: [TypeOrmModule.forFeature([User])],
  providers: [AuthService, UserService],
  controllers: [PublicController]
})
export class AuthModule {}
