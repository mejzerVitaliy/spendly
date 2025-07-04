import { TwoFactorForm } from "@/features/two-factor";

export default function TwoFactorPage() {
  return (
    <div className="flex w-full h-screen justify-center items-center py-4">
      <div className="w-full py-8">
        <TwoFactorForm />
      </div>
    </div>
  );
} 