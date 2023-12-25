"use client";
import { ErrorMessage, Spinner } from '@/app/components';
import { issueSchema } from "@/app/validationSchemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { Cross1Icon } from "@radix-ui/react-icons";
import { Button, Callout, TextField } from "@radix-ui/themes";
import axios from "axios";
import "easymde/dist/easymde.min.css";
import dynamic from "next/dynamic";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { z } from "zod";

// Dynamcally load SimpleMDE so it does not cause navigator errors
// Tell Next.js not to render this on the server
const SimpleMDE = dynamic(
  () => import("react-simplemde-editor"), { ssr: false });

// Use an interface to define the shape of form data
type IssueForm = z.infer<typeof issueSchema>;

const NewIssuePage = () => {
  // <> is a `generic` in TypeScript
  // Passing `IssueForm` as a generic parameter to `useForm()` to specify
  // the shape of the form data that will be managed by `useForm`.
  const {
    // This method allows you to register an input or select element and apply validation rules to React Hook Form.
    register,
    // This function will receive the form data if form validation is successful.
    handleSubmit,
    // To be used in <Controller>
    control,
    formState: { errors, isSubmitting },
    reset,
    getValues,
  } = useForm<IssueForm>({ resolver: zodResolver(issueSchema) });

  const router = useRouter();

  const [error, setError] = useState("");

  const onSubmit = async (data: IssueForm) => {
    try {
      await axios.post("/api/issues", data);
      router.push("/issues");
    } catch (error) {
      console.log(error);
      setError("An unexpected error has occured.");
    }
  };

  return (
    <div className="max-w-xl space-y-3">
      {error && (
        <Callout.Root color="red">
          <Callout.Icon>
            <Cross1Icon />
          </Callout.Icon>
          <Callout.Text>An undexpected error has occured.</Callout.Text>
        </Callout.Root>
      )}
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-3">
        <TextField.Root>
          {/* Use spread operator as `register` returns an object of 4 fields */}
          {/* name, onChange, onBlue, ref */}
          <TextField.Input {...register("title")} placeholder="Title" />
        </TextField.Root>
        <ErrorMessage>{errors.title?.message}</ErrorMessage>
        {/* SimpleMED does not support additional props, so cant use `register` */}
        {/* Use the Controller component instead */}

        {/* SimpleMDE does not accept additonal props
      Use Controller to register it with react-hook-form */}
        <Controller
          name="description"
          control={control}
          render={({ field }) => (
            <SimpleMDE placeholder="Description" {...field} />
          )}
        />
        <ErrorMessage>{errors.description?.message}</ErrorMessage>

        <Button disabled={isSubmitting}>
          Submit New Issue {isSubmitting && <Spinner />}
        </Button>
      </form>
    </div>
  );
};

export default NewIssuePage;
