import Header from "@/components/Header";
import PasswordGenerator from "@/components/PasswordGenerator";
import Head from "next/head";
import React from "react";

const generator = () => {
  return (
    <>
      <Head>
        <title>Password Generator Toolbox</title>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      </Head>
      <main>
        <Header title="Password(s) Generator" />
        <PasswordGenerator />
      </main>
    </>
  );
};

export default generator;
