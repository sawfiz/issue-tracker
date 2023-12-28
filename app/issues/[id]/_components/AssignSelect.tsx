"use client";
import { Select } from "@radix-ui/themes";
// import { User } from "@prisma/client";
// import { useEffect, useState } from "react";
import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import { User } from "@prisma/client";
import Skeleton from "@/app/components/Skeleton";

const AssignSelect = () => {
  // const [users, setUsers] = useState<User[]>([]);

  // useEffect(() => {
  //   const fetchData = async () => {
  //     const { data } = await axios.get<User[]>("/api/users");
  //     setUsers(data);
  //   };

  //   fetchData();
  // }, []);

  const {
    isPending,
    error,
    data: users,
  } = useQuery<User[]>({
    // queryKey is an identifier for data in the cache
    queryKey: ["users"],
    queryFn: () => axios.get("/api/users").then((res) => res.data),
    retry: 3,
    staleTime: 60 * 1000, // 60s
  });

  if (isPending) return <Skeleton height="2rem" />;

  // If error, retun nothing. The Select component disappers.
  if (error) return;

  return (
    <Select.Root>
      <Select.Trigger placeholder="Assign Owner"></Select.Trigger>
      <Select.Content>
        <Select.Group>
          <Select.Label>Users</Select.Label>
          {users.map((user: User) => (
            <Select.Item key={user.id} value={user.id}>
              {user.name}
            </Select.Item>
          ))}
        </Select.Group>
      </Select.Content>
    </Select.Root>
  );
};

export default AssignSelect;
