import { Column, Entity } from "typeorm";

@Entity()
export class Position {
  @Column()
  latitude: number;

  @Column()
  longitude: number;
}
