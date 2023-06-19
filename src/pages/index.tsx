import { auth } from "@/backend/db";
import { useFirebaseLogin } from "@/common/hooks/useFirebaseLogin";
import PageLayout from "@/common/layouts/PageLayout";
import DocxSteps from "@/modules/Home/DocxSteps";
import { Button, Divider } from "@chakra-ui/react";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { useAuthState } from "react-firebase-hooks/auth";

const HomePage = () => {
  const [user, loading] = useAuthState(auth);
  const { handleLogin } = useFirebaseLogin();

  return (
    <PageLayout title="Docxter | Home" className="flex flex-col gap-10">
      <div className="grid xl:grid-cols-2 gap-4">
        <div className="bg-[#d2f2ff] p-4 md:p-8 rounded-md flex flex-col justify-between gap-4">
          <h2 className="!font-bold">
            Transform Document Production with Docxter
          </h2>

          <span>
            Enterprises rely on a multitude of template-based documents, ranging
            from sales invoices to internal correspondence. While these
            templates save time, they often lead to repetitive tasks and are
            susceptible to human errors. Introducing Docxter, the ultimate
            solution to automate your document production process effortlessly.
          </span>

          {user ? (
            <Button colorScheme="blue" as={Link} href="/docx/upload">
              Upload your document
            </Button>
          ) : (
            <Button onClick={handleLogin}>Login</Button>
          )}
        </div>

        <div className="bg-[#deebfd] p-4 md:p-8 rounded-md flex flex-col md:flex-row items-center gap-4 sm:gap-8">
          <div className="grid gap-4">
            <h3>Streamline and Save Time</h3>

            <span>
              With Docxter, you can bid farewell to manual document creation.
              Our powerful platform allows you to streamline your workflow by
              automating the generation of template-based documents. Say goodbye
              to tedious copy-pasting and formatting. Docxter empowers you to
              focus on more important tasks while saving valuable time.
            </span>
          </div>

          <Image
            className="w-60 h-60 sm:w-40 sm:h-40 rounded-lg"
            width={500}
            height={500}
            src="/assets/save-time.svg"
            alt="Hero Image 1"
          />
        </div>

        <div className="bg-[#fbeace] p-4 md:p-8 rounded-md flex flex-col md:flex-row items-center gap-4 sm:gap-8">
          <div className="grid gap-4">
            <h3>Eliminate Human Errors</h3>

            <span>
              Human mistakes can lead to costly consequences. Docxter ensures
              accuracy and consistency in your document production. By
              automatically bringing together information and Microsoft Word
              layouts, we eliminate the risk of errors caused by manual data
              entry or formatting discrepancies. Rest easy knowing your
              documents are error-free.
            </span>
          </div>

          <Image
            className="w-60 h-60 sm:w-40 sm:h-40 rounded-lg"
            width={500}
            height={500}
            src="/assets/human-errors.svg"
            alt="Hero Image 1"
          />
        </div>

        <div className="bg-[#fbe6f8]  p-4 md:p-8 rounded-md flex flex-col md:flex-row items-center gap-4 sm:gap-8">
          <div className="grid gap-4">
            <h3>Integration and Ease of Use</h3>

            <span>
              Docxter seamlessly integrates with your existing systems, ensuring
              a smooth transition to automated document generation. Our
              user-friendly interface makes it easy for anyone on your team to
              create and manage templates, without the need for extensive
              technical knowledge. Harness the power of automation with Docxter.
            </span>
          </div>

          <Image
            className="w-60 h-60 sm:w-40 sm:h-40 rounded-lg"
            width={500}
            height={500}
            src="/assets/interconnected-devices.svg"
            alt="Hero Image 1"
          />
        </div>
      </div>

      <Divider />

      <DocxSteps />
    </PageLayout>
  );
};

export default HomePage;
