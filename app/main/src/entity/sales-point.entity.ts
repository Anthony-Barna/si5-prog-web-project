import {Column, Entity, ObjectID, ObjectIdColumn, OneToMany} from 'typeorm';
import {ApiProperty} from "@nestjs/swagger";

@Entity()
export class SalesPoint {
  @ObjectIdColumn()
  id: ObjectID;

  @Column()
  @ApiProperty({ example: "'573 route d", description: 'The address of the sales-point' })
  address: string;

  @Column()
  city: string;

  @Column()
  opening: string;

  @Column()
  closing: string;

  @Column()
  rupture: string;

  /*@OneToMany()
  services: Service;

  @OneToMany()
  prices: Price;*/
}
