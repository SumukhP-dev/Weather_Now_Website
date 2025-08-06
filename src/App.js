import logo from './logo.svg';
import './App.css';
import Head from "next/head";
import LoginForm from "./app/ui/login/LoginForm";

function App() {
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
};

export default App;
