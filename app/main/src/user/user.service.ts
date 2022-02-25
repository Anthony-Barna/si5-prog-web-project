import {Injectable, NotFoundException} from '@nestjs/common';
import {InjectRepository} from "@nestjs/typeorm";
import {MongoRepository} from "typeorm";
import {User} from "../entity/user.entity";

@Injectable()
export class UserService {
    constructor(
        @InjectRepository(User) private readonly userRepository: MongoRepository<User>
    ) {
    }

    public async createUser(user: User): Promise<User> {
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
