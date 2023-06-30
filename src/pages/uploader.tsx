import Header from "@/components/Header";
import PasswordUploader from "@/components/PasswordUploader";
import Head from "next/head";
import React from "react";

const uploader = () => {
  return (
    <>
      <Head>
        <title>Password Uploader Toolbox</title>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      </Head>
      <main>
        <Header title="Password(s) Uploader" />
        <PasswordUploader />
      </main>
    </>
  );
};

export default uploader;
