import { Column, Entity, ObjectID, ObjectIdColumn, OneToMany } from "typeorm";
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
  rupture: string;

  @Column()
  presence: string;

  @Column()
  hasAutomate: boolean;

  @Column(() => Address)
  address: Address;

  @Column(() => Position)
  position: Position;

  @Column(() => Service)
  services: Service[];

  @Column(() => Timetable)
  timetables: Timetable[];

  @Column(() => Price)
  prices: Price[];
}
