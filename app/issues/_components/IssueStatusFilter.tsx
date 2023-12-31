"use client";
import { Status } from "@prisma/client";
import { Select } from "@radix-ui/themes";
import { useRouter, useSearchParams } from "next/navigation";

// Type define `statuses` as an object array
// Each object has a type definition, where `value` is optional
const statuses: { label: string; value: Status | "ALL" }[] = [
  { label: "All", value: "ALL" },
  { label: "Open", value: "OPEN" },
  { label: "In Progress", value: "IN_PROGRESS" },
  { label: "Closed", value: "CLOSED" },
];

const IssueStatusFilter = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  return (
    <Select.Root
      // Retrieve the default value from the URL
      defaultValue={searchParams.get("status") || ""}
      onValueChange={(selectedStatus: "ALL" | Status) => {
        const params = new URLSearchParams();
        if (selectedStatus && selectedStatus !== "ALL")
          params.append("status", selectedStatus);
        if (searchParams.get("orderBy")) {
          params.append("orderBy", searchParams.get("orderBy")!);
          params.append("sort", searchParams.get("sort")!);
        }
        const query = params.size ? "?" + params.toString() : "";
        router.push("/issues" + query);
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
