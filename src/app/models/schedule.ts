import { Professor } from "./professor";

export class Schedule {
    private _id?: number;
    public get id(): number | undefined {
        return this._id;
    }
    public set id(value: number | undefined) {
        this._id = value;
    }
    private _professor?: Professor;
    public get professor(): Professor | undefined {
        return this._professor;
    }
    public set professor(value: Professor | undefined) {
        this._professor = value;
    }

    private _date?: Date;
    public get date(): Date | undefined {
        return this._date;
    }
    public set date(value: Date | undefined) {
        this._date = value;
    }


    constructor(data?: {
        id?: number,
        professor?: Professor,
        date?: Date,
    } | Schedule) {
        if (data) {
            if (data.id) {
                this.id = data.id;
            }
            if (data.professor) {
                this.professor = new Professor(data.professor);
            }
            if (data.date) {
                this.date = data.date;
            }
        }
    }
}