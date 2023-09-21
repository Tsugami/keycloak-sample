import { useEffect, useState } from "react";
import { useAuth } from "react-oidc-context";

type Todo = {
  id: number;
  title: string;
  completed: boolean;
};

export const useTodos = () => {
  const auth = useAuth();
  const [todos, setTodos] = useState<Todo[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    setIsLoading(true);
    fetch("http://localhost:3000/todos", {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${auth.user?.access_token}`,
      },
    })
      .then((response) => response.json())
      .then(setTodos)
      .catch(setError)
      .finally(() => setIsLoading(false));
  }, [auth.user?.access_token]);

  return { todos, isLoading, error };
};
