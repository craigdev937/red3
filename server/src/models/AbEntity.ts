import { classToPlain, Exclude } from "class-transformer";
import { BaseEntity, CreateDateColumn, PrimaryGeneratedColumn, 
    UpdateDateColumn } from "typeorm";

export abstract class AbEntity extends BaseEntity {
    @Exclude()
    @PrimaryGeneratedColumn() id: number;

    @CreateDateColumn() createdAt: Date;
    @UpdateDateColumn() updatedAt: Date;

    toJSON() {
        return classToPlain(this);
    };
};





