import React from 'react';
import { CoursePart } from '../utils/types';

const Total: React.FC<{ coursePart: CoursePart }> = ({ coursePart }) => {

    /**
     * Helper function for exhaustive type checking
     */
    const assertNever = (value: never): never => {
        throw new Error(
        `Unhandled discriminated union member: ${JSON.stringify(value)}`
        );
    };

    let content = ""

    switch (coursePart.name) {
        case "Fundamentals":
            content = `${coursePart.description} ${coursePart.exerciseCount}`
            break;
        case "Using props to pass data":
            content = `${coursePart.groupProjectCount} ${coursePart.exerciseCount}`
            break;
        case "Deeper type usage":
            content = `${coursePart.description} ${coursePart.exerciseCount} ${coursePart.exerciseSubmissionLink}`
            break;
        case "Extended":
            content = `${coursePart.description} ${coursePart.exerciseCount}`
            break;
        default:
            assertNever(coursePart)
    }

    return <div>{content}<hr/></div>
}

export default Total;