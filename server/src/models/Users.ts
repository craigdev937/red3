import bcrypt from "bcrypt";
import { IsEmail, Length } from "class-validator";
import { Exclude } from "class-transformer"
import { AbEntity } from "./AbEntity";
import { BeforeInsert, Column, Entity, Index } from "typeorm";

@Entity({name: "users"})
export class Users extends AbEntity {
    @Index()
    @IsEmail()
    @Column({ unique: true }) email: string;

    @Index()
    @Length(3, 255, { message: "Must be at least 3" })
    @Column({ unique: true }) username: string;

    @Exclude()
    @Length(6, 255)
    @Column() password: string;

    @BeforeInsert()
    async hashPassword(): Promise<void> {
        this.password = await bcrypt.hash(this.password, 10);
    };
};





