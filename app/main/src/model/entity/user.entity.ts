import {Column, Entity, ObjectID, ObjectIdColumn} from "typeorm";
import {ApiProperty} from "@nestjs/swagger";
import {Exclude} from "class-transformer";

@Entity()
export class User {

  @ObjectIdColumn()
  id: ObjectID;

  @ApiProperty()
  @Column()
  email: string;

  @ApiProperty()
  @Exclude()
  @Column()
  password: string;

  @ApiProperty()
  @Column()
  firstname: string;

  @ApiProperty()
  @Column()
  lastname: string;
}
