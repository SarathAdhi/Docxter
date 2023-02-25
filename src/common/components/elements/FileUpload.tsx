import { FileUploader } from "react-drag-drop-files";
import { toast } from "react-hot-toast";

interface Props {
  name: string;
  types?: Array<string>;
  label?: string;
  maxSize?: number;
  required?: boolean;
  multiple?: boolean;
  handleChange: (file: File) => void;
}

const FileUpload: React.FC<Props> = ({
  name,
  types,
  label,
  maxSize,
  required = false,
  handleChange,
  multiple = false,
}) => {
  return (
    <FileUploader
      {...{ handleChange, name, types, maxSize, multiple, required }}
      label={label}
      onSizeError={() => toast.error("File size is too large!")}
      onTypeError={() => toast.error("File type is not supported!")}
    />
  );
};

export default FileUpload;
