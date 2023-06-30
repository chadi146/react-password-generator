import { Header, PasswordGenerator } from "@/components";
import Head from "next/head";

const generator = () => {
  return (
    <>
      <Head>
        <title>Password Generator Toolbox</title>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      </Head>
      <main>
        <Header withBackButton title="Password(s) Generator" />
        <PasswordGenerator />
      </main>
    </>
  );
};

export default generator;
