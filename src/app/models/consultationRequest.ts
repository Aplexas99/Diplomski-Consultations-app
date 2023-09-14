import { Course } from "./course";
import { Professor } from "./professor";
import { Schedule } from "./schedule";
import { Student } from "./student";


export class ConsultationRequest {
    private _id?: number;
    public get id(): number | undefined {
        return this._id;
    }
    public set id(value: number | undefined) {
        this._id = value;
    }

    private _student: Student | undefined;
    public get student(): Student | undefined {
        return this._student;
    }
    public set student(value: Student | undefined) {
        this._student = value;
    }

    private _professor: Professor | undefined;
    public get professor(): Professor | undefined {
        return this._professor;
    }
    public set professor(value: Professor | undefined) {
        this._professor = value;
    }

    private _schedule: Schedule | undefined;
    public get schedule(): Schedule | undefined {
        return this._schedule;
    }
    public set schedule(value: Schedule | undefined) {
        this._schedule = value;
    }

    private _status: string | undefined;
    public get status(): string | undefined {
        return this._status;
    }
    public set status(value: string | undefined) {
        this._status = value;
    }

    private _reason: string | undefined;
    public get reason(): string | undefined {
        return this._reason;
    }
    public set reason(value: string | undefined) {
        this._reason = value;
    }

    private _startTime: string | undefined;
    public get startTime(): string | undefined {
        return this._startTime;
    }
    public set startTime(value: string | undefined) {
        this._startTime = value;
    }

    private _endTime: string | undefined;
    public get endTime(): string | undefined {
        return this._endTime;
    }
    public set endTime(value: string | undefined) {
        this._endTime = value;
    }

    private _type: string | undefined;
    public get type(): string | undefined {
        return this._type;
    }
    public set type(value: string | undefined) {
        this._type = value;
    }

    private _note: string | undefined;
    public get note(): string | undefined {
        return this._note;
    }
    public set note(value: string | undefined) {
        this._note = value;
    }

    private _location: string | undefined = "";
    public get location(): string | undefined {
        return this._location;
    }
    public set location(value: string | undefined) {
        this._location = value;
    }

    private _link: string | undefined;
    public get link(): string | undefined {
        return this._link;
    }
    public set link(value: string | undefined) {
        this._link = value;
    }

    constructor(data?: {
        id?: number,
        student?: any,
        professor?: any,
        schedule?: any,
        status?: string,
        reason?: string,
        startTime?: string,
        start_time?: string,
        endTime?: string,
        end_time?: string,
        type?: string,
        note?: string,
        location?: string,
        link?: string,
    } | ConsultationRequest) {
        if (data) {
            if (data.id) {
                this.id = data.id;
            }
            if (data.student) {
                this.student = new Student(data.student);
            }
            if (data.professor) {
                this.professor = new Professor(data.professor);
            }
            if (data.schedule) {
                this.schedule = new Schedule(data.schedule);
            }
            if (data.status) {
                this.status = data.status;
            }
            if (data.reason) {
                this.reason = data.reason;
            }
            if (data.startTime) {
                this.startTime = data.startTime;
            }
            if (data.endTime) {
                this.endTime = data.endTime;
            }
            if (data.type) {
                this.type = data.type;
            }
            if (data.note) {
                this.note = data.note;
            }
            if (data.location) {
                this.location = data.location;
            }
            if (data.link) {
                this.link = data.link;
            }
            if(!(data instanceof ConsultationRequest)) {
                if (data.start_time) {
                    this.startTime = data.start_time;
                }
                if (data.end_time) {
                    this.endTime = data.end_time;
                }
            }
        }
    }
}