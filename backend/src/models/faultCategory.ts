import { Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Listing, Service } from ".";

@Entity({name: 'kategorija_kvara'})
export class FaultCategory {
    @PrimaryGeneratedColumn({name: 'sif_kategorija_kvara'})
    id!: number;

    @Column({name: 'naziv_kategorija_kvara'})
    name!: string;

    @Column({name: 'sif_roditelj'})
    parentId?: number;

    @ManyToOne(() => FaultCategory, (categ) => categ.children)
    @JoinColumn({name: 'sif_roditelj'})
    parent?: FaultCategory;

    @OneToMany(() => FaultCategory, (categ) => categ.parent)
    children?: FaultCategory[];

    @OneToMany(() => Listing, (listing) => listing.faultCategory)
    listings?: Listing[];
}