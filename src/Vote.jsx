import { useState } from "react";
import { upVoteTopic, downVoteTopic } from "./services";

function Vote({ score,  onUpVote, onDownVote}) {



  return (
    <div className="flex flex-col items-center justify-center p-5">
      <button onClick={onUpVote}>⬆️</button>
      <h1>{score}</h1>
      <button onClick={onDownVote}>⬇️</button>
    </div>
  );
}

export default Vote;
