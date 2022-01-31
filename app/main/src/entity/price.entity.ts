import { Column, Entity } from "typeorm";
import { ApiProperty } from "@nestjs/swagger";

@Entity()
export class Price {
  @Column()
  @ApiProperty({ description: "fuel id" })
  id: string;

  @Column()
  @ApiProperty({
    type: "string",
    example: "SP95",
    description: "fuel name",
  })
  name: string;

  @Column()
  @ApiProperty()
  value: number;

  @Column({ type: "timestamp" })
  @ApiProperty({
    description: "Last update date",
  })
  lastUpdateDate: Date;
}
