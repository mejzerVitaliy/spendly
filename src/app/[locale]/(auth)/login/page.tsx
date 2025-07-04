import { LoginForm } from "@/features/login";

export default function RegistrationPage() {
  return (
    <div className="flex w-full h-screen justify-center items-center py-4">
      <div className="w-full py-8">
        <LoginForm />
      </div>
    </div>
  );
}