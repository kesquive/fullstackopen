import { useDispatch, useSelector } from "react-redux";
import { voteAnecdote } from "../reducers/anecdoteReducer";
import {
  showNotification,
  hideNotification,
} from "../reducers/notificationReducer";

const Anecdote = ({ anecdote, handleClick }) => {
  return (
    <div>
      <div>{anecdote.content}</div>
      <div>
        has {anecdote.votes}
        <button onClick={handleClick}>vote</button>
      </div>
    </div>
  );
};

const AnecdoteList = (props) => {
  const anecdotes = useSelector(({ filter, anecdotes }) => {
    if (filter === null) {
      return anecdotes.slice().sort((a, b) => b.votes - a.votes);
    } else {
      return anecdotes
        .filter((anecdote) => anecdote.content.includes(filter))
        .sort((a, b) => b.votes - a.votes);
    }
  });
  const dispatch = useDispatch();

  const handleVote = (id) => {
    dispatch(voteAnecdote(id));

    const votedAnecdote = anecdotes.find((anecdote) => anecdote.id === id);
    dispatch(showNotification(`You voted "${votedAnecdote.content}"`));

    setTimeout(() => {
      dispatch(hideNotification());
    }, 5000);
  };

  return (
    <div>
      {anecdotes.map((anecdote) => (
        <Anecdote
          key={anecdote.id}
          anecdote={anecdote}
          handleClick={() => handleVote(anecdote.id)}
        />
      ))}
    </div>
  );
};

export default AnecdoteList;
