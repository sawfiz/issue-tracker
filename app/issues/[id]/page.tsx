// @/app/issues/[id]/page.tsx
import prisma from "@/prisma/client";
import { Box, Flex, Grid } from "@radix-ui/themes";
import { notFound } from "next/navigation";
import {
  IssueDetails,
  EditIssueButton,
  DeleteIssueButton,
} from "./_components";
import { getServerSession } from "next-auth";
import authOptions from "@/app/auth/authOptions";

// For some reason writing this inline cause compile error
interface Props {
  params: { id: string };
}
// All the ids in the url is by default string
const IssuesDetailPage = async ({ params }: Props) => {
  // Validate the id is a number
  if (isNaN(parseInt(params.id))) notFound();

  const session = await getServerSession(authOptions);

  // params is an object {id: "123"}
  // use parseInt() to convert string to an InNaNt
  const issue = await prisma.issue.findUnique({
    where: { id: parseInt(params.id) },
  });

  // The default not found page
  if (!issue) notFound();

  return (
    <Grid columns={{ initial: "1", sm: "5" }} gap="5">
      <Box className="md:col-span-4">
        <IssueDetails issue={issue} />
      </Box>
      {session && (
        <Box width="auto">
          <Flex direction="column" gap="4">
            <EditIssueButton issueId={issue.id} />
            <DeleteIssueButton issueId={issue.id} />
          </Flex>
        </Box>
      )}
    </Grid>
  );
};

export default IssuesDetailPage;
