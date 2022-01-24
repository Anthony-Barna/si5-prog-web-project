import { Column, Entity, ObjectID, ObjectIdColumn } from "typeorm";

@Entity()
export class Service {
  @ObjectIdColumn()
  id: ObjectID;

  @ObjectIdColumn()
  salesPointId: ObjectID;

  @Column()
  name: string;
}
