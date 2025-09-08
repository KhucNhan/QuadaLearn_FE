import AuthLayout from "@/components/login_and_register/AuthLayout";
import RegisterForm from "@/components/login_and_register/RegisterForm";

export default function RegisterPage() {
  return (
    <AuthLayout type="register">
      <RegisterForm />
    </AuthLayout>
  );
}
