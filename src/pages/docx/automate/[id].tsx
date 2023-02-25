import React, { useEffect, useState } from "react";
import Docxtemplater from "docxtemplater";
import PizZip from "pizzip";
import readXlsxFile from "read-excel-file";
import type { Row } from "read-excel-file";
import { toast } from "react-hot-toast";
import {
  Button,
  Divider,
  FormControl,
  FormLabel,
  Select,
  Spinner,
  Table,
  Th,
  Thead,
  Tr,
} from "@chakra-ui/react";
import withAuth from "@/common/hoc/withAuth";
import PageLayout from "@/common/layouts/PageLayout";
import saveAs from "file-saver";
import FileUpload from "@/common/components/elements/FileUpload";
import { useRouter } from "next/router";
import { where } from "firebase/firestore";
import { filterDoc } from "@/backend/lib";

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

const Automate = () => {
  const [excelRows, setExcelRows] = useState<Row[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [fileLink, setFileLink] = useState("");
  const [fileNameAttribute, setFileNameAttribute] = useState("");
  const [documentAttributeData, setDocumentAttributeData] = useState({});

  const router = useRouter();

  const id = router.query?.id || "";

  async function getCompanyDocument() {
    const data = await filterDoc("document", where("uuid", "==", id));

    setFileLink(data[0].fileLink);
    setDocumentAttributeData(data[0].attributes);

    setIsLoading(false);
  }

  useEffect(() => {
    if (id) getCompanyDocument();
  }, [id]);

  if (isLoading)
    return (
      <PageLayout className="grid place-content-center">
        <Spinner />
      </PageLayout>
    );

  function generateDocument() {
    if (!fileLink) return toast.error("File doesn't exist");

    if (excelRows.length === 0) return toast.error("Upload an Excel file");

    loadFile(fileLink, function (error: Error, content: string) {
      if (error) {
        throw error;
      }

      const headerNames = excelRows[0];
      const fileNameAttributeIndex = headerNames.filter(
        (e) => e === fileNameAttribute
      );

      excelRows.map((rows, index) => {
        if (index === 0) return;

        const zip = new PizZip(content);
        const doc = new Docxtemplater(zip, {
          paragraphLoop: true,
          linebreaks: true,
        });

        let newObj = {} as any;
        rows.map((e, i) => {
          newObj[headerNames[i] as string] = e;
        });

        doc.setData(newObj);

        try {
          doc.render();
        } catch (error) {}

        const out = doc.getZip().generate({
          type: "blob",
          mimeType:
            "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
        });

        saveAs(out, `${newObj[fileNameAttribute]}.docx`);
      });
    });
  }

  async function readExcelFile(e: File) {
    readXlsxFile(e).then((rows) => {
      setExcelRows(rows);
    });
  }

  const attributesArray =
    documentAttributeData && Object.keys(documentAttributeData);

  return (
    <PageLayout className="flex flex-col gap-5">
      <div className="grid gap-2">
        <h2>
          Upload your <strong>EXCEL</strong> file with the Attributes name and
          data as shown below.
        </h2>
        <h3>
          <em>Note: Order doesn't matter.</em>
        </h3>

        <Table mt={5}>
          <Thead>
            <Tr>
              {attributesArray.map((data, index) => (
                <Th key={data + index}>{data}</Th>
              ))}
            </Tr>
          </Thead>
        </Table>
      </div>

      <div className="mt-5 bg-slate-200 p-2 sm:p-4 rounded-md grid gap-5">
        <FormControl isRequired>
          <FormLabel>{"Rename your file(s) as ?"}</FormLabel>

          <Select
            variant="filled"
            onChange={(e) => setFileNameAttribute(e.target.value)}
          >
            {attributesArray.map((data, index) => (
              <option key={data + index} value={data}>
                {data}
              </option>
            ))}
          </Select>
        </FormControl>

        <Divider borderColor={"black"} />

        <div className="flex justify-between">
          <FileUpload
            name="excelFile"
            label="Upload you excel file"
            types={["xlsx", "csv"]}
            handleChange={readExcelFile}
            required
          />

          <Button
            h={"auto"}
            colorScheme="teal"
            isDisabled={excelRows.length === 0}
            onClick={generateDocument}
          >
            Download
          </Button>
        </div>
      </div>
    </PageLayout>
  );
};

export default withAuth(Automate);
