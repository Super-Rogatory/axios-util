/* eslint-disable no-undef */ // axios is defined via CDN in index.html

// GET REQUEST
async function getTodos() {
  try {
    const res = await axios.get(
      "https://jsonplaceholder.typicode.com/todos?_limit=5"
    );
    showOutput(res);
  } catch (err) {
    console.log(err);
  }
}

// POST REQUEST
async function addTodo() {
  try {
    const res = await axios.post("https://jsonplaceholder.typicode.com/todos", {
      title: "Chukwudi Ikem",
      completed: false,
    });
    showOutput(res);
  } catch (err) {
    console.log(err);
  }
}

// PUT/PATCH REQUEST
async function updateTodo() {
  try {
    const res = await axios.put(
      "https://jsonplaceholder.typicode.com/todos/1",
      {
        title: "Updated, Chukwudi Ikem",
        completed: false,
      }
    );
    showOutput(res);
  } catch (err) {
    console.log(err);
  }
}

// DELETE REQUEST
async function removeTodo() {
  try {
    await axios.delete("https://jsonplaceholder.typicode.com/todos/1");
    showOutput(res);
  } catch (err) {
    console.log(err);
  }
}

// SIMULTANEOUS DATA
async function getData() {
  try {
    const res = await axios.all([
      axios.get("https://jsonplaceholder.typicode.com/todos"),
      axios.get("https://jsonplaceholder.typicode.com/posts"),
    ]);
    console.log(res[0], res[1]);
    showOutput(res[0]);
    showOutput(res[1]);
  } catch (err) {
    console.log(err);
  }
}

// CUSTOM HEADERS
async function customHeaders() {
  const config = {
    headers: {
      "Content-type": "application/json",
      Authorization: "sometoken",
    },
  };
  try {
    const res = await axios.post(
      "https://jsonplaceholder.typicode.com/todos",
      {
        title: "Chukwudi Ikem",
        completed: false,
      },
      config );
    showOutput(res);
  } catch (err) {
    console.log(err);
  }
}

// AXIOS INSTANCES
const axiosInstance = axios.create({
  baseURL: 'https://jsonplaceholder.typicode.com'
});
axiosInstance.get('/comments')
.then(res => showOutput(res));


// Show output in browser
function showOutput(res) {
  document.getElementById("res").innerHTML = `
      <div class="card card-body mb-4">
        <h5>Status: ${res.status}</h5>
      </div>
      <div class="card mt-3">
        <div class="card-header">
          Headers
        </div>
        <div class="card-body">
          <pre>${JSON.stringify(res.headers, null, 2)}</pre>
        </div>
      </div>
      <div class="card mt-3">
        <div class="card-header">
          Data
        </div>
        <div class="card-body">
          <pre>${JSON.stringify(res.data, null, 2)}</pre>
        </div>
      </div>
      <div class="card mt-3">
        <div class="card-header">
          Config
        </div>
        <div class="card-body">
          <pre>${JSON.stringify(res.config, null, 2)}</pre>
        </div>
      </div>
    `;
}

// Event listeners
document.getElementById("get").addEventListener("click", getTodos);
document.getElementById("post").addEventListener("click", addTodo);
document.getElementById("update").addEventListener("click", updateTodo);
document.getElementById("delete").addEventListener("click", removeTodo);
document.getElementById("sim").addEventListener("click", getData);
document.getElementById("headers").addEventListener("click", customHeaders);
