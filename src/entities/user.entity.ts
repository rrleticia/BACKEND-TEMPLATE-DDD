import { Entity } from '@src/core/domain/Entity';
import { Exclude, Expose } from 'class-transformer';
import { Role } from '@common/enums';

export type UserProps = {
  email: string;
  username: string;
  password?: string;
  name?: string;
  roles: Role[];
  createdAt: Date;
  updatedAt: Date;
};

export class UserEntity extends Entity<UserProps> {
  set password(password: string) {
    this.props.password = password;
  }

  @Expose()
  get email(): string {
    return this.props.email;
  }

  @Expose()
  get username(): string {
    return this.props.username;
  }

  @Exclude()
  get password(): string {
    return this.props.password;
  }

  @Expose()
  get name(): string {
    return this.props.name;
  }

  @Expose()
  get roles(): Role[] {
    return this.props.roles;
  }

  @Exclude()
  get createdAt(): Date {
    return this.props.createdAt;
  }

  @Exclude()
  get updatedAt(): Date {
    return this.props.updatedAt;
  }

  static create(props: UserProps, id?: string) {
    const user = new UserEntity(
      {
        ...props,
        createdAt: props.createdAt,
        updatedAt: props.updatedAt,
      },
      id
    );

    return user;
  }
}
