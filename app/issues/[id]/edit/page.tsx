import prisma from "@/prisma/client";
import dynamic from "next/dynamic";
import { notFound } from "next/navigation";

// Dynamically load the entire IssueForm
const IssueForm = dynamic(() => import("@/app/issues/_components/IssueForm"), {
  ssr: false,
});

interface Props {
  params: { id: string };
}

const EditIssuePage = async ({ params }: Props) => {
  const issue = await prisma.issue.findUnique({
    where: { id: parseInt(params.id) },
  });
  if (!issue) return notFound();
  return <IssueForm issue={issue} />;
};

export default EditIssuePage;
