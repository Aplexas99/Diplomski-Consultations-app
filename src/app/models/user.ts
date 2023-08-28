import { Role } from "./role";

export class User {
    private _id?: number;
    public get id(): number | undefined {
        return this._id;
    }
    public set id(value: number | undefined) {
        this._id = value;
    }

    private _name?: string;
    public get name(): string | undefined {
        return this._name;
    }
    public set name(value: string | undefined) {
        this._name = value;
    }

    private _lastName?: string;
    public get lastName(): string | undefined {
        return this._lastName;
    }
    public set lastName(value: string | undefined) {
        this._lastName = value;
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
  
    constructor(data? : {
        id?: number,
        name?: string,
        lastName?: string,
        last_name?: string,
        email?: string,
        role?: Role,
    } | User) {
        if(data) {
            if(data.id) {
                this.id = data.id;
            }
            if(data.name) {
                this.name = data.name;
            }
            if(data.lastName) {
                this.lastName = data.lastName;
            }
            if(data.email) {
                this.email = data.email;
            }
            if(data.role) {
                this._role = new Role(data.role);
            }
            if(!(data instanceof User)) {
                if(data.last_name) {
                    this.lastName = data.last_name;
                }
            }
        }
    }
}
