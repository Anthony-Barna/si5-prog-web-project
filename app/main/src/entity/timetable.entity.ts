import { Column, Entity } from "typeorm";
import { ApiProperty } from "@nestjs/swagger";

@Entity()
export class Timetable {
  @Column()
  id: string;

  @Column()
  name: string;

  @Column()
  closed: boolean;
}
