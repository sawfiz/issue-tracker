"use client";
import { TextField, Button } from "@radix-ui/themes";
import SimpleMDE from "react-simplemde-editor";
import "easymde/dist/easymde.min.css";
import { useForm, useController, Controller } from "react-hook-form";
import axios from "axios";
import { useRouter } from "next/navigation";

// Use an interface to define the shape of form data
interface IssueForm {
  title: string;
  description: string;
}

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
  } = useForm<IssueForm>();

  const router = useRouter();

  return (
    <form
      onSubmit={handleSubmit(async (data) => {
        await axios.post("/api/issues", data);
        router.push("/issues");
      })}
      className="max-w-xl space-y-3"
    >
      <TextField.Root>
        {/* Use spread operator as `register` returns an object of 4 fields */}
        {/* name, onChange, onBlue, ref */}
        <TextField.Input {...register("title")} placeholder="Title" />
      </TextField.Root>
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

      <Button>Submit New Issue</Button>
    </form>
  );
};

export default NewIssuePage;
