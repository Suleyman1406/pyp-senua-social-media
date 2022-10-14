import React, { useState } from "react";
import "./style.css";
import { AllUsers } from "./users";
import Table from "./Table";

const Users = () => {
  const [query, setQuery] = useState("");
  const params=["first_name", "last_name","email"]
  const search = (data) => {
    return data.filter(
      (item) =>
       params.some(param=>item[param].toLowerCase().includes(query))
    );
  };
  return (
    <div className="app">
      <h2>User List</h2>
      <input
        className="search"
        placeholder="Search..."
        onChange={(e) => setQuery(e.target.value)}
      />
      <Table data={search(AllUsers)} />
    </div>
  );
};

export default Users;
