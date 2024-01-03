"use client";
import { Status } from "@prisma/client";
import { Card } from "@radix-ui/themes";
import { useRouter } from "next/navigation";
import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis } from "recharts";

interface Props {
  open: number;
  inProgress: number;
  closed: number;
}

interface data {
  label: string;
  value: number;
  status: Status;
}

const IssueChart = ({ open, inProgress, closed }: Props) => {
  const router = useRouter();

  const data = [
    { label: "Open", value: open, status: "OPEN" },
    { label: "In Progress", value: inProgress, status: "IN_PROGRESS" },
    { label: "Closed", value: closed, status: "CLOSED" },
  ];

  const handleClick = (data: data) => {
    router.push(`/issues?status=${data.status}`);
  };

  return (
    <Card>
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={data}>
          <Bar
            dataKey="value"
            barSize={60}
            style={{ fill: "var(--accent-9)" }}
            onClick={handleClick}
            className="cursor-pointer"
          />
          <XAxis dataKey="label" />
          <YAxis />
        </BarChart>
      </ResponsiveContainer>
    </Card>
  );
};

export default IssueChart;
