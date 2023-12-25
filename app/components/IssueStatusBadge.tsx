import { Status } from "@prisma/client";
import { Badge } from "@radix-ui/themes";

// Define a map object
// Record is a utility type in TS that allow define key value pairs
// e.g Record<string, number>
// In this case, key is Status, value is an object with 2 properties
// const statusMap: Record<Status, { label: string; color: string }> = {
// Need to specify the option of color, rather than just use sting, 
// as <Badge> need color to be one of the know colors.
const statusMap: Record<
  Status,
  { label: string; color: "red" | "violet" | "green" }
> = {
  OPEN: { label: "Open", color: "red" },
  IN_PROGRESS: { label: "In Progress", color: "violet" },
  CLOSED: { label: "Closed", color: "green" },
};

// A component that takes in `status`
// It's type is Status defined in the schema.prisma
// If a Props has only one parameter, the type can be defined inline
// rather than using Interface
const IssueStatusBadge = ({ status }: { status: Status }) => {
  return (
    <Badge color={statusMap[status].color}>{statusMap[status].label}</Badge>
  );
};

export default IssueStatusBadge;
