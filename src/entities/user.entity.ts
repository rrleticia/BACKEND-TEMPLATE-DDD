import { Entity } from '@src/core/domain/Entity';
import { Replace } from '@core/logic/Replace';

export type UserProps = {
  email: string;
  username: string;
  name?: string;
  createdAt: Date;
  updatedAt: Date;
};

export class User extends Entity<UserProps> {
  get email() {
    return this.props.email;
  }

  get username() {
    return this.props.username;
  }

  get name() {
    return this.props.name;
  }

  get createdAt() {
    return this.props.createdAt;
  }

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
    const user = new User(
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
