import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { FaultCategory, ListingStatus, Offer, Person, Picture } from ".";

@Entity({name: 'oglas'})
export class Listing {
    @PrimaryGeneratedColumn({name: 'sif_oglas'})
    id!: number;

    @Column({name: 'naslov'})
    title!: string;

    @Column({name: 'opis'})
    description!: string;

    @CreateDateColumn({name: 'trenutak_stvaranja', type: 'timestamp without time zone'})
    createdAt!: Date;

    @UpdateDateColumn({name: 'trenutak_promjene', type: 'timestamp without time zone'})
    updatedAt!: Date;

    @Column({name: 'sif_status', default: 0})
    statusId!: number;

    @ManyToOne(() => ListingStatus, (listingStatus) => listingStatus.listings)
    @JoinColumn({name: 'sif_status'})
    status!: ListingStatus;

    @Column({name: 'sif_osoba'})
    personId!: number;

    @ManyToOne(() => Person, (person) => person.listings)
    @JoinColumn({name: 'sif_osoba'})
    person!: Person;

    @OneToMany(() => Picture, (picture) => picture.listing)
    pictures!: Picture[];

    @Column({name: 'sif_kategorija_kvara'})
    faultCategoryId!: number;

    @ManyToOne(() => FaultCategory, (categ) => categ.listings)
    @JoinColumn({name: 'sif_kategorija_kvara'})
    faultCategory!: FaultCategory;

    @OneToMany(() => Offer, (offer) => offer.listing)
    offers!: Offer[];
}