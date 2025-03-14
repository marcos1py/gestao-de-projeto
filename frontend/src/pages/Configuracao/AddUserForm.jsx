import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormMessage } from "@/components/ui/form";
import { register } from "@/Redux/Auth/Action";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";

const AddUserForm = () => {
  const dispatch = useDispatch();
  const [apiError, setApiError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const form = useForm({
    defaultValues: {
      fullName: "",
      email: "",
      password: ""
    },
  });

  const onSubmit = async (data) => {
    setApiError("");
    setSuccessMessage("");

    if (!data.fullName || !data.email || !data.password) {
      setApiError("Todos os campos são obrigatórios.");
      return;
    }

    try {
      const response = await dispatch(register(data)).unwrap();
      console.log("Registro bem-sucedido", response);
      setSuccessMessage("Usuário adicionado com sucesso!");
      form.reset(); // Limpa os inputs
    } catch (error) {
      setApiError(error || "Erro ao cadastrar usuário.");
    }
  };

  return (
    <>
      <h3 className="text-xl font-semibold mb-4">Adicionar Usuário</h3>
      {apiError && <p className="text-red-500 text-sm text-center">{apiError}</p>}
      {successMessage && <p className="text-green-500 text-sm text-center">{successMessage}</p>}
      <Form {...form}>
        <form className="space-y-5" onSubmit={form.handleSubmit(onSubmit)}>
          <FormField
            control={form.control}
            name="fullName"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input
                    {...field}
                    type="text"
                    className="border w-full border-gray-700 py-5 px-5"
                    placeholder="Full Name..."
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input
                    {...field}
                    type="email"
                    className="border w-full border-gray-700 py-5 px-5"
                    placeholder="Email..."
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input
                    {...field}
                    type="password"
                    className="border w-full border-gray-700 py-5 px-5"
                    placeholder="Password..."
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit" className="mt-5">
            Adicionar Usuário
          </Button>
        </form>
      </Form>
    </>
  );
};

export default AddUserForm;
