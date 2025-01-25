import { Entity } from '@src/core/domain/Entity';
import { Replace } from '@core/logic/Replace';
import { Exclude, Expose } from 'class-transformer';
import { Role } from '@common/enums';

export type UserProps = {
  email: string;
  username: string;
  password?: string;
  name?: string;
  role: Role;
  createdAt: Date;
  updatedAt: Date;
};

export class UserEntity extends Entity<UserProps> {
  set password(password: string) {
    this.props.password = password;
  }

  @Expose()
  get email() {
    return this.props.email;
  }

  @Expose()
  get username() {
    return this.props.username;
  }

  @Exclude()
  get password() {
    return this.props.password;
  }

  @Expose()
  get name() {
    return this.props.name;
  }

  @Exclude()
  get role() {
    return this.props.role;
  }

  @Exclude()
  get createdAt() {
    return this.props.createdAt;
  }

  @Exclude()
  get updatedAt() {
    return this.props.updatedAt;
  }

  static create(
    props: Replace<
      UserProps,
      {
        createdAt: Date;
        updatedAt: Date;
      }
    >,
    id?: string
  ) {
    const user = new UserEntity(
      {
        ...props,
        createdAt: props.createdAt ?? new Date(),
        updatedAt: props.updatedAt ?? new Date(),
      },
      id
    );

    return user;
  }
}
