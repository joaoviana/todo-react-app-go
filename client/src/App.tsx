import { Box, List, ListItem, ThemeIcon } from "@mantine/core";
import useSWR from "swr";
import "./App.css";
import { CheckCircleFillIcon } from "@primer/octicons-react";
import { AddTodo } from "./components/AddTodo";

export const ENDPOINT = "http://localhost:4000";

const fetcher = async (url: string) => {
  const response = await fetch(`${ENDPOINT}/${url}`);
  return response.json();
};

export interface Todo {
  id: number;
  title: string;
  body: string;
  done: boolean;
}

function App() {
  const { data, mutate } = useSWR<Todo[]>("api/todos", fetcher);

  const markTodoAsDone = async (id: Todo["id"]) => {
    const updated = await fetch(`${ENDPOINT}/api/todos/${id}/done`, {
      method: "PATCH",
    }).then((r) => r.json());

    mutate(updated);
  };

  return (
    <Box
      sx={(theme) => ({
        padding: "2rem",
        margin: "0 auto",
      })}
    >
      <List>
        {data?.map(({ id, title, done }) => (
          <ListItem
            onClick={() => markTodoAsDone(id)}
            mb={10}
            key={id}
            icon={
              <ThemeIcon color={done ? "teal" : "blue"} size={24} radius="xl">
                <CheckCircleFillIcon size={20} />
              </ThemeIcon>
            }
          >
            {title}
          </ListItem>
        ))}
      </List>
      <AddTodo mutate={mutate} />
    </Box>
  );
}

export default App;
