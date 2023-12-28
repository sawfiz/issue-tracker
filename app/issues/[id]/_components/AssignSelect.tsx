"use client";
import { Select } from "@radix-ui/themes";

const AssignSelect = () => {
  return (
    <Select.Root>
      <Select.Trigger placeholder="Assign Owner">
      </Select.Trigger>
      <Select.Content>
        <Select.Group>
          <Select.Label>Users</Select.Label>
          <Select.Item value="1">This</Select.Item>
          <Select.Item value="2">That</Select.Item>
        </Select.Group>
      </Select.Content>
    </Select.Root>
  );
};

export default AssignSelect;
