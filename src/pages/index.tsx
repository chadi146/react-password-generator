import { Header } from "@/components";
import Head from "next/head";
import Link from "next/link";
import { CgPassword } from "react-icons/cg";
import { MdLockPerson } from "react-icons/md";
import { PiPasswordBold } from "react-icons/pi";

// TODO: add all features existing in https://passwordsgenerator.net/plus/
// TODO: implement google extension feature
// TODO: enhance light mode
// TODO: change a bit the UI/UX design
// TODO: at the end check for mem leakage and performance
const Index = () => {
  return (
    <>
      <Head>
        <title>React Password Genie Toolbox</title>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      </Head>
      <main>
        <Header title="My Password Genie" />

        <div className="main-page container no-padding">
          <MdLockPerson size={70} />
          <p>
            Welcome to Password Genie, your personal security assessor. Choose
            either one of the below options and start your investigation
          </p>
          <div className="links-container">
            <Link href="/generator" className="bg-light">
              <CgPassword size={55} />
              Generator
            </Link>
            <Link href="/uploader" className="bg-light">
              <PiPasswordBold size={55} />
              Evaluator
            </Link>
          </div>
        </div>
      </main>
    </>
  );
};
export default Index;
