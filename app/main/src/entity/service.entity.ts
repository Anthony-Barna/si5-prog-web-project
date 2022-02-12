import { Column, Entity } from "typeorm";
import { ApiProperty } from "@nestjs/swagger";

@Entity()
export class Service {
  @Column()
  @ApiProperty({ description: "description of the service" })
  name: string;
}
