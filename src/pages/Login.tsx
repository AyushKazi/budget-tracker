import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";
import { useState } from "react";
import { toast } from "sonner";

const formSchema = z.object({
  email: z.string().email({ message: "Invalid email" }),
  password: z
    .string()
    .min(6, { message: "Password must be at least 6 characters" }),
});

type LoginFormSchema = z.infer<typeof formSchema>;

export default function Login() {
  const [isloading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const { login } = useAuth();
  const form = useForm<LoginFormSchema>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = async (data: LoginFormSchema) => {
    // console.log("Form submitted:", data);

    try {
      setIsLoading(true);
      const result = await login(data.email, data.password);

      if (!result) {
        toast.error("Login failed. Please check your credentials.");
        return;
      }

      toast.success("Login successful!");
      navigate("/");
      form.reset();
    } catch (error) {
      //   console.error("Login error:", error);
      toast.error(
        `${error instanceof Error ? error.message : "Unknown error"}`
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <div className="min-h-screen max-w-3xl  container flex justify-center items-center mx-auto">
        <div className="flex flex-col items-center justify-center w-full ">
          <div className="text-center mb-8">
            <h1 className="text-3xl mb-4 font-medium">Budget Tracker</h1>
            <p className="text-sm">Manage your personal finances.</p>
          </div>
          <div className="w-full max-w-sm ">
            <h1 className="text-2xl font-bold text-center mb-6">Login</h1>
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-8"
              >
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      {/* <FormLabel>Email</FormLabel> */}
                      <FormControl>
                        <Input
                          placeholder="Enter your email"
                          {...field}
                          className="placeholder:text-gray-400"
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
                      {/* <FormLabel>Password</FormLabel> */}
                      <FormControl>
                        <Input
                          placeholder="Enter your password"
                          {...field}
                          type="password"
                          className="placeholder:text-gray-400"
                        />
                      </FormControl>

                      <FormMessage />
                    </FormItem>
                  )}
                />
                <Button
                  type="submit"
                  className="w-full hover:cursor-pointer"
                  disabled={isloading}
                >
                  {isloading ? "Logging In..." : "Login"}
                </Button>
              </form>
            </Form>
            <div className="text-center mt-4">
              <p className="text-sm">
                Don't have an account? &nbsp;
                <Link
                  to={"/register"}
                  className="text-blue-500 underline hover:text-red-400"
                >
                  {" "}
                  Sign Up
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
