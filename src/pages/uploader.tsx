import { Header, PasswordUploader } from "@/components";
import Head from "next/head";

const uploader = () => {
  return (
    <>
      <Head>
        <title>Password Uploader Toolbox</title>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      </Head>
      <main>
        <Header withBackButton title="Password(s) Uploader" />
        <PasswordUploader />
      </main>
    </>
  );
};

export default uploader;
