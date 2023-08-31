import { Course } from "./course";
import { Student } from "./student";


export class CourseStudent {
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

    private _course: Course | undefined;
    public get course(): Course | undefined {
        return this._course;
    }
    public set course(value: Course | undefined) {
        this._course = value;
    }
    

    constructor(data? : {
        id?: number,
        student?: Student,
        course?: Course
    } | CourseStudent) {
        if(data) {
            if(data.id) {
                this.id = data.id;
            }
            if(data.student) {
                this.student = new Student(data.student);
            }
            if(data.course) {
                this.course = new Course(data.course);
            }
    }
    }
}