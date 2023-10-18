import { cache } from "react";

const validateForm = cache(async (login: string, password: string) => {
  if (login !== "test" && password !== "test") {
    return "Такой юзер не найден";
  }

  return null;
});

export const fetchCache = "force-cache";

export default validateForm;
