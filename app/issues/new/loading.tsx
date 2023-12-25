import React from "react";
import { Skeleton } from "@/app/components";
import "react-loading-skeleton/dist/skeleton.css";
import { Box } from "@radix-ui/themes";

const loading = () => {
  return (
    <Box className="max-w-xl">
      <Skeleton />
      <Skeleton height="20rem" />
    </Box>
  );
};

export default loading;
