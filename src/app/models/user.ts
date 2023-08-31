import { Role } from "./role";

export class User {
  private _id?: number;
	public get id(): number | undefined {
		return this._id;
	}
	public set id(value: number | undefined) {
		this._id = value;
	}

  private _username?: string;
  public get username(): string | undefined {
    return this._username;
  }
  public set username(value: string | undefined) {
    this._username = value;
  }

  private _firstName?: string;
	public get firstName(): string | undefined {
		return this._firstName;
	}
	public set firstName(value: string | undefined) {
		this._firstName = value;
	}

  private _lastName?: string;
  public get lastName(): string | undefined {
    return this._lastName;
  }
  public set lastName(value: string | undefined) {
    this._lastName = value;
  }

  public get fullName(): string {
    let fullName: string = '';
    if(this.firstName) {
      fullName += this.firstName;
      if(this.lastName) {
        fullName += ' ';
      }
    }
    if(this.lastName) {
      fullName += this.lastName;
    }
    return fullName;
  }

  private _name?: string;
  public get name(): string | undefined {
    return this._firstName + ' ' + this._lastName;
  }
  public set name(value: string | undefined) {
    this._name = value;
  }

  private _email?: string;
	public get email(): string | undefined {
		return this._email;
	}
	public set email(value: string | undefined) {
		this._email = value;
	}
  private _role?: Role;
  public get role(): Role | undefined {
    return this._role;
  }
  public set role(value: Role | undefined) {
    this._role = value;
  }

  private _isActive?: boolean;
  public get isActive(): boolean | undefined {
    return this._isActive;
  }
  public set isActive(value: boolean | undefined) {
    this._isActive = value;
  }

  // Added id to the constructor
  constructor(data?: {
    id?: number,
    username?: string,
    first_name?: string,
    firstName?: string,
    last_name?: string,
    lastName?: string,
    name?: string,
    email?: string
    role?: any
    is_active?: boolean,
    isActive?: boolean,
  } | User) {
    if(data?.id){
      this.id = data.id;
    }
    if(data?.username){
      this.username = data.username;
    }
    if(data?.firstName){
      this.firstName = data.firstName;
    }
    if(data?.lastName){
      this.lastName = data.lastName;
    }
    if(data?.email){
      this.email = data.email;
    }
    if(data?.role){
      this.role = new Role(data.role);
    }
    if(data?.isActive){
      this.isActive = data.isActive;
    }
    if(!(data instanceof User)) {
      if(data?.first_name){
        this.firstName = data.first_name;
      }
      if(data?.last_name){
        this.lastName = data.last_name;
      }
      if(data?.is_active){
        this.isActive = data.is_active;
      }
    }
  }
}