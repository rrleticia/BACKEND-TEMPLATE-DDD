import { createId } from '@paralleldrive/cuid2';
import { Exclude, Expose } from 'class-transformer';

export abstract class Entity<T> {
  @Exclude()
  protected readonly _id: string;
  @Exclude()
  public readonly props: T;

  @Expose()
  get id() {
    return this._id;
  }

  constructor(props: T, id?: string) {
    this._id = id || createId();
    this.props = props;
  }

  public equals(object?: Entity<T>): boolean {
    if (object === null || object === undefined) {
      return false;
    }

    if (this === object) {
      return true;
    }

    if (!(object instanceof Entity)) {
      return false;
    }

    return this._id === object._id;
  }
}
