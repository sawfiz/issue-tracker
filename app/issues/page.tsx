"use client";
import { IssueToolBar, Skeleton } from "@/app/components";
import { Issue, Status } from "@prisma/client";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useState } from "react";
import IssuesTable from "./_components/IssuesTable";

interface searchParams {
  status: Status | undefined;
  orderBy: keyof Issue | undefined;
  sortDir: "asc" | "desc";
}

const IssuesPage = () => {
  const [searchParams, setSearchParams] = useState<searchParams>({
    status: undefined,
    orderBy: undefined,
    sortDir: "asc",
  });
  console.log(
    "🚀 ~ file: page.tsx:33 ~ IssuesPage ~ searchParams:",
    searchParams
  );

  const handleChangeStatus = ({ status }: { status: Status | undefined }) => {
    console.log(
      "🚀 ~ file: page.tsx:27 ~ handleChangeStatus ~ status:",
      status
    );
    setSearchParams((prevSearchParams) => ({
      ...prevSearchParams,
      status: status,
    }));
  };

  const handleChangeSort = ({ orderBy }: { orderBy: keyof Issue }) => {
    setSearchParams((prevSearchParams) => ({
      ...prevSearchParams,
      orderBy,
    }));
  };

  const {
    isPending,
    error,
    data: issues,
  } = useQuery<Issue[]>({
    // By passing an array ["issues", searchParams] as the queryKey,
    // the useQuery hook will properly identify changes in searchParams
    // and trigger a refetch whenever searchParams change.
    queryKey: ["issues", searchParams],
    queryFn: () =>
      axios
        .get("/api/issues", {
          params: searchParams,
        })
        .then((res) => res.data),
  });

  if (isPending) return <Skeleton height="2rem" />;

  if (error) {
    return;
  }

  return (
    <div>
      <IssueToolBar
        status={searchParams.status}
        handleChangeStatus={handleChangeStatus}
      />
      <IssuesTable
        orderBy={searchParams.orderBy}
        issues={issues}
        handleChangeSort={handleChangeSort}
      />
    </div>
  );
};

export default IssuesPage;
