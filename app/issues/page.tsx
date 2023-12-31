"use client";
import { IssueToolBar } from "@/app/components";
import { Issue } from "@prisma/client";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import IssuesPageSkeleton from "./_components/IssuesPageSkeleton";
import IssuesTable, { IssueQuery } from "./_components/IssuesTable";
import Pagination from "../components/Pagination";

const pageSize = 10;

// Define the type for the API response data
interface ApiResponse {
  issues: Issue[]; 
  count: number; 
}

const IssuesPage = ({ searchParams }: { searchParams: IssueQuery }) => {
  const {
    isPending,
    error,
    data: { issues, count } = { issues: [], count: 0 } as ApiResponse,
  } = useQuery<Issue[]>({
    // By passing an array ["issues", searchParams] as the queryKey,
    // the useQuery hook will properly identify changes in searchParams
    // and trigger a refetch whenever searchParams change.
    queryKey: ["issues", searchParams],
    queryFn: () =>
      axios
        .get("/api/issues", {
          params: { ...searchParams, pageSize },
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
      <IssuesTable searchParams={searchParams} issues={issues} />
      <Pagination
        currentPage={searchParams.page ? parseInt(searchParams.page) : 1}
        totalItems={count}
        pageSize={pageSize}
      />
    </div>
  );
};

export default IssuesPage;
