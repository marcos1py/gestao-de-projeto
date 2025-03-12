import { Button } from "@/components/ui/Button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { createTags } from "@/Redux/Project/Action";

const CreateTagsForm = ({ onClose }) => {
  const dispatch = useDispatch();

  const form = useForm({
    defaultValues: {
      nome: "",
    },
  });

  const onSubmit = async (data) => {
    try {
      await dispatch(createTags(data)).unwrap();
      onClose();
    } catch (error) {
      console.error("Erro ao criar tag:", error);
    }
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
                    placeholder="Tag name..."
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button type="submit" className="w-full mt-5">
            Create tag
          </Button>
        </form>
      </Form>
    </div>
  );
};

export default CreateTagsForm;
