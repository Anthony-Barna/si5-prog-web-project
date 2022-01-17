import { Column, Entity, ObjectID, ObjectIdColumn } from 'typeorm';
import {ApiProperty} from "@nestjs/swagger";

@Entity()
export class Photo {
  @ObjectIdColumn()
  id: ObjectID;

  @Column()
  @ApiProperty({ example: "PIC03.png", description: 'The name of the photo' })
  name: string;

  @Column()
  description: string;

  @Column()
  filename: string;

  @Column()
  isPublished: boolean;
}
