interface CoursePartBase {
    name: string;
    exerciseCount: number;
}
 
interface CoursePartBaseExtended extends CoursePartBase {
    description: string;
}

interface CoursePartOne extends CoursePartBaseExtended {
    name: "Fundamentals";
}

interface CoursePartTwo extends CoursePartBase {
    name: "Using props to pass data";
    groupProjectCount: number;
}

interface CoursePartThree extends CoursePartBaseExtended {
    name: "Deeper type usage";
    exerciseSubmissionLink: string;
}

interface CoursePartMyself extends CoursePartBaseExtended {
    name: "Extended";
}

export type CoursePart = CoursePartOne | CoursePartTwo | CoursePartThree | CoursePartMyself;

export interface CourseParts {
    courseParts: Array<CoursePart>
}