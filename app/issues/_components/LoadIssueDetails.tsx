import { Skeleton } from "@/app/components";
import { Box } from "@radix-ui/themes";

import React from 'react'

const LoadIssueDetails = () => {
  return (
    <Box className="max-w-xl">
    <Skeleton height="2rem" />
    <Skeleton height="20rem" />
  </Box>
  )
}

export default LoadIssueDetails   