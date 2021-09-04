import React, { useState, useEffect } from "react";
import { useApolloClient, useSubscription } from '@apollo/client'
import { ALL_BOOKS, BOOK_ADDED } from "./querys";

import Authors from "./components/Authors";
import Books from "./components/Books";
import LoginForm from "./components/LoginForm";
import NewBook from "./components/NewBook";
import Notification from './components/Notification'
import Recommended from "./components/Recommended";

const App = () => {
  const [page, setPage] = useState("authors");
  const [notfyMessage, setNotifyMessage] = useState(null);
  const [token, setToken] = useState(null)
  const client = useApolloClient()

  const notify = (message) => {
    setNotifyMessage(message);
    setTimeout(() => setNotifyMessage(null), 5000);
  };

  const updateCacheWith = (addedBook) => {
    const includedIn = (set, object) =>
      set.map((p) => p.id).includes(object.id);

    const dataInStore = client.readQuery({ query: ALL_BOOKS });
    if (!includedIn(dataInStore.allBooks, addedBook)) {
      client.writeQuery({
        query: ALL_BOOKS,
        data: { allBooks: dataInStore.allBooks.concat(addedBook) },
      });
    }
  };

  useSubscription(BOOK_ADDED, {
    onSubscriptionData: ({ subscriptionData }) => {
      const addedBook = subscriptionData.data.bookAdded;
      window.alert(`${addedBook.title} added`);
      updateCacheWith(addedBook);
    },
  });

  useEffect(() => {
    const tokenFromStorage = localStorage.getItem("fs-user-token");
    if (tokenFromStorage) {
      setToken(tokenFromStorage);
    }
  }, []);

  if (!token) {
    return (
      <div>
      <Notification notfyMessage={notfyMessage} />
      <h2>Login</h2>
      <LoginForm setToken={setToken} setNotify={notify} />
      </div>
    )
  }

  const logout = () => {
    setToken(null)
    localStorage.clear()
    client.resetStore()
  }

  return (
    <div>
      <div>
        <button onClick={() => setPage("authors")}>authors</button>
        <button onClick={() => setPage("books")}>books</button>
        <button onClick={() => setPage("add")}>add book</button>
        <button onClick={() => setPage("recommended")}>recommended</button>
        <button onClick={logout}>logout</button>
      </div>

      <Notification notfyMessage={notfyMessage} />

      <main>
        <Authors show={page === "authors"} setNotify={notify} />

        <Books show={page === "books"} />

        <NewBook
          show={page === "add"}
          setNotify={notify}
          updateCacheWith={updateCacheWith}
        />

        <Recommended show={page === "recommended"} setNotify={notify} />
      </main>
    </div>
  );
};

export default App;
