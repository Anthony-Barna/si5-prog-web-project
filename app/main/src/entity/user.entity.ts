import {Column, Entity, ObjectID, ObjectIdColumn} from "typeorm";
import {ApiProperty} from "@nestjs/swagger";
import {Exclude} from "class-transformer";

@Entity()
export class User {

  @ObjectIdColumn()
  id: ObjectID;

  @ApiProperty()
  @Column()
  email: number;

  @ApiProperty()
  @Exclude()
  @Column()
  password: string;

  @ApiProperty()
  @Column()
  firstName: string;

  @ApiProperty()
  @Column()
  lastName: string;
}
