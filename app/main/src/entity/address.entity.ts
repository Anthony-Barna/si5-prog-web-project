import { Column, Entity } from "typeorm";
import { ApiProperty } from "@nestjs/swagger";

@Entity()
export class Address {
  @Column()
  @ApiProperty({
    name: "address",
    type: "string",
    example: "'573 route d",
    description: "The address of the sales-point",
  })
  street: string;

  @Column()
  city: string;

  @Column()
  postalCode: string;
}
