import Image from "next/image";
import React from "react";

const DocxSteps = () => {
  return (
    <div className="flex flex-col items-center gap-5 md:gap-0">
      <div className="w-full flex flex-col-reverse md:grid md:grid-cols-2 place-items-center gap-5 md:gap-10">
        <Image
          width={500}
          height={500}
          alt="Docx Example"
          className="w-full md:h-[400px] rounded-md"
          src="/assets/layout-template.svg"
        />

        <div className="text-center md:text-left flex md:grid flex-col items-center">
          <h3>STEP 1</h3>
          <h1 className="!font-bold italic">Design Your Word Template</h1>

          <div className="!my-2 text-decor-line" />

          <p className="font-semibold">
            Design your template with Microsoft Word. Use Curly Braces to add
            attributes to your content.
          </p>
        </div>
      </div>

      <div className="w-full grid md:grid-cols-2 place-items-center gap-5 md:gap-10">
        <div className="text-center md:text-left flex md:grid flex-col items-center">
          <h3>STEP 2</h3>
          <h1 className="!font-bold italic">Upload & Generate the Document</h1>

          <div className="!my-2 text-decor-line" />

          <p className="font-semibold">
            By using the engine, Docxter will combine your data and design to
            produce the desired document.
          </p>
        </div>

        <Image
          width={500}
          height={500}
          alt="Docx Example"
          className="w-full md:h-[400px] rounded-md"
          src="/assets/upload-generate.svg"
        />
      </div>

      <div className="w-full flex flex-col-reverse md:grid md:grid-cols-2 place-items-center gap-5 md:gap-10">
        <Image
          width={500}
          height={500}
          alt="Docx Example"
          className="w-full md:h-[400px] rounded-md"
          src="/assets/download-template.svg"
        />

        <div className="text-center md:text-left flex md:grid flex-col items-center">
          <h3>STEP 3</h3>
          <h1 className="!font-bold italic">Download Your Output</h1>

          <div className="!my-2 text-decor-line" />

          <p className="font-semibold">
            After filling the Attributes form, Download your Templated Document.
          </p>
        </div>
      </div>

      <div className="text-center grid gap-2">
        <Image
          className="w-full h-full shadow-lg rounded-lg"
          width={1000}
          height={1000}
          src="/assets/final-output.png"
          alt="Final Template"
        />

        <span>Downloaded Template</span>
      </div>
    </div>
  );
};

export default DocxSteps;
