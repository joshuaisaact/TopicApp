const baseUrl = "http://localhost:3000";

export const fetchTopics = async () => {
  try {
    const response = await fetch(`${baseUrl}/topics`);
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching data", error);
    throw error;
  }
};


export const addTopic = async (text) => {
  try {
    const response = await fetch(`${baseUrl}/topics`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({title:text}),
    });

    if (!response.ok) {
      const errorData = await response.json();
      console.error('Failed to add topic:', errorData);
      alert(`Failed to add topic: ${errorData.error}`);
      throw error;
    }

    const newTopic = await response.json();
    return newTopic;

  } catch (error) {
    console.error('Error:', error);
    alert('An error occurred while adding the topic');
    throw error;
  }
}

export const deleteTopic = async (id) => {
  try {
    const response = await fetch(`${baseUrl}/topics/${id}`, {
      method: 'DELETE'
    })
    if (!response.ok) {
      const errorData = await response.json();
      console.error('Failed to delete topic:', errorData);
      alert(`Failed to delete topic: ${errorData.error}`);
    }
  } catch (error) {
    console.error('Error:', error);
    alert('An error occurred while deleting the topic');
    throw error;
  }
}

export const upVoteTopic = async (id) => {
  try {
    const response = await fetch(`${baseUrl}/topics/${id}/up`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      }
    })
    if (!response.ok) {
      const errorData = await response.json();
      console.error('Failed to up vote topic:', errorData);
      alert(`Failed to up vote topic: ${errorData.error}`);
    }

    const updatedTopic = await response.json();
    return updatedTopic;

  } catch (error) {
    console.error('Error:', error);
    alert('An error occurred while up voting the topic');
    throw error;
  }
}

export const downVoteTopic = async (id) => {
  try {
    const response = await fetch(`${baseUrl}/topics/${id}/down`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      }
    })
    if (!response.ok) {
      const errorData = await response.json();
      console.error('Failed to up vote topic:', errorData);
      alert(`Failed to up vote topic: ${errorData.error}`);
    }

    const updatedTopic = await response.json();
    return updatedTopic;

  } catch (error) {
    console.error('Error:', error);
    alert('An error occurred while up voting the topic');
    throw error;
  }
}