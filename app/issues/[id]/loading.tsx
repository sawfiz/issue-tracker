import IssueStatusBadge from "@/app/components/IssueStatusBadge";
import { Heading, Flex } from "@radix-ui/themes";
import React from "react";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

const LoadingIssueDetail = () => {
  return (
    <div className="max-w-xl">
      <Heading>
        <Skeleton />
      </Heading>
      <Skeleton count={2}/>
    </div>
  );
};

export default LoadingIssueDetail;
