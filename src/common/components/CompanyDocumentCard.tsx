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
    <Card>
      <CardHeader>
        <h1>{name}</h1>
      </CardHeader>

      <CardFooter justify="space-between" gap={2}>
        <Popover placement="bottom-end">
          {({ isOpen, onClose }) => (
            <>
              <PopoverTrigger>
                <Button flex="1" colorScheme="red" variant="outline">
                  Delete
                </Button>
              </PopoverTrigger>

              <PopoverContent>
                <PopoverArrow />
                <PopoverCloseButton />
                <PopoverHeader>Are you sure you want to delete?</PopoverHeader>
                <PopoverBody className="flex justify-end gap-2">
                  <Button
                    flex="1"
                    colorScheme="red"
                    variant="outline"
                    onClick={onClose}
                  >
                    No
                  </Button>

                  <Button
                    flex="1"
                    colorScheme="red"
                    onClick={() => {
                      handleDocumentDelete(id, filePath).then(() => {
                        onClose();
                        getCompanyDocuments?.();
                      });
                    }}
                  >
                    Yes
                  </Button>
                </PopoverBody>
              </PopoverContent>
            </>
          )}
        </Popover>

        <Button
          as={Link}
          variant="outline"
          href={`/docx/automate/${uuid}`}
          flex="1"
          colorScheme="blue"
        >
          Automate
        </Button>

        <Button
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
