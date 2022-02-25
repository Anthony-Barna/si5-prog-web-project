import {Injectable} from '@nestjs/common';

const bcrypt = require('bcrypt');
const saltRounds = 10;

@Injectable()
export class EncryptService {

    public async encrypt(plainText: string): Promise<string> {
        return await bcrypt.hash(plainText, saltRounds);
    }

    public async validatePassword(plainPassword: string, hashedPassword): Promise<boolean> {
        return await bcrypt.compare(plainPassword, hashedPassword);
    }
}
