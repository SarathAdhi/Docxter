import { updateDoc } from "@/backend/lib";
import { Document } from "@/common/types/document";
import { FORM_DATA_TYPES } from "@/utils/constants";
import { Button, FormControl, FormLabel, Select } from "@chakra-ui/react";
import React from "react";
import { toast } from "react-hot-toast";

type Props = {
  attributesDataTypes: {};
  documentId: Document["uuid"];
  attributesName: string[];
  handleSelectChange: (key: string, values: string) => void;
  handleSubmitCallBack: () => void;
};

const DataTypesForm: React.FC<Props> = ({
  attributesDataTypes,
  documentId,
  attributesName,
  handleSelectChange,
  handleSubmitCallBack,
}) => {
  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    console.log("HELLO");

    await updateDoc("document", documentId, {
      attributes: attributesDataTypes,
    });

    toast.success("Document and Data types uploaded successfully");

    handleSubmitCallBack();
  }

  return (
    <div className="bg-white rounded-md p-3 sm:p-5 grid gap-5 w-full">
      <form onSubmit={handleSubmit} className="grid place-items-end gap-5">
        <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-5">
          {attributesName.map((data, index) => (
            <FormControl key={data + index} isRequired>
              <FormLabel>{data}</FormLabel>

              <Select
                placeholder="Select option"
                defaultValue="string"
                value={(attributesDataTypes as any)[data]}
                onChange={(e) => handleSelectChange(data, e.target.value)}
              >
                {FORM_DATA_TYPES.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </Select>
            </FormControl>
          ))}
        </div>

        <Button colorScheme="green" type="submit">
          Submit
        </Button>
      </form>
    </div>
  );
};

export default DataTypesForm;
