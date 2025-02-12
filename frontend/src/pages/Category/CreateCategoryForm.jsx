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
import { useDispatch } from "react-redux";
import { createCategory } from "@/Redux/Project/Action";

const CreateCategoryForm = ({ onClose }) => {
  const dispatch = useDispatch();

  const form = useForm({
    defaultValues: {
      nome: "",
    },
  });

  const onSubmit = async (data) => {
    try {
      // Despacha a ação e espera a conclusão (usando unwrap se for createAsyncThunk)
      await dispatch(createCategory(data)).unwrap();
      // Se a criação for bem-sucedida, fecha o dialog
      onClose();
    } catch (error) {
      console.error("Erro ao criar categoria:", error);
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
                    placeholder="Category name..."
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button type="submit" className="w-full mt-5">
            Create category
          </Button>
        </form>
      </Form>
    </div>
  );
};

export default CreateCategoryForm;
