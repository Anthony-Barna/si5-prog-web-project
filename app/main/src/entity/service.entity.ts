import {
  Column,
  Entity,
  ManyToOne,
  ObjectID,
  ObjectIdColumn,
  OneToMany,
} from "typeorm";
import { ApiProperty } from "@nestjs/swagger";
import { SalesPoint } from "./sales-point.entity";

@Entity()
export class Service {
  @ObjectIdColumn()
  id: ObjectID;

  @ManyToOne(() => SalesPoint, (salesPoints) => salesPoints.services)
  salesPoint: SalesPoint;

  @Column()
  name: string;
}
