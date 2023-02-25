import PageLayout from "@/common/layouts/PageLayout";
import React from "react";

const DocumentLimitExceededPage = () => {
  return (
    <PageLayout title="Docx limit exceeded">
      <h2 className="text-center">
        Your Document limit has been exceeded. Delete some of your document to
        continue.
      </h2>
    </PageLayout>
  );
};

export default DocumentLimitExceededPage;
