import Docxtemplater from "docxtemplater";
import PizZip from "pizzip";
import { useEffect, useState } from "react";
import { v4 } from "uuid";
import { toast } from "react-hot-toast";
import { getDownloadURL } from "firebase/storage";
import PageLayout from "@/common/layouts/PageLayout";
import FileUpload from "@/common/components/elements/FileUpload";
import { Button, Input, useDisclosure } from "@chakra-ui/react";
import { addDoc, fileUpload } from "@/backend/lib";
import Modal from "@/common/components/Modal";
import withAuth from "@/common/hoc/withAuth";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "@/backend/db";
import DataTypesForm from "@/modules/Docx/DataTypesForm";
import { useStore } from "@/utils/store";
import DocumentLimitExceededPage from "@/modules/Docx/DocumentLimitExceeded";
import { useRouter } from "next/router";
import Link from "next/link";
import { Timestamp } from "firebase/firestore";

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
  paragraphLoop: false,
  linebreaks: true,
};

function UploadPage() {
  const [user] = useAuthState(auth);

  const [file, setFile] = useState<File | null>();
  const [fileUrl, setFileUrl] = useState("");
  const [document, setDocument] = useState({
    name: "",
    id: "",
    uuid: "",
  });
  const [attributesName, setAttributesName] = useState<string[]>([]);
  const [attributesDataTypes, setAttributesDataTypes] = useState({});

  const { isOpen, onOpen, onClose } = useDisclosure();

  const { documents, getUserDocuments } = useStore();

  const router = useRouter();

  function generateDataTypesForm() {
    if (!fileUrl) return;

    loadFile(fileUrl, function (error: Error, content: string) {
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

      const removeDuplicateNames = new Set<string>(attributesName);

      setAttributesName([...removeDuplicateNames]);
    });
  }

  async function uploadDocument() {
    onClose();

    if (!file) return;

    const fileExtName = file.name.split(".")[1];

    const uuid = v4();

    const filePath = `${user?.uid}/${uuid}.${fileExtName}`;

    try {
      const { ref } = await fileUpload(filePath, file);

      toast.success("File Uploaded successfully");

      const fileLink = await getDownloadURL(ref);

      setFileUrl(fileLink);

      const res = await addDoc("document", {
        fileName: `${uuid}.${fileExtName}`,
        filePath,
        fileLink,
        uuid,
        name: document.name,
        attributes: {},
        user: user?.uid,
        createdAt: Timestamp.now(),
      });

      setDocument({
        ...document,
        id: res.id,
        uuid,
      });
    } catch (error) {
      toast.error("Something went wrong");
    }
  }

  const userDocumentLimit = documents.length >= 3;

  if (userDocumentLimit) return <DocumentLimitExceededPage />;

  return (
    <PageLayout
      title="Docxter | Upload"
      className="flex flex-col items-start gap-10"
    >
      <h4 className="w-full text-center">
        Upload your{" "}
        <Link
          className="text-blue-700 italic underline"
          href="/help#template-document"
        >
          Template Document
        </Link>{" "}
        here and give types for your attributes for validation.
      </h4>

      <div className="w-full grid place-content-center gap-2">
        <FileUpload
          name="excelFile"
          label="Upload you document"
          types={["docx", "odt"]}
          handleChange={(e) => {
            setFile(e);
            setDocument({
              ...document,
              name: e.name.split(".")[0],
            });

            onOpen();
          }}
          required
          multiple={false}
        />

        {file && (
          <Button
            onClick={generateDataTypesForm}
            isDisabled={!fileUrl && !document.name}
          >
            Generate Form
          </Button>
        )}
      </div>

      {attributesName.length !== 0 && (
        <DataTypesForm
          documentId={document.id}
          handleSelectChange={(key, value) =>
            setAttributesDataTypes({
              ...attributesDataTypes,
              [key]: value,
            })
          }
          handleSubmitCallBack={() => {
            setAttributesDataTypes({});
            setAttributesName([]);
            setFile(null);
            setFileUrl("");

            getUserDocuments();
            router.push(`/docx/${document.uuid}`);
          }}
          {...{ attributesDataTypes, attributesName }}
        />
      )}

      <Modal
        title="Save & Upload Document"
        isOpen={isOpen}
        onClose={onClose}
        closeOnOverlayClick={false}
        closeOnEsc={false}
        footer={
          <div className="space-x-3">
            <Button
              colorScheme={"red"}
              onClick={() => {
                onClose();
                setFile(null);
                setFileUrl("");
              }}
            >
              Cancel
            </Button>

            <Button colorScheme={"green"} onClick={uploadDocument}>
              Upload
            </Button>
          </div>
        }
        isCentered
      >
        <Input
          placeholder="Enter a name for your Document"
          value={document.name}
          onChange={(e) =>
            setDocument({
              ...document,
              name: e.target.value,
            })
          }
          onKeyDown={(e) => {
            if (e.key === "Enter") uploadDocument();
          }}
        />
      </Modal>
    </PageLayout>
  );
}

export default withAuth(UploadPage);
