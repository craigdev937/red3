import { BeforeInsert, Column, Entity, Index, 
    JoinColumn, ManyToOne } from "typeorm";
import { makeId } from "../global/helpers";
import { Users } from "./Users";
import { AbEntity } from "./AbEntity";

@Entity({name: "posts"})
export class Posts extends AbEntity {
    @Index()
    @Column() identifier: string;  // 7 Character ID.
    @Column() title: string;
    @Column() description: string;
    @Column() amount: number;
    @Column() status: boolean;
    @ManyToOne(() => Users, user => user.posts)
    @JoinColumn({
        name: "username", 
        referencedColumnName: "username"
    }) user: Users;
    @BeforeInsert()
    makeIdAndSlug() {
        this.identifier = makeId(7);
    };
};







