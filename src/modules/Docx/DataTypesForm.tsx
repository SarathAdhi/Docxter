import { updateDoc } from "@/backend/lib";
import { Document } from "@/common/types/document";
import { FORM_DATA_TYPES } from "@/utils/constants";
import { Button, FormControl, FormLabel, Select } from "@chakra-ui/react";
import { useAutoAnimate } from "@formkit/auto-animate/react";
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

    await updateDoc("document", documentId, {
      attributes: attributesDataTypes,
    });

    toast.success("Document and Data types uploaded successfully");

    handleSubmitCallBack();
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white rounded-md p-3 sm:p-5 grid place-items-start grid-cols-1 md:grid-cols-2 gap-5 w-full"
    >
      {attributesName.map((data, index) => (
        <FormControl key={data + index} isRequired>
          <FormLabel>{data}</FormLabel>

          <Select
            placeholder="Select option"
            defaultValue="string"
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

      <Button type="submit">Submit</Button>
    </form>
  );
};

export default DataTypesForm;
