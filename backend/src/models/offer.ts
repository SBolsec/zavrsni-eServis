import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { Listing, OfferStatus, Service } from ".";

@Entity({name: 'ponuda'})
export class Offer {
    @PrimaryGeneratedColumn({name: 'sif_ponuda'})
    id!: number;

    @Column({name: 'naslov'})
    title!: string;

    @Column({name: 'opis'})
    description!: string;

    @Column({name: 'cijena', type: 'decimal'})
    price!: number;

    @Column({name: 'sif_servis'})
    serviceId!: number;

    @ManyToOne(() => Service, (service) => service.offers)
    @JoinColumn({name: 'sif_servis'})
    service!: Service;

    @CreateDateColumn({name: 'trenutak_stvaranja', type: 'timestamp without time zone'})
    createdAt!: Date;

    @UpdateDateColumn({name: 'trenutak_promjene', type: 'timestamp without time zone'})
    updatedAt!: Date;

    @Column({name: 'sif_status', default: 1})
    statusId!: number;

    @ManyToOne(() => OfferStatus, (status) => status.offers)
    @JoinColumn({name: 'sif_status'})
    status!: OfferStatus;

    @Column({name: 'sif_oglas'})
    listingId!: number;

    @ManyToOne(() => Listing, (listing) => listing.offers)
    @JoinColumn({name: 'sif_oglas'})
    listing!: Listing;
}