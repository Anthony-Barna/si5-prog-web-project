import { Column, Entity } from "typeorm";
import { ApiProperty } from "@nestjs/swagger";

@Entity()
export class Address {
  @Column()
  @ApiProperty({
    type: "string",
    example: "'573 route d",
    description: "The address of the sales-point",
  })
  street: string;

  @Column()
  @ApiProperty({
    type: "string",
    example: "Nice",
    description: "The city of the sales-point",
  })
  city: string;

  @Column()
  @ApiProperty({
    type: "string",
    example: "06410",
    description: "The city of the sales-point",
  })
  postalCode: string;
}
