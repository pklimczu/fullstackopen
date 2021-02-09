import React from 'react';
import { CourseParts } from '../utils/types';
import Part from './Part';

const Content: React.FC<CourseParts> = ({ courseParts }) => {

    return (
        <div>
            {courseParts.map(course => <Part key={course.name} coursePart={course} />)}
        </div>
    )
}

export default Content;