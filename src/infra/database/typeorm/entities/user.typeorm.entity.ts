// import {
//   Entity,
//   Column,
//   PrimaryGeneratedColumn,
//   CreateDateColumn,
//   UpdateDateColumn,
// } from 'typeorm';
// import { Role } from '@common/enums';

// @Entity({ name: 'agreements' })
// export class AgreementEntity {
//   @PrimaryGeneratedColumn('uuid')
//   id: string;

//   @Column({ unique: true, nullable: false })
//   email: string;

//   @Column({ unique: false, nullable: true })
//   password: string;

//   @Column({ unique: true, nullable: false })
//   username: string;

//   @Column({ unique: true, nullable: true })
//   name: string;

//   @Column({
//     type: 'enum',
//     enum: Role,
//   })
//   roles: Role[];

//   @CreateDateColumn({
//     type: 'timestamp',
//     default: () => 'CURRENT_TIMESTAMP(6)',
//   })
//   public createdAt: Date;

//   @UpdateDateColumn({
//     type: 'timestamp',
//     default: () => 'CURRENT_TIMESTAMP(6)',
//     onUpdate: 'CURRENT_TIMESTAMP(6)',
//   })
//   public updatedAt: Date;
// }
