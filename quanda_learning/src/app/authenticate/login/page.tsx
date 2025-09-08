import AuthLayout from "@/components/login_and_register/AuthLayout";
import LoginForm from "@/components/login_and_register/LoginForm";

export default function LoginPage() {
  return (
    <AuthLayout type="login">
      <LoginForm />
    </AuthLayout>
  );
}
