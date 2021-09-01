import React, { useState, useEffect } from "react";
import { useMutation } from "@apollo/client";
import { ALL_AUTHORS, EDIT_AUTHOR } from "../querys";
import Select from "react-select";

const EditAuthor = ({ notify, authors }) => {
  const [nameOption, setNameOption] = useState(null);
  const [setBornTo, setBornYear] = useState("");

  const [changeBornYear, result] = useMutation(EDIT_AUTHOR, {
    refetchQueries: [{ query: ALL_AUTHORS }],
  });

  const selectOptions = [];
  authors.forEach((author) =>
    selectOptions.push({
      value: author.name,
      label: author.name,
    })
  );

  const submit = (e) => {
    e.preventDefault();

    const name = nameOption.value;

    changeBornYear({
      variables: {
        name,
        setBornTo,
      },
    });

    setNameOption("");
    setBornYear("");
  };

  useEffect(() => {
    if (result.data && result.data.editAuthor === null) {
      notify("Author not Found");
    }
  }, [result.data]);

  return (
    <div>
      <h3>Set birthyear</h3>

      <form onSubmit={submit}>
        <div>
          <Select
            value={nameOption}
            onChange={setNameOption}
            options={selectOptions}
          />
        </div>
        <div>
          born{" "}
          <input
            value={setBornTo}
            onChange={({ target }) => setBornYear(parseInt(target.value))}
          />
        </div>
        <button type="submit">update author</button>
      </form>
    </div>
  );
};

export default EditAuthor;
