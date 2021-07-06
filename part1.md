# Axios Crash Course
# GET Request
## Using the Axios HTTP Client/Library Examples
```
  try {
    const res = await axios({
      method: "get",
      url: "https://jsonplaceholder.typicode.com/todos",
    });
    console.log(res);
  } catch (err) {
    console.log(err);
  }
```
## **Remember to use a try-catch block for error handling.** 
## Recall that the return value from axios() is an object containing a bunch of useful key-value elements. <br /> ie.) config, data, headers, request..
## Since it is an object, we can destructure specific key:value pairs out of the object. `const {data} = await axios()`

# URL Params
## Notice, in our url -> https://jsonplaceholder.typicode.com/todos?_limit=5 . We can limit the amount of objects that are returned in response to the request.
## Since we can specify url params and limit our query in the URL, we should be able to request that same limit from axios.
```
    const res = await axios({
      method: "get",
      url: "https://jsonplaceholder.typicode.com/todos",
      params: {
          _limit: 5
      }
    });
```

# Shorthand Notation.
```
    const res = await axios.get('https://jsonplaceholder.typicode.com/todos?_limit=5')
```
# POST Request
- **First Argument:** The URL we want to make the POST request to. 
- **Second Argument:** The Object we want to 'POST' with.
```
  try {
      await axios.post("https://jsonplaceholder.typicode.com/todos", {
          title: "Chukwudi Ikem",
          completed: false
      });
  } catch (err) {
    console.log(err);
  }
```
## Request Data 
```
{"title":"Chukwudi Ikem","completed":false} // In JSON. axios converts to JSON before request is made
```

## Response Data
```
{
  "title": "Chukwudi Ikem",
  "completed": false,
  "id": 201 // Successful POST
}
```

# PUT & PATCH Request
- Put is meant to update the entire resource. For example, if there are foreign keys not specified in the put request, they will get wiped out.
- Patch will update the resource incrementally. Doesn't complete replace object, only replaces specified properties.

# Handling Simultaneous Requests | Axios.all()
- Takes in an array of requests, once all promises are fulfilled, then we get a response and can handle that.
```
async function getData() {
  try {
    const res = await axios.all([
      axios.get("https://jsonplaceholder.typicode.com/todos"),
      axios.get("https://jsonplaceholder.typicode.com/posts"),
    ]);
    console.log(res[0], res[1]);
  } catch (err) {
      console.log(err);
  }
}
```
## We can also use axios.spread() to give our responses more semantic meaning. Axios.spread() takes in a function whose parameters represent res[0], res[1], ... , res[n]
```
async function getData() {
  try {
    const res = await axios.all([
      axios.get("https://jsonplaceholder.typicode.com/todos"),
      axios.get("https://jsonplaceholder.typicode.com/posts"),
    ]);
    axios.spread((todos,posts) => // some action);
  } catch (err) {
      console.log(err);
  }
}
```