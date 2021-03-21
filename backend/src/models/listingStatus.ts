import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Listing } from ".";

@Entity({name: 'status_oglasa'})
export class ListingStatus {
    @PrimaryGeneratedColumn({name: 'sif_status'})
    id!: number;

    @Column({name: 'naziv_status'})
    status!: string;

    @OneToMany(() => Listing, (listing) => listing.status)
    listings!: Listing[];
}