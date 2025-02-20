import NavBar from "@/app/ui/NavBar";
import LoginForm from "../ui/login/LoginForm";

export default function LoginPage() {
  return (
    <>
      <NavBar />
      <main className="flex items-center justify-center md:h-screen">
        <div className="relative mx-auto flex w-full max-w-[400px] flex-col space-y-2.5 p-4 md:-mt-32">
          <LoginForm />
        </div>
      </main>
    </>
  );
}
