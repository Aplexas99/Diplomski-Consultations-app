import { Professor } from "./professor";

export class Course {
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

    private _professors?: Professor[];
    public get professors(): Professor[] | undefined {
        return this._professors;
    }
    public set professors(value: Professor[] | undefined) {
        this._professors = value;
    }

    constructor(data? : {
        id?: number,
        name?: string,
        professors: Professor[],
    } | Course) {
        if(data) {
            if(data.id) {
                this.id = data.id;
            }
            if(data.name) {
                this.name = data.name;
            }
            if(data.professors) {
                this.professors = data.professors.map(professor => new Professor(professor));
            }
    }
    }
}