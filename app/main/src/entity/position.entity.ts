import { Column, Entity } from "typeorm";
import { ApiProperty } from "@nestjs/swagger";

@Entity()
export class Position {
  @Column()
  @ApiProperty()
  longitude: number;

  @Column()
  @ApiProperty()
  latitude: number;
}
