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
import { updateCategory } from "@/Redux/Project/Action"; // agora importando updateCategory

const EditCategoryForm = ({ category, onClose }) => {
  const dispatch = useDispatch();

  const form = useForm({
    defaultValues: {
      nome: category?.nome || "",
    },
  });

  const onSubmit = (data) => {
    // Mescla os dados atuais da categoria com os dados do formulário
    dispatch(updateCategory({ ...category, ...data }));
    
    dispatch(fetchCategories());

    onClose();
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
            Salvar
          </Button>
        </form>
      </Form>
    </div>
  );
};

export default EditCategoryForm;
