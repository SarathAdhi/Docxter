import { where } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import Docxtemplater from "docxtemplater";
import PizZip from "pizzip";
import { saveAs } from "file-saver";
import { useRouter } from "next/router";
import { filterDoc } from "@/backend/lib";
import {
  Button,
  FormControl,
  FormLabel,
  Input,
  Spinner,
} from "@chakra-ui/react";
import { Document } from "@/common/types/document";
import PageLayout from "@/common/layouts/PageLayout";
import withAuth from "@/common/hoc/withAuth";
import { useAutoAnimate } from "@formkit/auto-animate/react";

let PizZipUtils: any;
if (typeof window !== "undefined") {
  import("pizzip/utils").then(function (r) {
    PizZipUtils = r;
  });
}

interface LoadFileProps {
  url: string;
  callback: (error: Error, data: string) => void;
}

function loadFile(
  url: LoadFileProps["url"],
  callback: LoadFileProps["callback"]
) {
  PizZipUtils.getBinaryContent(url, callback);
}

const ViewDocument = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [companyDocument, setCompanyDocument] = useState<Document | null>(null);
  const [documentAttributeData, setDocumentAttributeData] = useState({});

  const [parent] = useAutoAnimate({
    duration: 5000,
  });

  const router = useRouter();

  const id = router.query?.id || "";

  async function getCompanyDocument() {
    const data = await filterDoc("document", where("uuid", "==", id));

    setCompanyDocument(data[0]);

    setIsLoading(false);
  }

  useEffect(() => {
    if (id) getCompanyDocument();
  }, [id]);

  if (isLoading)
    return (
      <div className="h-screen grid place-content-center">
        <Spinner size="lg" className="w-10 h-10" />
      </div>
    );

  if (!companyDocument)
    return <h3 className="text-center">Document not found</h3>;

  const { fileLink, attributes, name, uuid } = companyDocument;

  const generateDocument = (e: React.FormEvent) => {
    e.preventDefault();

    loadFile(fileLink, async function (error: Error, content: string) {
      if (error) {
        throw error;
      }

      const zip = new PizZip(content);
      const doc = new Docxtemplater(zip, {
        paragraphLoop: true,
        linebreaks: true,
      });

      doc.setData(documentAttributeData);

      try {
        doc.render();
      } catch (error) {}

      const out = doc.getZip().generate({
        type: "blob",
        mimeType:
          "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
      });

      saveAs(out, `${name}.docx`);
    });
  };

  const attributesArray = attributes && Object.entries(attributes);

  return (
    <PageLayout>
      <form
        onSubmit={generateDocument}
        className="bg-white rounded-md p-5 grid place-items-start grid-cols-1 md:grid-cols-2 gap-5 w-full"
      >
        {attributesArray.map((attribute) => (
          <FormControl key={attribute[0]} label={attribute[0]} isRequired>
            <FormLabel>{attribute[0]}</FormLabel>

            <Input
              name={attribute[0]}
              placeholder={`Enter your variable ${attribute[0]}`}
              type={attribute[1] as string}
              onChange={(e) =>
                setDocumentAttributeData({
                  ...documentAttributeData,
                  [attribute[0]]: e.target.value,
                })
              }
            />
          </FormControl>
        ))}

        <Button type="submit" colorScheme="green">
          Download Document
        </Button>
      </form>
    </PageLayout>
  );
};

export default withAuth(ViewDocument);
