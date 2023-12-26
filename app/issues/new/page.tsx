import dynamic from "next/dynamic";
import LoadIssueDetails from "../_components/IssueFormSkeleton";

// Dynamically load the entire IssueForm
const IssueForm = dynamic(() => import("@/app/issues/_components/IssueForm"), {
  ssr: false,
  loading: () => <LoadIssueDetails />,
});

const NewIssuePage = () => {
  return <IssueForm />;
};

export default NewIssuePage;
