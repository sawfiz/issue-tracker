import prisma from "@/prisma/client";
import { Box, Grid } from "@radix-ui/themes";
import { notFound } from "next/navigation";
import { IssueDetails, EditIssueButton } from "./_components";

// For some reason writing this inline cause compile error
interface Props {
  params: { id: string };
}
// All the ids in the url is by default string
const IssuesDetailPage = async ({ params }: Props) => {
  // Validate the id is a number
  if (isNaN(parseInt(params.id))) notFound();

  // params is an object {id: "123"}
  // use parseInt() to convert string to an InNaNt
  const issue = await prisma.issue.findUnique({
    where: { id: parseInt(params.id) },
  });

  // The default not found page
  if (!issue) notFound();

  return (
    <Grid columns={{ initial: "1", md: "2" }} gap="5">
      <Box>
        <IssueDetails issue={issue}/>
      </Box>
      <Box>
        <EditIssueButton issueId={issue.id} />
      </Box>
    </Grid>
  );
};

export default IssuesDetailPage;
