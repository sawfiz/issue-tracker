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
}

const IssuesPage = () => {

  const [searchParams, setSearchParams] = useState<searchParams>({
    status: undefined,
    orderBy: undefined,
  });
  console.log(
    "🚀 ~ file: page.tsx:33 ~ IssuesPage ~ searchParams:",
    searchParams
  );

  const handleChange = ({
    key,
    value,
  }: {
    key: string;
    value: Status | keyof Issue;
  }) => {
    setSearchParams((prevSearchParams) => ({
      ...prevSearchParams,
      [key]: value,
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
      <IssueToolBar status={searchParams.status} handleChange={handleChange} />
      <IssuesTable orderBy={searchParams.orderBy} issues={issues} />
    </div>
  );
};

export default IssuesPage;
