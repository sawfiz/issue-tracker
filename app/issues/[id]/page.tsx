import IssueStatusBadge from "@/app/components/IssueStatusBadge";
import prisma from "@/prisma/client";
import { Box, Button, Card, Flex, Grid, Heading, Text } from "@radix-ui/themes";
import { notFound } from "next/navigation";
import ReactMarkdown from "react-markdown";
import { Pencil2Icon } from "@radix-ui/react-icons";
import Link from "next/link";

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
      <Grid columns={{initial: "1", md: "2"}} gap="5">
        <Box>
          <Heading>{issue.title}</Heading>

          <Flex gap="4" my="2">
            <IssueStatusBadge status={issue.status} />
            <Text>{issue.updatedAt.toDateString()}</Text>
          </Flex>
          <Card className="prose lg:prose-xl mt-4">
            <ReactMarkdown>{issue.description}</ReactMarkdown>
          </Card>
        </Box>
        <Box>
          <Button>
            <Pencil2Icon />
            <Link href={`/issues/${issue.id}/edit`}>
            Edit Issue
            </Link>
          </Button>
        </Box>
      </Grid>
  );
};

export default IssuesDetailPage;
