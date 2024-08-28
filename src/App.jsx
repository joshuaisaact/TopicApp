import "./App.css";
import CreateTopic from "./CreateTopic";
import Topic from "./topic";

function App() {
  return (
    <>
      <CreateTopic />
      <ul>
        <li>
          <Topic />
        </li>
      </ul>
    </>
  );
}

export default App;
