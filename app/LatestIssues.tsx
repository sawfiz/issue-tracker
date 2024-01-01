import prisma from "@/prisma/client";

const LatestIssues = async () => {
  const issues = await prisma.issue.findMany({
    orderBy: { createdAt: "desc" },
    take: 5,
  });
  console.log(issues);

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
