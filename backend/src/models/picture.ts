import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
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

    @Column({name: 'sif_oglas', nullable: true})
    listingId?: number;

    @ManyToOne(() => Listing, (listing) => listing.pictures)
    @JoinColumn({ name: 'sif_oglas'})
    listing?: Listing;
}