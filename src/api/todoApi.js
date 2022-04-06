// localhost
export const API_URL = "http://192.168.56.1:4000";

//ngrok
// export const API_URL = "http://cd50-46-193-4-162.ngrok.io";

const LOGIN =
  "mutation($username:String!, $password:String!){login(username:$username, password:$password)}";

export const login = (username, password) =>
  fetch(API_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      query: LOGIN,
      variables: {
        username: username,
        password: password,
      },
    }),
  })
    .then((response) => {
      return response.json();
    })
    .then((json) => {
      if (json.errors != null) {
        throw json.errors[0];
      }
      return json.data.login; // token
    })
    .catch((error) => {
      throw error;
    });

const REGISTER =
  "mutation($username:String!, $password:String!){register(username:$username, password:$password)}";

export const register = (username, password) =>
  fetch(API_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      query: REGISTER,
      variables: {
        username: username,
        password: password,
      },
    }),
  })
    .then((response) => {
      return response.json();
    })
    .then((json) => {
      if (json.errors != null) {
        throw json.errors[0];
      }
      return json.data.register; // token
    })
    .catch((error) => {
      throw error;
    });

const TASKLISTS = `
query taskLists($username: String!) {
    taskLists(where: { owner: { username: $username } }) {
      id
      title
    }
  }`;

export const getTaskLists = (username, token, setList) =>
  fetch(API_URL, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      query: TASKLISTS,
      variables: {
        username: username,
      },
    }),
  })
    .then((response) => {
      return response.json();
    })
    .then((json) => setList(json.data.taskLists))
    .catch((error) => {
      throw error;
    });

const TASKLIST_NAME = `
query taskLists($id: ID!) {
    taskLists(where: { id:$id }) {
      id
      title
    }
  }`;

export const getTaskListName = (id, token, setList) =>
  fetch(API_URL, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      query: TASKLIST_NAME,
      variables: {
        id: id,
      },
    }),
  })
    .then((response) => {
      return response.json();
    })
    .then((json) => setList(json.data.taskLists))
    .catch((error) => {
      throw error;
    });

const TASKS = `
    query tasks($id:ID!) {
      tasks(where:{belongsTo:{id:$id}}) {
        id
        content
        done
      }
    }
    `;

export const getTasks = (idTaskList, username, token, setTask) =>
  fetch(API_URL, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      query: TASKS,
      variables: {
        id: idTaskList,
        username: username,
      },
    }),
  })
    .then((response) => {
      return response.json();
    })
    .then((json) => setTask(json.data.tasks))
    .catch((error) => {
      throw error;
    });

const DELETE_TASK = `
mutation($id:ID!) {
  deleteTasks(where:{id:$id}) {
    nodesDeleted
    relationshipsDeleted
  }
}
`;

export const deleteTask = (idTask, username, token) =>
  fetch(API_URL, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      query: DELETE_TASK,
      variables: {
        id: idTask,
        username: username,
      },
    }),
  })
    .then((response) => {
      return response.json();
    })
    .catch((error) => {
      throw error;
    });

const DELETE_TASKLIST = `
mutation($id:ID!) {
  deleteTasks(where:{belongsTo:{id:$id}}) {
    nodesDeleted
    relationshipsDeleted
  }
  deleteTaskLists(where:{id:$id}) {
    nodesDeleted
    relationshipsDeleted
  }
}
`;

export const deleteTaskList = (idTaskList, username, token) =>
  fetch(API_URL, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      query: DELETE_TASKLIST,
      variables: {
        id: idTaskList,
        username: username,
      },
    }),
  })
    .then((response) => {
      return response.json();
    })
    .catch((error) => {
      throw error;
    });

const CREATE_TASK = `
mutation($content:String!, $id: ID!) {
  createTasks(input:{
    content: $content
    done: false
    belongsTo: {connect: {where: {id:$id}}}
  }) {
    tasks {
      id
      content
      done
    }
  }
}
`;

export const createTask = (content, idTaskList, token) =>
  fetch(API_URL, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      query: CREATE_TASK,
      variables: {
        content: content,
        id: idTaskList,
      },
    }),
  })
    .then((response) => {
      return response.json();
    })
    .catch((error) => {
      throw error;
    });

const CREATE_TASKLIST = `
mutation($title: String!, $username: String!) {
  createTaskLists(
    input: {
      title: $title
      owner: { connect: { where: { username: $username } } }
    }
  ) {
    taskLists {
      id
      title
      owner {
        username
      }
    }
  }
}
`;

export const createTaskList = (title, username, token) =>
  fetch(API_URL, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      query: CREATE_TASKLIST,
      variables: {
        title: title,
        username: username,
      },
    }),
  })
    .then((response) => {
      return response.json();
    })
    .catch((error) => {
      throw error;
    });

const UPDATE_TASK_STATUS = `
mutation($done: Boolean!, $id: ID!) {
  updateTasks(where: {id: $id} update: {done: $done}) {
    tasks {
      id
      content
      done
    }
  }
}
`;

export const updateTaskStatus = (id, done, token) =>
  fetch(API_URL, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      query: UPDATE_TASK_STATUS,
      variables: {
        id: id,
        done: done,
      },
    }),
  })
    .then((response) => {
      return response.json();
    })
    .catch((error) => {
      throw error;
    });

const UPDATE_TASK_CONTENT = `
    mutation($content: String!, $id: ID!) {
      updateTasks(where: {id: $id} update: {content: $content}) {
        tasks {
          id
          content
          done
        }
      }
    }
    `;

export const updateTaskContent = (id, content, token) =>
  fetch(API_URL, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      query: UPDATE_TASK_CONTENT,
      variables: {
        id: id,
        content: content,
      },
    }),
  })
    .then((response) => {
      return response.json();
    })
    .catch((error) => {
      throw error;
    });

const UPDATE_TASKLIST_TITLE = `
mutation($id: ID!, $title: String!) {
  updateTaskLists(where:{id:$id} update:{title:$title}) {
    taskLists {
      id
      title
    }
  }
}
`;

export const updateTaskListTitle = (id, title, token) =>
  fetch(API_URL, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      query: UPDATE_TASKLIST_TITLE,
      variables: {
        id: id,
        title: title,
      },
    }),
  })
    .then((response) => {
      return response.json();
    })
    .catch((error) => {
      throw error;
    });
