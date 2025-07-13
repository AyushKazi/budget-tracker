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
  username: z
    .string()
    .min(3, { message: "Username must be at least 4 characters" }),
  password: z
    .string()
    .min(6, { message: "Password must be at least 6 characters" }),
});

type SignUpFormSchema = z.infer<typeof formSchema>;

export default function SignUp() {
  const navigate = useNavigate();
  const { register } = useAuth();

  const [isloading, setIsLoading] = useState(false);
  const form = useForm<SignUpFormSchema>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      username: "",
      password: "",
    },
  });

  const onSubmit = async (data: SignUpFormSchema) => {
    // console.log("SignUp submitted:", data);

    try {
      setIsLoading(true);

      const result = await register(data.username, data.email, data.password);

      if (!result) {
        toast.error("Registration failed. Please try again.");
        return;
      }

      toast.success("Registration successful!");
      form.reset();
      navigate("/login");
    } catch (error) {
      toast.error(
        error instanceof Error ? error.message : "An unexpected error occurred."
      );
      console.error("Registration error:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen max-w-3xl container flex justify-center items-center mx-auto">
      <div className="flex flex-col items-center justify-center w-full ">
        <div className="text-center mb-8">
          <h1 className="text-3xl mb-4 font-medium">Budget Tracker</h1>
          <p className="text-sm">Manage your personal finances.</p>
        </div>
        <div className="w-full max-w-sm ">
          <h1 className="text-2xl font-bold text-center mb-6">SignUp</h1>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
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
                name="username"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input
                        placeholder="Enter your username"
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
                    <FormControl>
                      <Input
                        placeholder="Enter your password"
                        type="password"
                        {...field}
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
                {isloading ? "Signing Up..." : "Sign Up"}
              </Button>
            </form>
          </Form>
          <div className="text-center mt-4">
            <p className="text-sm">
              Already have an account? &nbsp;
              <Link
                to={"/login"}
                className="text-blue-500 underline hover:text-red-400"
              >
                {" "}
                Log In
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
