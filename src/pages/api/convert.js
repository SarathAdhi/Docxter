import docxConverter from "docx-pdf";

export default async function handler(req, res) {
  const { link } = req.body;

  console.log({ link });

  docxConverter(link, "./output.pdf", function (err, result) {
    if (err) {
      console.log(err);
    }
    console.log("result" + result);
  });

  return res.status(200).json({
    error: "",
    message: "Login successful",
  });
}
