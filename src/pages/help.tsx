import PageLayout from "@/common/layouts/PageLayout";
import { Badge, Divider } from "@chakra-ui/react";
import Image from "next/image";
import Link from "next/link";
import React from "react";

const HelpPage = () => {
  return (
    <PageLayout title="Docxter | Help" className="flex flex-col gap-5">
      <section id="template-document" className="grid gap-4">
        <Link href={`/help#what-is-docxter`} className="group  flex gap-2">
          <h1 className="opacity-0 group-hover:opacity-100">#</h1>

          <h1 className="group-hover:underline">
            What is Docxter? & Why Docxter?
          </h1>
        </Link>

        <div className="mx-6 grid place-items-start gap-2">
          <p className="font-medium">
            Docxter is a software that automatically combines Microsoft Word
            templates with your chosen data to produce papers of extraordinary
            quality. It was created to endure repetitive generation across
            enormous numbers of documents. As a computerised document generator,
            Docxter eliminates the need for human processes, lowers expenses,
            and ensures compliance with customizable template controls to
            produce effective templates.
          </p>
        </div>
      </section>

      <Divider borderColor="black" />

      <section id="template-document" className="grid gap-4">
        <Link href={`/help#template-document`} className="group  flex gap-2">
          <h1 className="opacity-0 group-hover:opacity-100">#</h1>

          <h1 className="group-hover:underline">
            Template based Automated Document Creation
          </h1>
        </Link>

        <div className="mx-6 grid place-items-start gap-5">
          <div className="grid place-items-start gap-2">
            <Badge fontSize="20px" colorScheme="purple">
              What is Template Document?
            </Badge>

            <p className="font-medium">
              A template document is a Microsoft Word file that contains
              attributes within <em>square brackets</em>. This attributes will
              be replaced by the data that is give by you.
            </p>

            <div className="w-full grid lg:grid-cols-2 place-content-center gap-2">
              <Image
                width={600}
                height={600}
                className="rounded-md"
                src="/assets/document-template-ex.png"
                alt="Document template example"
              />

              <Image
                width={600}
                height={600}
                className="rounded-md"
                src="/assets/templated-doc-ex.png"
                alt="Templated Document example"
              />
            </div>
          </div>

          <div className="grid place-items-start gap-2">
            <Badge fontSize="20px" colorScheme="purple">
              Steps to automate this process
            </Badge>

            <p className="font-medium">
              Go to{" "}
              <Link href="/docx/upload" className="text-blue-600">
                Docx Upload
              </Link>{" "}
              and upload your Template Document, give your Document a name and
              generate the form to fill the datatypes of the attributes. Now you
              will be redirected to your Download Document page, fill all the
              attributes and download the document.
            </p>

            <h3 className="text-center !font-bold text-red-600 underline">
              NOTE: Your files will be deleted after 10 days.
            </h3>
          </div>
        </div>
      </section>
    </PageLayout>
  );
};

export default HelpPage;
