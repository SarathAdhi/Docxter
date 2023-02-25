import { delDoc } from "@/backend/lib";
import { useStore } from "@/utils/store";
import {
  Card,
  CardHeader,
  CardFooter,
  Button,
  Popover,
  PopoverTrigger,
  PopoverContent,
  PopoverHeader,
  PopoverBody,
  PopoverArrow,
  PopoverCloseButton,
} from "@chakra-ui/react";
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
}) => {
  const { getUserDocuments } = useStore();

  async function handleDocumentDelete(id: string, filePath?: string) {
    await delDoc("document", id, filePath);

    getUserDocuments();
  }

  return (
    <Card size="sm" width="full" className="!rounded-md">
      <CardHeader>
        <h1>{name}</h1>
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
