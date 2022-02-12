
import { Column, Entity, ObjectID, ObjectIdColumn } from "typeorm";
import { ApiProperty } from "@nestjs/swagger";
import { Service } from "./service.entity";
import { Price } from "./price.entity";
import { Position } from "./position.entity";
import { Address } from "./address.entity";
import { Timetable } from "./timetable.entity";

@Entity()
export class SalesPoint {
  @ObjectIdColumn()
  id: ObjectID;

  @Column()
  @ApiProperty()
  rupture: string;

  @Column()
  @ApiProperty()
  presence: string;

  @Column()
  @ApiProperty()
  hasAutomate: boolean;

  @Column(() => Address)
  @ApiProperty()
  address: Address;

  @Column(() => Position)
  @ApiProperty()
  position: Position;

  @Column(() => Service)
  @ApiProperty({ type: Service, isArray: true })
  services: Service[];

  @Column(() => Timetable)
  @ApiProperty({ type: Timetable, isArray: true })
  timetables: Timetable[];

  @Column(() => Price)
  @ApiProperty({ type: Price, isArray: true })
  prices: Price[];
}
