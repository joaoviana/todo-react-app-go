import { FC, useState } from "react";
import { useForm } from "@mantine/hooks";
import { Button, Group, Modal, Textarea, TextInput } from "@mantine/core";
import { ENDPOINT, Todo } from "../App";
import type { KeyedMutator } from "swr/dist/types";

type Props = {
  mutate: KeyedMutator<Todo[]>;
};

export const AddTodo: FC<Props> = ({ mutate }) => {
  const [open, setOpen] = useState(false);

  const form = useForm({
    initialValues: {
      title: "",
      body: "",
    },
  });

  const createTodo = async (values: Record<"title" | "body", string>) => {
    const updated = await fetch(`${ENDPOINT}/api/todos`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(values),
    }).then((r) => r.json());

    mutate(updated);
    form.reset();
    setOpen(false);
  };

  return (
    <>
      <Modal opened={open} onClose={() => setOpen(false)} title="Create TODO">
        <form onSubmit={form.onSubmit(createTodo)}>
          <TextInput
            required
            mb={12}
            label="title"
            placeholder="what do you want to do?"
            {...form.getInputProps("title")}
          />
          <Textarea
            required
            mb={12}
            label="body"
            placeholder="give us morrreeee"
            {...form.getInputProps("body")}
          />
          <Button type="submit">Create TODO</Button>
        </form>
      </Modal>

      <Group position="center">
        <Button fullWidth mb={12} onClick={() => setOpen(true)}>
          Add TODO
        </Button>
      </Group>
    </>
  );
};
