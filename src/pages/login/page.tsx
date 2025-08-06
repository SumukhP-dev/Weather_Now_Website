import NavBar from "@/react-weather-now-website/src/components/NavBar";
import LoginForm from "../../react-weather-now-website/src/components/login/LoginForm";

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
