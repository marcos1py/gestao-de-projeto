import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { login } from "@/Redux/Auth/Action";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { useState } from "react";

const Login = () => {
    const dispatch = useDispatch();
    const [error, setError] = useState("");

    const form = useForm({
        defaultValues: {
          email: "",
          password: ""
        },
    });

    const onSubmit = async (data) => {
        try {
            const response = await dispatch(login(data)).unwrap();
            if (!response.success) {
                setError("Usuário ou senha incorretos");
            }
        } catch (err) {
            setError("Usuário ou senha incorretos");
        }
    };

    return (
        <div className="space-y-5">
            <h1>Login</h1>
            {error && <p className="text-red-500 text-sm">{error}</p>}
            <Form {...form}>
                <form className="space-y-5" onSubmit={form.handleSubmit(onSubmit)}>
                    <FormField
                        control={form.control}
                        name="email"
                        render={({ field }) => (
                            <FormItem>
                                <FormControl>
                                    <Input
                                        {...field}
                                        type="text"
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
                        Sign In
                    </Button>
                </form>
            </Form>
        </div>
    );
};

export default Login;
