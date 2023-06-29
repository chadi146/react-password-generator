import PasswordGenerator from "@/components/PasswordGenerator";
import ThemeSwitcher from "@/components/ThemeSwitcher";
import Head from "next/head";

// TODO: add all features existing in https://passwordsgenerator.net/plus/
// TODO: implement google extension feature
// TODO: enhance light mode
// TODO: change a bit the UI/UX design
// TODO: at the end check for mem leakage and performance
const Index = () => {
  return (
    <>
      <Head>
        <title>React Password Generator Toolbox</title>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      </Head>
      <main>
        <div className="header">
          <h1 className="color-light fs-md text-center">Password Generator</h1>
          <ThemeSwitcher />
        </div>

        <PasswordGenerator />
      </main>
    </>
  );
};
export default Index;
