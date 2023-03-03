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
import DataTypesForm from "@/modules/Docx/DataTypesForm";
import { isDayTenToday } from "@/utils/daysDifference";

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

const options = {
  paragraphLoop: true,
  linebreaks: true,
};

const ViewDocument = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [document, setDocument] = useState<Document | null>(null);
  const [documentAttributeData, setDocumentAttributeData] = useState({});
  const [attributesName, setAttributesName] = useState<string[]>([]);
  const [attributesDataTypes, setAttributesDataTypes] = useState({});

  const router = useRouter();

  const id = router.query?.id || "";

  async function getDocument() {
    const data = await filterDoc("document", where("uuid", "==", id));

    setDocument(data[0]);

    if (data) {
      const _attributesArray = data[0].attributes
        ? Object.entries(data[0].attributes)
        : [];

      const _isAttributesFilled = _attributesArray?.length !== 0;

      if (!_isAttributesFilled) generateDataTypesForm(data[0].fileLink);
    }

    setIsLoading(false);
  }

  useEffect(() => {
    if (id) getDocument();
  }, [id]);

  if (isLoading)
    return (
      <div className="h-screen grid place-content-center">
        <Spinner size="lg" className="w-10 h-10" />
      </div>
    );

  if (!document) return <h3 className="text-center">Document not found</h3>;

  const { fileLink, attributes, name, createdAt, id: documentId } = document;

  const isDayTen = isDayTenToday(createdAt);

  if (isDayTen)
    return (
      <h2 className="text-center">
        The document have been expired and deleted.
      </h2>
    );

  function generateDataTypesForm(fileLink: string) {
    if (!fileLink) return;

    loadFile(fileLink, function (error: Error, content: string) {
      if (error) throw error;

      const zip = new PizZip(content);
      const doc = new Docxtemplater(zip, options);

      const text = doc.getFullText();

      const regx = /{([^}]+)}/g;

      let attributesName = text.match(regx) as string[];

      attributesName = attributesName?.map((e) => e.replace(/[\])}[{(]/g, ""));

      const initialValues = attributesName?.reduce(
        (pre, cur) => ({ ...pre, [cur]: "string" }),
        {}
      );

      setAttributesDataTypes(initialValues);

      setAttributesName(attributesName);
    });
  }

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

  const attributesArray = attributes ? Object.entries(attributes) : [];

  const isAttributesFilled = attributesArray.length !== 0;

  const FillDataTypesForm = () => (
    <>
      {attributesName.length !== 0 && (
        <DataTypesForm
          documentId={documentId}
          handleSelectChange={(key, value) =>
            setAttributesDataTypes({
              ...attributesDataTypes,
              [key]: value,
            })
          }
          handleSubmitCallBack={() => {
            setDocument({ ...document, attributes: attributesDataTypes });

            setAttributesDataTypes({});
            setAttributesName([]);
          }}
          {...{ attributesDataTypes, attributesName }}
        />
      )}
    </>
  );

  return (
    <PageLayout title={`Docx - ${document.name}`}>
      {isAttributesFilled ? (
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
      ) : (
        <FillDataTypesForm />
      )}
    </PageLayout>
  );
};

export default withAuth(ViewDocument);
