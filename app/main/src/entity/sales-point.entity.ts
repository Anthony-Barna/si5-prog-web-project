import { Column, Entity, ObjectID, ObjectIdColumn, OneToMany } from "typeorm";
import { ApiProperty } from "@nestjs/swagger";
import { Service } from "./service.entity";
import { Price } from "./price.entity";

@Entity()
export class SalesPoint {
  @ObjectIdColumn()
  id: ObjectID;

  @Column()
  @ApiProperty({
    name: "address",
    type: "string",
    example: "'573 route d",
    description: "The address of the sales-point",
  })
  address: string;

  @Column()
  city: string;

  @Column()
  opening: string;

  @Column()
  closing: string;

  @Column()
  rupture: string;

  @Column(() => Service)
  services: Service[];

  @Column(() => Price)
  prices: Price[];
}
