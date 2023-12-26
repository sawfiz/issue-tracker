import dynamic from "next/dynamic";

// Dynamically load the entire IssueForm
const IssueForm = dynamic(() => import("@/app/issues/_components/IssueForm"), {
  ssr: false,
});

const NewIssuePage = () => {
  return <IssueForm />;
};

export default NewIssuePage;
