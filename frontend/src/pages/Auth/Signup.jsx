import { Button } from "@/components/ui/Button";
import { Form, FormControl, FormField, FormItem, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { register } from "@/Redux/Auth/Action";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { useState } from "react";

const Signup = () => {
    const dispatch = useDispatch();
    const [apiError, setApiError] = useState(""); // Estado para exibir erro geral

    const form = useForm({
        defaultValues: {
          fullName: "",
          email: "",
          password: ""
        },
      });

    const onSubmit = async (data) => {
        setApiError(""); // Limpa erros anteriores

        // Verifica se os campos estão preenchidos antes de enviar
        if (!data.fullName || !data.email || !data.password) {
            setApiError("Todos os campos são obrigatórios.");
            return;
        }

        try {
            const response = await dispatch(register(data)).unwrap();
            console.log("Registro bem-sucedido", response);
        } catch (error) {
            setApiError(error || "Erro ao cadastrar usuário.");
        }
    };

    return (
        <div className="space-y-5">
            <h1 className="text-center text-lg font-semibold">Register</h1>

            {apiError && <p className="text-red-500 text-sm text-center">{apiError}</p>} {/* Exibe erro geral */}

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
                    <Button type="submit" className="w-full mt-5">
                        Register
                    </Button>
                </form>
            </Form>
        </div>
    );
};

export default Signup;
""