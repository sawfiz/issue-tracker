import { ChevronLeftIcon, ChevronRightIcon, DoubleArrowLeftIcon, DoubleArrowRightIcon } from "@radix-ui/react-icons";
import { Button, Flex } from "@radix-ui/themes";
import React from "react";

interface Props {
  currentPage: number;
  totalItems: number;
  pageSize: number;
}
const Pagination = ({ currentPage, totalItems, pageSize }: Props) => {
  const totalPages = Math.ceil(totalItems / pageSize);

  // Do not render if only 1 page
  if (totalPages === 1) return;

  return (
    <Flex align="center" gap="1">
      <Button color="gray" variant="outline">
        <DoubleArrowLeftIcon />
      </Button>
      <Button color="gray" variant="outline">
        <ChevronLeftIcon />
      </Button>
      Page {currentPage} of {totalPages}
      <Button color="gray" variant="outline">
        <ChevronRightIcon />
      </Button>
      <Button color="gray" variant="outline">
        <DoubleArrowRightIcon />
      </Button>
    </Flex>
  );
};

export default Pagination;
