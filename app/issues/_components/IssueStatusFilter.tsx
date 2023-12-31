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
  const searchParams = useSearchParams()
  return (
    <Select.Root
      // Retrieve the default value from the URL
      defaultValue={searchParams.get('status') || ''}
      onValueChange={(selectedStatus: "ALL" | Status) => {
        const query: undefined | Status =
          selectedStatus === "ALL" ? undefined : selectedStatus;
        // handleChangeStatus({status: query});
        router.push('/issues/?status=' + query);
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
