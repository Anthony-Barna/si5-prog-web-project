import { Column, Entity } from "typeorm";
import { ApiProperty } from "@nestjs/swagger";

@Entity()
export class Position {
  @Column()
  @ApiProperty()
  latitude: number;

  @Column()
  @ApiProperty()
  longitude: number;
}
