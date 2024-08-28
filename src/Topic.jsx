import { useEffect, useState } from "react";
import { fetchTopics, deleteTopic, upVoteTopic, downVoteTopic } from "./services";
import Vote from "./Vote";

function Topic() {
  const [topics, setTopics] = useState([]);
  const [score, setScore] = useState(0);

  useEffect(() => {
    console.log('hello')
    const loadTopics = async () => {
      try {
        const data = await fetchTopics();
        setTopics(data);
      } catch (error) {
        console.error("Error loading topics:", error);
      }
    };

    loadTopics();
  }, []);

  const handleDelete = async (id) => {
    try {
      await deleteTopic(id);
      setTopics(topics.filter((topic) => topic._id !== id));
    } catch (error) {
      console.error('Error deleting topic:', error)
    }
  }

  const handleUpVote = async (id) => {
    try {
      const updatedTopic = await upVoteTopic(id);
      setTopics(topics.map(topic=> topic._id === id ? updatedTopic : topic))
    } catch (error) {
      console.error('Error updating topic:', error);
    }
  }

  const handleDownVote = async (id) => {
    try {
      const updatedTopic = await downVoteTopic(id);
      setTopics(topics.map(topic=> topic._id === id ? updatedTopic : topic))
    } catch (error) {
      console.error('Error updating topic:', error);
    }
  }

  return (
    <ul className="">
      {topics
      .sort((a,b) => b.score - a.score)
      .map((topic, index) => {
        return (
          <li
            key={index}
            className="mt-5 flex items-stretch justify-center bg-white text-black"
          >
            <Vote score={topic.score} onDownVote={() => handleDownVote(topic._id)} onUpVote={() => handleUpVote(topic._id)} />
            <div className="flex flex-grow flex-col justify-center align-middle">
              <h1 className="m-2 pb-10">{topic.title}</h1>
              <p className="justify-center text-2xl font-bold text-gray-600">
                CREATED ON
              </p>
              <span>{formatDate(topic.published_at)}</span>
              <button className="text-white" onClick={() => handleDelete(topic._id)}>DELETE THIS TOPIC</button>
            </div>
          </li>
        );
      })
      }
    </ul>
  );

  function formatDate(utcDateString) {
    const date = new Date(utcDateString);
    const options = { day: "2-digit", month: "2-digit" };
    return date.toLocaleDateString("en-GB", options);
  }
}

export default Topic;
