export class Role{
    private _id?: number;
    public get id(): number | undefined {
        return this._id;
    }
    public set id(value: number | undefined) {
        this._id = value;
    }
    private _role?: string;
    public get role(): string | undefined {
        return this._role;
    }
    public set role(value: string | undefined) {
        this._role = value;
    }


    constructor(data?: {
        id?: number,
        role?: string
    } | Role) {
        if(!(data instanceof Role)) {
            if(data?.id)
                this.id = data.id;
            if(data?.role)
                this.role = data.role;
        }
    }
}