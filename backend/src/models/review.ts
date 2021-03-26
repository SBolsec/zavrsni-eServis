import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { Person, Service } from ".";

@Entity({name: 'recenzija'})
export class Review {
    @PrimaryGeneratedColumn({name: 'sif_recenzija'})
    id!: number;

    @Column({name: 'sadrzaj'})
    content!: string;

    @Column({name: 'ocjena'})
    score!: number;

    @CreateDateColumn({name: 'trenutak_stvaranja', type: 'time without time zone'})
    createdAt!: Date;

    @UpdateDateColumn({name: 'trenutak_promjene', type: 'time without time zone'})
    updatedAt!: Date;

    @Column({name: 'sif_osoba'})
    authorId!: number;

    @ManyToOne(() => Person, (person) => person.reviews)
    @JoinColumn({name: 'sif_osoba'})
    author!: Person;

    @Column({name: 'sif_servis'})
    serviceId!: number;

    @ManyToOne(() => Service, (service) => service.reviews)
    @JoinColumn({name: 'sif_servis'})
    service!: Service;
}