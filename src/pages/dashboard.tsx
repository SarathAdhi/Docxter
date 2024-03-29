import CompanyDocumentCard from "@/common/components/CompanyDocumentCard";
import PageLayout from "@/common/layouts/PageLayout";
import { useStore } from "@/utils/store";
import React, { useEffect } from "react";
import { useAutoAnimate } from "@formkit/auto-animate/react";
import withAuth from "@/common/hoc/withAuth";

const Employee = () => {
  const { documents, getUserDocuments } = useStore();
  const [parent] = useAutoAnimate();

  useEffect(() => {
    getUserDocuments();
  }, []);

  return (
    <PageLayout title="Docxter | Dashboard" className="flex flex-col gap-4">
      <h2>Your Documents {`(${documents.length} / 3)`}</h2>

      <div
        ref={parent}
        className="w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 place-content-center"
      >
        {documents.map((doc) => (
          <CompanyDocumentCard key={doc.uuid} {...doc} />
        ))}
      </div>
    </PageLayout>
  );
};

export default withAuth(Employee);
