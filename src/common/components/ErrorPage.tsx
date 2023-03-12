import React from "react";
import PageLayout from "../layouts/PageLayout";

const ErrorPage = ({ text = "" }) => {
  return (
    <PageLayout className="grid place-content-center">
      <h1 className="text-center text-red-700">{text}</h1>
    </PageLayout>
  );
};

export default ErrorPage;
