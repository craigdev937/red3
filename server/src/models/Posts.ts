import { Column, Entity, Index, JoinColumn, ManyToOne } from "typeorm";
import { Users } from "./Users";
import { AbEntity } from "./AbEntity";

@Entity({name: "posts"})
export class Posts extends AbEntity {
    constructor(posts: Partial<Posts>) {
        super();
        Object.assign(this, posts);
    };

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
};







