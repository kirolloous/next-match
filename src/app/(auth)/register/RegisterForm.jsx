"use client";
import { Button, Card, CardBody, CardHeader, Input } from "@heroui/react";
import { useForm } from "react-hook-form";
import { GiPadlock } from "react-icons/gi";
import { zodResolver } from "@hookform/resolvers/zod";
import { registerSchema } from "@/lib/schemas/registerSchema";
import { registerUser } from "@/app/actions/authActions";

const RegisterForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors, isValid, isSubmitting },
    setError,
  } = useForm({
    resolver: zodResolver(registerSchema),
    mode: "onTouched",
  });
  const onSubmit = async (data) => {
    const result = await registerUser(data);
    if (result.status === "success") {
      console.log("User registered successfully");
    } else {
      if (Array.isArray(result.error)) {
        result.error.forEach((e) => {
          const filedName = e.path.join(".");
          setError(filedName, { message: e.message });
        });
      } else {
        setError("root.serverError", { message: result.error });
      }
    }
  };
  return (
    <Card className="w-2/5 mx-auto">
      <CardHeader className="flex flex-col items-center justify-center">
        <div className="flex flex-col gap-2 justify-center items-center text-secondary">
          <div className="flex flex-row items-center gap-3">
            <GiPadlock size={30} />
            <h1 className="text-3xl font-semibold">Register</h1>
          </div>
          <p className="text-neutral-500">Welcome to NextMatch</p>
        </div>
      </CardHeader>
      <CardBody>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="space-y-4">
            <Input
              defaultValue=""
              label="Name"
              variant="bordered"
              autoComplete="name"
              {...register("name")}
              isInvalid={!!errors?.name}
              errorMessage={errors.name?.message}
            />
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
            {errors.root?.serverError && (
              <p className="text-danger text-sm text-center">
                {errors.root?.serverError.message}
              </p>
            )}
            <Button
              fullWidth
              color="secondary"
              type="submit"
              isDisabled={!isValid}
              isLoading={isSubmitting}
            >
              Register
            </Button>
          </div>
        </form>
      </CardBody>
    </Card>
  );
};

export default RegisterForm;
