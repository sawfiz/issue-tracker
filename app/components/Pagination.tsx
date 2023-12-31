"use client";
import {
  ChevronLeftIcon,
  ChevronRightIcon,
  DoubleArrowLeftIcon,
  DoubleArrowRightIcon,
} from "@radix-ui/react-icons";
import { Button, Flex } from "@radix-ui/themes";
import { useRouter, useSearchParams } from "next/navigation";
import React from "react";

interface Props {
  currentPage: number;
  totalItems: number;
  pageSize: number;
}
const Pagination = ({ currentPage, totalItems, pageSize }: Props) => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const totalPages = Math.ceil(totalItems / pageSize);

  // Do not render if only 1 page
  if (totalPages === 1) return;

  const changePage = (newPage: number) => {
    let page = newPage;
    if (newPage < 1) page = 1;
    if (newPage > totalPages) page = totalPages;
    
    const params = new URLSearchParams(searchParams);
    params.set("page", page.toString());
    // Change only the params, not the endpoint
    router.push("?" + params.toString());
  };

  return (
    <Flex align="center" gap="1">
      <Button color="gray" variant="outline" onClick={() => changePage(1)}>
        <DoubleArrowLeftIcon />
      </Button>
      <Button
        color="gray"
        variant="outline"
        onClick={() => changePage(currentPage - 1)}
      >
        <ChevronLeftIcon />
      </Button>
      Page {currentPage} of {totalPages}
      <Button
        color="gray"
        variant="outline"
        onClick={() => changePage(currentPage + 1)}
      >
        <ChevronRightIcon />
      </Button>
      <Button
        color="gray"
        variant="outline"
        onClick={() => changePage(totalPages)}
      >
        <DoubleArrowRightIcon />
      </Button>
    </Flex>
  );
};

export default Pagination;
