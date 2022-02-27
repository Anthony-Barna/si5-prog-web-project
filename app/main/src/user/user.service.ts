import {Injectable, Logger, NotFoundException} from '@nestjs/common';
import {InjectRepository} from "@nestjs/typeorm";
import {MongoRepository} from "typeorm";
import {User} from "../model/entity/user.entity";
import {EncryptService} from "../auth/encrypt.service";

@Injectable()
export class UserService {
    constructor(
        private readonly encryptService: EncryptService,
        @InjectRepository(User) private readonly userRepository: MongoRepository<User>
    ) {
    }

    public async createUser(user: User): Promise<User> {
        user.password = await this.encryptService.encrypt(user.password);
        return this.userRepository.save(user);
    }

    public async findByEmail(email: string): Promise<User> {
        let user: User = await this
            .userRepository
            .findOne({
                where: {
                    email: email
                }
            });
        if(!user) {
            throw new NotFoundException("User not found");
        }
        return user;
    }

    public async deleteById(userId: string): Promise<void> {
        let user: User = await this
            .userRepository
            .findOne({
                where: {
                    id: userId
                }
            });
        if(!user) {
            throw new NotFoundException("User not found");
        }
        await this.userRepository.delete(user);
    }
}
