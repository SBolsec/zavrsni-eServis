import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Offer } from ".";

@Entity({name: 'status_ponude'})
export class OfferStatus {
    @PrimaryGeneratedColumn({name: 'sif_status'})
    id!: number;

    @Column({name: 'naziv_status'})
    status!: string;

    @OneToMany(() => Offer, (offer) => offer.status)
    offers!: Offer[];
}