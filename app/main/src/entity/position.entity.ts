import { Column, Entity } from "typeorm";
import { ApiProperty } from "@nestjs/swagger";

@Entity()
export class Position {
  @Column()
  @ApiProperty()
  type: string;

  @Column()
  @ApiProperty({
    type: "number",
    isArray: true,
    example: "[longitude, latitude]",
  })
  coordinates: number[];

  constructor() {
    this.type = "Point";
    this.coordinates = [];
  }
}
