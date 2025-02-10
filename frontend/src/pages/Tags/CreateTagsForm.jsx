import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { createTags } from "@/Redux/Project/Action";

const CreateTagsForm = () => {
  const dispatch = useDispatch();

  const tags = useSelector((store) => store.project.tags || []);

  const form = useForm({
    defaultValues: {
      nome: "",
    },
  });

  const onSubmit = (data) => {
    dispatch(createTags(data));
    //console.log("Create Tags data", data);
  };

  return (
    <div>
      <Form {...form}>
        <form className="space-y-5" onSubmit={form.handleSubmit(onSubmit)}>
          <FormField
            control={form.control}
            name="nome"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input
                    {...field}
                    type="text"
                    className="border w-full border-gray-700 py-5 px-5"
                    placeholder="Tags name..."
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button type="submit" className="w-full mt-5">
            Create tags
          </Button>
        </form>
      </Form>
    </div>
  );
};

export default CreateTagsForm;
