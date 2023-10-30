
// First, check the namespace of the model. In this case, the namespace is App\Models.

// Then, create a new file named term.entity.ts.

// Inside the file, write the following code.

import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Term {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    description: string;

    @Column()
    description_arb: string;

}