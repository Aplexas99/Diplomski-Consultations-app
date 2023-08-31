import { Course } from "./course";
import { User } from "./user";

export class Professor {
  
    private _id: number | undefined;
    public get id(): number | undefined {
        return this._id;
    }
    public set id(value: number) {
        this._id = value;
    }

    private _user: User | undefined;
    public get user(): User | undefined {
        return this._user;
    }
    public set user(value: User) {
        this._user = value;
    }

    private _courses: Course[] | undefined;
    public get courses(): Course[] | undefined {
        return this._courses;
    }
    public set courses(value: Course[]) {
        this._courses = value;
    }
    constructor(data? : {
        id: number,
        user: User,
        courses: Course[],
    } | Professor) {
        if (data) {
            if(data.id){
                this.id = data.id;
            }
            if(data.user){
                this.user = new User(data.user);
            }
            if(data.courses){
                this.courses = data.courses.map(item => new Course(item));
            }
        }
    }
}
