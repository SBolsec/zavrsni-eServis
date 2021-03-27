import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Listing } from ".";

@Entity({name: 'slika'})
export class Picture {
    @PrimaryGeneratedColumn({name: 'sif_slika'})
    id!: number;

    @Column({name: 'naziv_slika'})
    name!: string;

    @Column({name: 'cloudinary_id'})
    cloudinaryId!: string;

    @Column({name: 'url'})
    url!: string;

    @ManyToOne(() => Listing, (listing) => listing.pictures)
    listing?: Listing;
}