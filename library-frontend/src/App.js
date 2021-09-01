import React, { useState } from "react";

import Authors from "./components/Authors";
import Books from "./components/Books";
import NewBook from "./components/NewBook";

const Notify = ({notfyMessage}) => {
  if (!notfyMessage) return null

  return (
    <div>
      { notfyMessage }
    </div>
  )
}

const App = () => {
  const [page, setPage] = useState("authors");
  const [notfyMessage, setNotifyMessage] = useState(null)

  const notify = message => {
    setNotifyMessage(message)
    setTimeout(() => setNotifyMessage(null), 5000)
  }

  return (
    <div>
      <div>
        <button onClick={() => setPage("authors")}>authors</button>
        <button onClick={() => setPage("books")}>books</button>
        <button onClick={() => setPage("add")}>add book</button>
      </div>

      <Notify notfyMessage={notfyMessage} />

      <Authors show={page === "authors"} setNotify={notify} />

      <Books show={page === "books"} />

      <NewBook show={page === "add"} setNotify={notify} />
    </div>
  );
};

export default App;
