import { Column, Entity, ObjectID, ObjectIdColumn, OneToMany } from "typeorm";
import { ApiProperty } from "@nestjs/swagger";
import { Service } from "./service.entity";

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

  @OneToMany((type) => Service, (service) => service.salesPoint, {
    cascade: true,
  })
  services: Service[];

  /*
  @OneToMany()
  prices: Price;*/
}
