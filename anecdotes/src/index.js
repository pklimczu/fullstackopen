import React, { useState } from "react";
import ReactDOM from "react-dom";

const Button = ({text, action}) => {
    return <button onClick={action}>{text}</button>
}

const TopRated = ({rates}) => {
    let index = -1
    let max = -1
    for (let i = 0; i < rates.length; i++) {
        if (rates[i] > max) {
            max = rates[i]
            index = i
        }
    }

    return <div>
        <h3>Anecdote with most votes</h3>
        {anecdotes[index]}<br/>
        has {max} votes
    </div>
}

const App = (props) => {
  const [selected, setSelected] = useState(0);
  const [rates, setRates] = useState(Array(anecdotes.length).fill(0))

  const setRandomAnecdote = () => {
      const option = Math.floor(Math.random() * anecdotes.length)
      setSelected(option)
  }

  const voteForCurrentAnecdote = () => {
      rates[selected] += 1
      setRates([...rates])
  }

  return <div>
      <h3>Anecdote of the day</h3>
      {props.anecdotes[selected]}<br />
      has {rates[selected]} votes
      <br/>
      <Button text="vote" action={() => voteForCurrentAnecdote()} />
      <span> </span>
      <Button text="next anecdote" action={() => setRandomAnecdote()} />
      <TopRated rates={rates} />
  </div>;
};

const anecdotes = [
  "If it hurts, do it more often",
  "Adding manpower to a late software project makes it later!",
  "The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.",
  "Any fool can write code that a computer can understand. Good programmers write code that humans can understand.",
  "Premature optimization is the root of all evil.",
  "Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.",
];

ReactDOM.render(<App anecdotes={anecdotes} />, document.getElementById("root"));
