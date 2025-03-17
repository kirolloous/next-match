"use client";
import { loginSchema } from "@/lib/schemas/loginSchema";
import { Button, Card, CardBody, CardHeader, Input } from "@heroui/react";
import { useForm } from "react-hook-form";
import { GiPadlock } from "react-icons/gi";
import { zodResolver } from "@hookform/resolvers/zod";
import { signInUser } from "@/app/actions/authActions";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
const LoginForm = () => {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors, isValid, isSubmitting },
  } = useForm({
    resolver: zodResolver(loginSchema),
    mode: "onTouched",
  });
  const onSubmit = async (data) => {
    const result = await signInUser(data);
    if (result.status === "success") {
      router.push("/members");
      router.refresh();
      toast.success("Success Login");
    } else {
      toast.error(result.error);
    }
  };
  return (
    <Card className="w-2/5 mx-auto">
      <CardHeader className="flex flex-col items-center justify-center">
        <div className="flex flex-col gap-2 justify-center items-center text-secondary">
          <div className="flex flex-row items-center gap-3">
            <GiPadlock size={30} />
            <h1 className="text-3xl font-semibold">Login</h1>
          </div>
          <p className="text-neutral-500">Welcome Back to NextMatch</p>
        </div>
      </CardHeader>
      <CardBody>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="space-y-4">
            <Input
              defaultValue=""
              label="Email"
              variant="bordered"
              autoComplete="username"
              {...register("email")}
              isInvalid={!!errors?.email}
              errorMessage={errors.email?.message}
            />
            <Input
              defaultValue=""
              label="Password"
              type="password"
              variant="bordered"
              autoComplete="current-password"
              {...register("password")}
              isInvalid={!!errors?.password}
              errorMessage={errors.password?.message}
            />
            <Button
              fullWidth
              color="secondary"
              type="submit"
              isDisabled={!isValid}
              isLoading={isSubmitting}
            >
              Login
            </Button>
          </div>
        </form>
      </CardBody>
    </Card>
  );
};

export default LoginForm;
