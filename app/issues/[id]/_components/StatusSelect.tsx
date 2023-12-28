// @/api/issues/[id]/_conponents/StatusSelect.tsx
"use client";
import React from "react";
import { Select } from "@radix-ui/themes";
import { Issue } from "@prisma/client";
import axios from "axios";
import { useRouter } from "next/navigation";

const StatusSelect = ({ issue }: { issue: Issue }) => {
  const router = useRouter();
  const handleChange = async (newStatus: string) => {
    try {
      const result = await axios.patch(`/api/issues/${issue.id}`, {
        status: newStatus,
      });
      router.refresh();
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <Select.Root
      onValueChange={(newStatus) => handleChange(newStatus)}
      defaultValue={issue.status}
    >
      <Select.Trigger placeholder="Status"></Select.Trigger>
      <Select.Content>
        <Select.Group>
          <Select.Label>Status</Select.Label>
          <Select.Item value="OPEN">Open</Select.Item>
          <Select.Item value="IN_PROGRESS">In Progress</Select.Item>
          <Select.Item value="CLOSED">Closed</Select.Item>
        </Select.Group>
      </Select.Content>
    </Select.Root>
  );
};

export default StatusSelect;
