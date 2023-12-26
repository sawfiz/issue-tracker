"use client";
import { TrashIcon } from "@radix-ui/react-icons";
import { Button } from "@radix-ui/themes";
import axios from "axios";
import { useRouter } from "next/navigation";
import React from "react";

const DeleteIssueButton = ({ issueId }: { issueId: number }) => {
  const router = useRouter();
  const handleSubmit = async () => {
    try {
      await axios.delete(`/api/issues/${issueId}`);
      router.push("/issues");
      router.refresh();
    } catch (error) {
      console.log(
        "🚀 ~ file: DeleteIssueButton.tsx:16 ~ handleSubmit ~ error:",
        error
      );
    }
  };
  return (
    <Button color='red' onClick={handleSubmit}>
      <TrashIcon />
      Delete Issue
    </Button>
  );
};

export default DeleteIssueButton;
