"use client";
import { Select } from "@radix-ui/themes";
import { User } from "@prisma/client";
import { useEffect, useState } from "react";
import axios from "axios";

const AssignSelect = () => {
  const [users, setUsers] = useState<User[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      const {data} = await axios.get<User[]>("/api/users");
      setUsers(data);
    };

    fetchData();
  }, []);

  return (
    <Select.Root>
      <Select.Trigger placeholder="Assign Owner"></Select.Trigger>
      <Select.Content>
        <Select.Group>
          <Select.Label>Users</Select.Label>
          {users.map((user) => (
            <Select.Item key={user.id} value={user.id}>{user.name}</Select.Item>
          ))}
        </Select.Group>
      </Select.Content>
    </Select.Root>
  );
};

export default AssignSelect;
