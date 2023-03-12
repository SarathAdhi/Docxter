import PageLayout from "@/common/layouts/PageLayout";
import { Divider } from "@chakra-ui/react";
import Image from "next/image";
import React from "react";

const HomePage = () => {
  return (
    <PageLayout title="Docxter | Home" className="flex flex-col gap-10">
      <div className="grid place-content-center gap-5 h-[500px]">
        <h1 className="!font-black md:!text-5xl grid">
          <span>Automated creation of documents.</span>{" "}
          <span>Stop copying and pasting and save time by scripting.</span>
        </h1>

        <p className="font-medium !text-xl">
          Enterprises use a variety of template-based documents, from sales
          invoices to internal correspondence. Although time-saving, it is
          repetitive and subject to human mistake. Enterprises can easily
          automate document production with Docxter template-based document
          generation. Bringing together information and Microsoft Word layouts
          automatically.
        </p>
      </div>

      <Divider />

      <div className="flex flex-col items-center gap-20">
        <div className="w-full flex flex-col items-center md:flex-row justify-around gap-10">
          <Image
            width={500}
            height={500}
            alt="Docx Example"
            className="w-full md:w-80 lg:w-[500px] rounded-md"
            src="/assets/document-template-ex.png"
          />

          <div>
            <h3>STEP 1</h3>
            <h1 className="!font-bold italic">Design Your Word Template</h1>

            <div className="text-decor-line" />

            <p className="sm:w-[380px] font-semibold">
              Design your template with Microsoft Word. Use Curly Braces to add
              attributes to your content.
            </p>
          </div>
        </div>

        <div className="w-full flex flex-col-reverse items-center md:flex-row justify-around gap-10">
          <div>
            <h3>STEP 2</h3>
            <h1 className="!font-bold italic">Generate the Document</h1>

            <div className="text-decor-line" />

            <p className="sm:w-[380px] font-semibold">
              By using the engine, Docxter will combine your data and design to
              produce the desired document.
            </p>
          </div>

          <Image
            width={500}
            height={500}
            alt="Docx Example"
            className="w-full md:w-80 lg:w-[500px] rounded-md"
            src="/assets/download-docx.png"
          />
        </div>

        <div className="w-full flex flex-col items-center md:flex-row justify-around gap-10">
          <Image
            width={500}
            height={500}
            alt="Docx Example"
            className="w-full md:w-80 lg:w-[500px] rounded-md"
            src="/assets/templated-doc-ex.png"
          />

          <div>
            <h3>STEP 3</h3>
            <h1 className="!font-bold italic">Download Your Output</h1>

            <div className="text-decor-line" />

            <p className="sm:w-[380px] font-semibold">
              After filling the Attributes form, Download your Templated
              Document.
            </p>
          </div>
        </div>
      </div>
    </PageLayout>
  );
};

export default HomePage;
