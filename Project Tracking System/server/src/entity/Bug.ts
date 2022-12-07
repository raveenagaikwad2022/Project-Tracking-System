import {
  PrimaryGeneratedColumn,
  CreateDateColumn,
  Entity,
  BaseEntity,
  Column,
  ManyToOne,
  JoinColumn,
} from "typeorm";
import { Project } from "./Project";
import { User } from "./User";

type Priority = "low" | "medium" | "high";

@Entity({ name: "bugs" })
export class Bug extends BaseEntity {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column({ type: "varchar", length: 60 })
  title: string;

  @Column()
  description: string;

  @Column({
    type: "enum",
    enum: ["low", "medium", "high"],
    default: "low",
  })
  priority: Priority;

  @ManyToOne(() => Project, (project) => project)
  @JoinColumn({ name: "projectId" })//FK projectid column
  project: Project;
  @Column()
  projectId: string;

  @Column({ default: false })
  isResolved: boolean;

  @ManyToOne(() => User, (user) => user)
  @JoinColumn({ name: "closedById" })//FK closedById column
  closedBy: User;
  @Column({ type: "text", nullable: true })
  closedById: string | null;

  @Column({ type: "timestamp", nullable: true })
  closedAt: Date | null;

  @ManyToOne(() => User, (user) => user)
  @JoinColumn({ name: "reopenedById" })//FK openedById column
  reopenedBy: User;
  @Column({ type: "text", nullable: true })
  reopenedById: string | null;

  @Column({ type: "timestamp", nullable: true })
  reopenedAt: Date | null;

  @ManyToOne(() => User, (user) => user)
  @JoinColumn({ name: "createdById" }) //FK openedById column
  createdBy: User;
  @Column()
  createdById: string;

  @CreateDateColumn()
  createdAt: Date;

  @ManyToOne(() => User, (user) => user)
  @JoinColumn({ name: "updatedById" }) //FK updatedById column
  updatedBy: User;
  @Column({ nullable: true })
  updatedById: string;

  @Column({ nullable: true })
  updatedAt: Date;
}
