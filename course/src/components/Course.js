import React from "react"
import Header from "./Header"
import Content from "./Content"
import Footer from "./Footer"

const Course = ({course}) => {
    return <div>
        <Header title={course.name} />
        <Content parts={course.parts} />
        <Footer parts={course.parts} />
    </div>
}

export default Course