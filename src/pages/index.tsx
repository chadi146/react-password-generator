import PasswordGenerator from "@/components/PasswordGenerator";
import ThemeSwitcher from "@/components/ThemeSwitcher";
import Head from "next/head";

const Index = () => {
  return (
    <>
      <Head>
        <title>React Password Generator Toolbox</title>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      </Head>
      <main>
        <div
          style={{
            position: "fixed",
            width: "100%",
            height: "50px",
            top: "0",
            left: "0",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <h1 className="color-light fs-md text-center">Password Generator</h1>
          <ThemeSwitcher />
        </div>

        <PasswordGenerator />
      </main>
    </>
  );
};
export default Index;
