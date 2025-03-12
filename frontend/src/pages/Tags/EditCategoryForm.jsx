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
import { updateTags, fetchTags } from "@/Redux/Project/Action";

const EditTagsForm = ({ tag, onClose }) => {
  const dispatch = useDispatch();

  const form = useForm({
    defaultValues: {
      nome: tag?.nome || "",
    },
  });

  const onSubmit = async (data) => {
    try {
      await dispatch(updateTags({ ...tag, ...data })).unwrap();
      await dispatch(fetchTags());
      onClose();
    } catch (error) {
      console.error("Erro ao atualizar tag:", error);
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
            Salvar
          </Button>
        </form>
      </Form>
    </div>
  );
};

export default EditTagsForm;
