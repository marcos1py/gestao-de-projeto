/* eslint-disable react/prop-types */
import React, { useState } from "react";
import { Button } from "@/components/ui/Button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
  FormLabel,
} from "@/components/ui/form";
import { createAndamento } from "@/Redux/Andamento/Action";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

// Componentes de Dialog
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogFooter,
  DialogTitle,
} from "@/components/ui/dialog";

const CreateAndamentoForm = ({ issueId }) => {
  const dispatch = useDispatch();
  const [open, setOpen] = useState(false); // Estado para controlar abertura do Dialog

  const form = useForm({
    defaultValues: {
      content: "",
    },
  });

  const onSubmit = (data) => {
    dispatch(createAndamento({ issueId, content: data.content }));
    content= "",
    setOpen(false); // Fecha o Dialog após salvar
  };

  const modules = {
    toolbar: [
      [{ header: [1, 2, false] }],
      ["bold", "italic", "underline", "strike", "blockquote"],
      [{ list: "ordered" }, { list: "bullet" }, { indent: "-1" }, { indent: "+1" }],
      ["link", "image"],
      ["clean"],
    ],
  };

  return (
    <>
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-100">Andamentos</h1>
        <Button onClick={() => setOpen(true)}>Add Andamento</Button>
      </div>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="w-[600px] h-[600px] flex flex-col">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col flex-1 overflow-auto">
              <DialogHeader className="flex-shrink-0 p-4">
                <DialogTitle>Adicionar Andamento</DialogTitle>
              </DialogHeader>

              <div className="flex-1 overflow-y-auto p-4">
                <FormField
                  control={form.control}
                  name="content"
                  render={({ field }) => (
                    <FormItem>
                      <div className="flex items-start gap-3 mt-2">
                        <FormControl>
                          <ReactQuill
                            theme="snow"
                            value={field.value}
                            onChange={field.onChange}
                            placeholder="Adicione seu andamento aqui..."
                            modules={modules}
                            className="w-full h-full"
                          />
                        </FormControl>
                      </div>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <DialogFooter className="flex-shrink-0 p-4">
                <Button type="submit">Salvar</Button>
              </DialogFooter>
            </form>
          </Form>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default CreateAndamentoForm;
