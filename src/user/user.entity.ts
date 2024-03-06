import {
  AfterInsert,
  AfterRemove,
  AfterUpdate,
  Column,
  Entity,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Exclude, Expose } from 'class-transformer';

@Entity('user')
export class User {
  @PrimaryGeneratedColumn()
  @Expose()
  id: number;

  @Column({ unique: true, type: 'varchar', length: 32 })
  username: string;

  @Column()
  @Exclude()
  password: string;

  @Column({ type: 'varchar', length: 10 })
  phoneNumber: string;

  @AfterInsert()
  logInsert() {
    console.log('Inserted user id:', this.id);
  }

  @AfterUpdate()
  logUpdate() {
    console.log('Updated user id:', this.id);
  }

  @AfterRemove()
  logRemove() {
    console.log('Removed user id:', this.id);
  }
}
