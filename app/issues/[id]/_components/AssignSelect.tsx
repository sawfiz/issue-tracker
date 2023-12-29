"use client";
import Skeleton from "@/app/components/Skeleton";
import { Issue, User } from "@prisma/client";
import { Select } from "@radix-ui/themes";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useRouter } from "next/navigation";
import toast, { Toaster } from "react-hot-toast";

const AssignSelect = ({ issue }: { issue: Issue }) => {
  const router = useRouter();

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

  const handleChange = async (newOwnerId: string) => {
    try {
      const result = await axios.patch(`/api/issues/${issue.id}`, {
        ownerId: newOwnerId === "UNASSIGNED" ? null : newOwnerId,
      });
      router.refresh();
    } catch (error) {
      toast.error("Changes could not be saved.");
    }
  };

  return (
    <>
      <Select.Root
        defaultValue={issue.ownerId || ""}
        onValueChange={handleChange}
      >
        <Select.Trigger placeholder="Assign Owner"></Select.Trigger>
        <Select.Content>
          <Select.Group>
            <Select.Label>Users</Select.Label>
            <Select.Item value="UNASSIGNED">Unassigend</Select.Item>
            {users.map((user: User) => (
              <Select.Item key={user.id} value={user.id}>
                {user.name}
              </Select.Item>
            ))}
          </Select.Group>
        </Select.Content>
      </Select.Root>
      <Toaster />
    </>
  );
};

export default AssignSelect;
