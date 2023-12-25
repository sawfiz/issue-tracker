import { Box, Heading, Flex } from "@radix-ui/themes";
import { Skeleton } from "@/app/components";
import "react-loading-skeleton/dist/skeleton.css";

const LoadingIssueDetail = () => {
  return (
    <Box className="max-w-xl">
      <Heading>
        <Skeleton />
      </Heading>
      <Flex gap="4">
        <Skeleton width="3rem" />
        <Skeleton width="8rem" />
      </Flex>
      <Skeleton count={3} />
    </Box>
  );
};

export default LoadingIssueDetail;
