import { compare, hash } from 'bcrypt';

export class User {
  private _password: string;

  constructor(
    private readonly _email: string,
    private readonly _firstName: string,
    private readonly _lastName: string,
    passwordHash?: string,
  ) {
    if (passwordHash) {
      this._password = passwordHash;
    }
  }

  get email(): string {
    return this._email;
  }

  get firstName(): string {
    return this._firstName;
  }

  get lastName(): string {
    return this._lastName;
  }

  get password(): string {
    return this._password;
  }

  public async setPassword(pass: string, salt: number): Promise<void> {
    this._password = await hash(pass, salt);
  }

  public async comparePassword(pass: string): Promise<boolean> {
    return await compare(pass, this._password);
  }
}