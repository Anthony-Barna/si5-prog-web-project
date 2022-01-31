import { Column, Entity } from "typeorm";

@Entity()
export class Service {
  @Column()
  name: string;
}
