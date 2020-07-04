import {Column, Entity, PrimaryColumn, PrimaryGeneratedColumn} from 'typeorm';

@Entity()
export class User {
  @PrimaryColumn({type: 'varchar', length: 36 })
  id: string;

  @Column({type: "int"})
  gender: number;

  @Column({type: "int"})
  status: number;

  @PrimaryColumn({type: "int"})
  phone: string;

  @Column({type: "varchar", length: 255})
  username: string;

  @Column({type: "varchar", length: 255})
  password: string;

  @Column({type: "varchar", length: 255})
  fullname: string;

  @Column({type: "varchar", length: 255})
  description: string;

  @Column({type: "varchar", length: 255})
  birthday: string;

  @Column({type: "varchar", length: 255})
  avatar: string;

  @Column({type: "varchar", length: 255})
  fb: string;

  @Column({type: "varchar", length: 255})
  zalo: string;

  @Column({type: "varchar", length: 255})
  google: string;

  @Column({type: "varchar", length: 255})
  twitter: string;

  @Column({type: "varchar", length: 255})
  email: string;
}
