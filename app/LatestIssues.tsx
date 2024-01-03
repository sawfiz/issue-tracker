import prisma from "@/prisma/client";
import axios from "axios";
import { Issue } from "@prisma/client";

const LatestIssues = async () => {
  // Fetch using Prisma
  const issues = await prisma.issue.findMany({
    orderBy: { createdAt: "desc" },
    take: 5,
  });

  return (
    <>
      <div>Latest Issues</div>
      <ul>
        {issues.map((issue) => (
          <li key={issue.id}>{issue.title}</li>
        ))}
      </ul>
    </>
  );
};

export default LatestIssues;
