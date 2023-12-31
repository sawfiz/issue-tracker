"use client";
import { IssueToolBar } from "@/app/components";
import { Issue, Status } from "@prisma/client";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import IssuesPageSkeleton from "./_components/IssuesPageSkeleton";
import IssuesTable from "./_components/IssuesTable";

interface searchParams {
  status: Status | undefined;
  orderBy: keyof Issue | undefined;
  sort: "asc" | "desc";
}

const IssuesPage = ({ searchParams }: { searchParams: searchParams }) => {
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

  if (isPending) return <IssuesPageSkeleton />;

  if (error) {
    return;
  }

  return (
    <div>
      <IssueToolBar />
      <IssuesTable
        searchParams={searchParams}
        issues={issues}
      />
    </div>
  );
};

export default IssuesPage;
