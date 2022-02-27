import {Column, Entity, ObjectID, ObjectIdColumn} from "typeorm";
import {ApiProperty} from "@nestjs/swagger";
import {User} from "../../entity/user.entity";

@Entity()
export class UserDtoOut {

  @ObjectIdColumn()
  id: ObjectID;

  @ApiProperty()
  @Column()
  email: string;

  @ApiProperty()
  @Column()
  firstname: string;

  @ApiProperty()
  @Column()
  lastname: string;

  constructor(user: User) {
    this.id = user.id;
    this.email = user.email;
    this.firstname = user.firstname;
    this.lastname = user.lastname;
  }
}
