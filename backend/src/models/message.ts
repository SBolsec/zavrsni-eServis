import {Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, ManyToOne, JoinColumn} from 'typeorm';
import { User } from '.';

@Entity({name: "poruka"})
export class Message {
  @PrimaryGeneratedColumn({name: "sif_poruka"})
  id!: number;

  @Column({name: "sadrzaj"})
  content!: string;

  @Column({name: 'sif_posiljatelj'})
  senderId!: number;

  @Column({name: 'sif_primatelj'})
  receiverId!: number;
  
  @CreateDateColumn({name: 'trenutak_stvaranja', type: 'timestamp without time zone'})
  createdAt!: Date;

  @Column({name: 'dostavljena'})
  delivered!: boolean;

  @Column({name: 'procitana'})
  read!: boolean;

  @ManyToOne(() => User, (user) => user.messagesSent)
  @JoinColumn({name: 'sif_posiljatelj'})
  sender!: User;

  @ManyToOne(() => User, (user) => user.messagesReceived)
  @JoinColumn({name: 'sif_primatelj'})
  receiver!: User;
}