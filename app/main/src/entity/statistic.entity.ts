import {Column, Entity, ObjectID, ObjectIdColumn} from "typeorm";
import {ApiProperty} from "@nestjs/swagger";
import {Price} from "./price.entity";

@Entity()
export class Statistic {
  @ObjectIdColumn()
  id: ObjectID;

  @Column()
  @ApiProperty({example: "83 <3"})
  departmentCode: string;

  @Column(() => Price)
  @ApiProperty({ type: Price, isArray: true, description: "Average price for a fuel" })
  prices: Price[];
}
