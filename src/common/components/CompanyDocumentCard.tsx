import { delDoc } from "@/backend/lib";
import { isDayTenToday } from "@/utils/daysDifference";
import { useStore } from "@/utils/store";
import { Card, CardHeader, CardFooter, Button } from "@chakra-ui/react";
import Link from "next/link";
import React from "react";
import { Document } from "../types/document";

type Props = {
  getCompanyDocuments?: () => void;
} & Document;

const CompanyDocumentCard: React.FC<Props> = ({
  id,
  name,
  filePath,
  uuid,
  getCompanyDocuments,
  createdAt,
}) => {
  const { getUserDocuments } = useStore();

  async function handleDocumentDelete(id: string, filePath?: string) {
    await delDoc("document", id, filePath);

    getUserDocuments();
  }

  const isDayTen = isDayTenToday(createdAt);

  return (
    <Card size="sm" width="full" className="!rounded-md">
      <CardHeader>
        <h3>
          {name}{" "}
          {isDayTen && (
            <span className="text-base text-red-500">{`(Document Deleted)`}</span>
          )}
        </h3>
      </CardHeader>

      <CardFooter className="!flex !flex-wrap gap-2">
        <Button
          className="!text-xs sm:!text-base"
          flex="1"
          colorScheme="red"
          variant="outline"
          onClick={() => {
            handleDocumentDelete(id, filePath).then(() => {
              getCompanyDocuments?.();
            });
          }}
        >
          Delete
        </Button>

        <Button
          className="!text-xs sm:!text-base"
          as={Link}
          variant="outline"
          href={`/docx/automate/${uuid}`}
          flex="1"
          colorScheme="blue"
        >
          Automate
        </Button>

        <Button
          className="!text-xs sm:!text-base"
          as={Link}
          variant="outline"
          href={`/docx/${uuid}`}
          flex="1"
          colorScheme="green"
        >
          Download
        </Button>
      </CardFooter>
    </Card>
  );
};

export default CompanyDocumentCard;
