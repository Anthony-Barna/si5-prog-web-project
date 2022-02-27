import {Column, Entity, ObjectID, ObjectIdColumn, TableInheritance} from "typeorm";
import {ApiProperty} from "@nestjs/swagger";
import {Price} from "../price.entity";

@Entity()
@TableInheritance({ column: { type: "varchar", name: "type" } })
export abstract class Statistic {

  public static readonly DEPARTMENTAL_TYPE = "departmental";
  public static readonly REGIONAL_TYPE = "regional";
  public static readonly NATIONAL_TYPE = "national";

  @ObjectIdColumn()
  id: ObjectID;

  @ApiProperty()
  @Column()
  type: string

  @Column()
  @ApiProperty({example: "83 <3"})
  code: string;

  @Column(() => Price)
  @ApiProperty({ type: Price, isArray: true, description: "Average price for a fuel" })
  prices: Price[];

  protected constructor(type: string) {
    this.type = type;
    this.prices = [];
  }
}
