import Head from "next/head";
import LoginForm from "./app/ui/login/LoginForm";

export default function LoginPage() {
  return (
    <>
      <div>
        <Head>
          <title>Login Page</title>
          <link rel="icon" href="/favicon.ico" />
        </Head>
        <main>
          <LoginForm />
        </main>
      </div>
    </>
  );
}
