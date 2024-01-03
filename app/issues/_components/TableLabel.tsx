"use client";
import { Issue, Status } from "@prisma/client";
import { ArrowDownIcon, ArrowUpIcon } from "@radix-ui/react-icons";
import { useRouter } from "next/navigation";
import { useState } from "react";

export interface IssueQuery {
  status: Status;
  orderBy: keyof Issue;
  sort: "asc" | "desc";
  page: string;
}

interface Props {
  searchParams: IssueQuery;
  col: { label: string; value: keyof Issue; className?: string | undefined };
}

export const TableLabel = ({ searchParams, col }: Props) => {
  const router = useRouter();
  const [sortOrder, setSortOrder] = useState("asc");
  return (
    <button
      onClick={() => {
        const newSortOrder = sortOrder === "asc" ? "desc" : "asc";
        setSortOrder(newSortOrder);

        const params = new URLSearchParams();
        if (searchParams.status) params.append("status", searchParams.status);
        params.append("orderBy", col.value);
        params.append("sort", sortOrder);
        const query = params.toString();

        router.push("/issues?" + query);
      }}
    >
      {col.label}
      {col.value === searchParams.orderBy &&
        (sortOrder === "asc" ? (
          <ArrowDownIcon className="inline" />
        ) : (
          <ArrowUpIcon className="inline" />
        ))}
    </button>
  );
};

export default TableLabel;
