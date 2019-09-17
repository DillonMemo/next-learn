import React, { FormEvent, useState, useEffect } from "react";
import { NextPage } from "next";
import axios from "axios";

interface IProps {
  form: any;
  getInitalProps: any;
}

const Employee: NextPage<IProps> = props => {
  const [name, setName] = useState<string>("");

  useEffect(() => {
    getEmployee();
  }, []);

  const getEmployee = async () => {
    const result = await axios({
      method: "GET",
      url: "http://1.234.180.43:8008/api/demo.php"
    });

    console.log(result);
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log(e.currentTarget.name);
  };

  return (
    <>
      <p>Test employee get api test</p>
      <form action="" onSubmit={event => handleSubmit(event)}>
        <input
          type="text"
          name="name"
          value={name}
          onChange={event => setName(event.currentTarget.value)}
        />
        <button type="submit">Sing Up</button>
      </form>
    </>
  );
};

export default Employee;
