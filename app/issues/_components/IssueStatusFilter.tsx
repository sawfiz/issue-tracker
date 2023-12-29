"use client";
import { Status } from "@prisma/client";
import { Select } from "@radix-ui/themes";
import { useRouter } from "next/navigation";
import React from "react";

// Type define `statuses` as an object array
// Each object has a type definition, where `value` is optional
const statuses: { label: string; value?: Status }[] = [
  { label: "All" },
  { label: "Open", value: "OPEN" },
  { label: "In Progress", value: "IN_PROGRESS" },
  { label: "Closed", value: "CLOSED" },
];

const IssueStatusFilter = () => {
  const router = useRouter();
  return (
    <Select.Root
      onValueChange={(selectedStatus) => {
        const query =
          selectedStatus === "ALL" ? "" : `?status=${selectedStatus}`;
        router.push(`/issues${query}`);
      }}
    >
      <Select.Trigger placeholder="Filter by status..." />
      <Select.Content>
        <Select.Group>
          <Select.Label>Status</Select.Label>
          {statuses.map((status) => (
            <Select.Item key={status.value} value={status.value || "ALL"}>
              {status.label}
            </Select.Item>
          ))}
        </Select.Group>
      </Select.Content>
    </Select.Root>
  );
};

export default IssueStatusFilter;
