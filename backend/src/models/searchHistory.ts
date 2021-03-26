import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { Service } from ".";

@Entity({name: 'povijest_pretrage'})
export class SearchHistory {
    @PrimaryGeneratedColumn({name: 'sif_povijest'})
    id!: number;

    @Column({name: 'kljucna_rijec'})
    keyWord!: string;

    @Column({name: 'bodovi'})
    points!: number;

    @CreateDateColumn({name: 'trenutak_stvaranja', type: 'timestamp without time zone'})
    createdAt!: Date;

    @UpdateDateColumn({name: 'trenutak_promjene', type: 'timestamp without time zone'})
    updatedAt!: Date;

    @Column({name: 'sif_servis'})
    serviceId!: number;

    @ManyToOne(() => Service, (service) => service.searchHistory)
    @JoinColumn({name: 'sif_servis'})
    service!: Service;
}