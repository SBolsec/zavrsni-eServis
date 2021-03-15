import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { User } from '.';


@Entity({name: "uloga"})
export class Role {
  @PrimaryGeneratedColumn({name: "sif_uloga"})
  id!: number;

  @Column({name: "naziv_uloga"})
  role!: string;

  @OneToMany((_type) => User, (user: User) => user.role)
  users!: User[];
}