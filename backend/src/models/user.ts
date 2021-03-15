import {Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, JoinColumn, ManyToOne} from 'typeorm';
import { Role } from '.';


@Entity({name: "korisnik"})
export class User {
  @PrimaryGeneratedColumn({name: "sif_korisnik"})
  id!: number;

  @Column({name: "email"})
  email!: string;

  @Column({name: "lozinka"})
  password!: string;

  @Column({name: "sif_uloga"})
  roleId!: number;

  @ManyToOne((_type) => Role, (role: Role) => role.users, {cascade: true})
  @JoinColumn({name: "sif_uloga"})
  role!: Role;

  @Column({name: "verzija_tokena", default: 0})
  tokenVersion!: number;

  @CreateDateColumn({name: "trenutak_stvaranja", type: 'timestamp without time zone'})
  createdAt?: Date;

  @UpdateDateColumn({name: "trenutak_promjene", type: 'timestamp without time zone'})
  updatedAt?: Date;
}