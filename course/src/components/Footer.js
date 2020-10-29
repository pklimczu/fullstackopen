import React from "react"

const Footer = ({parts}) => {
    const totalSum = parts.reduce((prev, curr) =>
    {
        return prev + curr.exercises
    }, 0)

  return <b>total of exercises {totalSum}</b>;
};

export default Footer
