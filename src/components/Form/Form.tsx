"use client";
import { useState, useCallback, useTransition } from "react";
import loginAction from "../../actions/LoginAction";
import useIsFirstRender from "@/hooks/useIsFirstRender";
import { Button } from "../ui/button";
import { Input } from "../ui/input";

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
      if (!username || !password) return;
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
      className="p-10 w-full space-y-4 bg-white shadow-lg rounded-md"
      onSubmit={handleSubmit}
    >
      <Input
        id={"username"}
        name="username"
        type="text"
        placeholder="username"
        value={username}
        data-testid="username-input"
        onChange={handleUsenameChange}
      />
      <Input
        id={"password"}
        name="password"
        type="password"
        placeholder="password"
        value={password}
        data-testid="password-input"
        onChange={handlePasswordChange}
      />
      {isFieldsEmpty && (
        <p className="text-sm text-red-500"  data-testid="error-info">
          username and password fields shouldn't be empty
        </p>
      )}
      <Button
        className="w-full py-2 text-white rounded-md hover:bg-indigo-700"
        type="submit"
        data-testid="submit-button"
      >
        Log in
      </Button>
    </form>
  );
};

export default Form;
