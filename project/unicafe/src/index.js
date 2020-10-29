import React, { useState } from "react";
import ReactDOM from "react-dom";

const Button = ({text, action}) => {
    return <button onClick={action}>{text}</button>
};

const Feedback = (params) => {
    return <div>
        <h1>give feedback</h1>
        <Button text="good" action={params.setGood} />
        <span> </span>
        <Button text="neutral" action={params.setNeutral} />
        <span> </span>
        <Button text="bad" action={params.setBad} />
        </div>
};

const Statistics = (params) => {

    const sum = (params.good + params.neutral + params.bad)
    const average = (params.good - params.bad) / sum
    const positive = params.good / sum * 100

    if (sum === 0)
        return <div>
                <h1>statistics</h1>
                <p>No feedback given</p>
            </div>

    return <div>
        <h1>statistics</h1>
        <table>
            <tbody>
                <tr>
                    <td>good</td><td>{params.good}</td>
                </tr>
                <tr>
                    <td>neutral</td><td>{params.neutral}</td>
                </tr>
                <tr>
                    <td>bad</td><td>{params.bad}</td>
                </tr>
                <tr>
                    <td>average</td><td>{average}</td>
                </tr>
                <tr>
                    <td>positive</td><td>{positive}</td>
                </tr>
            </tbody>
        </table>
    </div>
};

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);

  return <div>
      <Feedback setGood={() => setGood(good + 1)} setNeutral={() => setNeutral(neutral + 1)} setBad={() => setBad(bad + 1)} />
      {/* <Feedback setGood={() => setGood(good + 1)}   /> */}
      <Statistics good={good} neutral={neutral} bad={bad}/>
  </div>;
};

ReactDOM.render(<App />, document.getElementById("root"));
