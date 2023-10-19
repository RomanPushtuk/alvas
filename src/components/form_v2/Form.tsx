"use client";
import { useState, useCallback, useTransition } from "react";
import loginAction from "@/actions/LoginAction";
import Input from "../Input";
import useIsFirstRender from "@/hooks/useIsFirstRender";

const Form = () => {
  const [isPending, startTransition] = useTransition();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const isFirstRender = useIsFirstRender();

  const handleUsenameChange = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      console.log(event.target.value);
      setUsername(event.target.value);
    },
    [setUsername]
  );

  const handlePasswordChange = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      setPassword(event.target.value);
    },
    [setPassword]
  );

  const handleSubmit = useCallback(
    (event: any) => {
      event.preventDefault();

      const data = new FormData();
      data.set("username", username);
      data.set("password", password);

      startTransition(async () => {
        await loginAction(data);
      });
    },
    [startTransition, username, password]
  );

  const isFieldsEmpty = (username === "" || password === "") && !isFirstRender;

  return (
    <form
      className="p-10 space-y-4 bg-white shadow-lg rounded-md"
      onSubmit={handleSubmit}
    >
      <Input
        name="username"
        type="text"
        placeholder="username"
        value={username}
        onChange={handleUsenameChange}
      />
      <Input
        name="password"
        type="password"
        placeholder="password"
        value={password}
        onChange={handlePasswordChange}
      />
      {isFieldsEmpty && (
        <p className="text-sm text-red-500 ">
          username and password fields shouldn't be empty
        </p>
      )}
      <button
        className="w-full bg-blue-500 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded"
        type="submit"
      >
        Login
      </button>
    </form>
  );
};

export default Form;
