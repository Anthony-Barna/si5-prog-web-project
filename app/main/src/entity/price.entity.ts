import { Column, Entity } from "typeorm";

@Entity()
export class Price {
  @Column()
  id: string;

  @Column()
  name: string;

  @Column()
  value: number;

  @Column({ type: "timestamp" })
  lastUpdateDate: Date;
}
