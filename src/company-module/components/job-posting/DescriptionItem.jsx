import { useEffect, useRef, useState } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

function DescriptionItem({ data, jobUtils }) {
  const [content, setContent] = useState(jobUtils.details[data.name] || "");
  const quillRef = useRef(null);

  const PLAIN_TEXT_LIMIT = 1000;
  const HTML_LIMIT = 2000;

  const getPlainText = (html) => {
    const temp = document.createElement("div");
    temp.innerHTML = html;
    return temp.textContent || temp.innerText || "";
  };

  const plainText = getPlainText(content).trim();
  const htmlLength = content.length;

  const isOverPlainTextLimit = plainText.length > PLAIN_TEXT_LIMIT;
  const isOverHtmlLimit = htmlLength > HTML_LIMIT;

  const handleChange = (html) => {
    if (html.length <= HTML_LIMIT) {
      setContent(html);
      jobUtils.setDetails({ ...jobUtils.details, [data.name]: html });
    }
  };

  useEffect(() => {
    const quill = quillRef.current?.getEditor();
    if (!quill) return;

    const handlePaste = (e) => {
      e.preventDefault();
      const pastedText = e.clipboardData.getData("text");
      const currentHtml = quill.root.innerHTML;
      const currentLength = currentHtml.length;
      const available = HTML_LIMIT - currentLength;

      if (available <= 0) return;

      const textToInsert = pastedText.slice(0, available);
      quill.insertText(quill.getSelection()?.index || 0, textToInsert);

      setTimeout(() => {
        const updatedHtml = quill.root.innerHTML;
        setContent(updatedHtml);
        jobUtils.setDetails({ ...jobUtils.details, [data.name]: updatedHtml });
      }, 0);
    };

    const handleKeydown = (e) => {
      const currentLength = quill.root.innerHTML.length;
      const allowedKeys = [
        "Backspace",
        "Delete",
        "ArrowLeft",
        "ArrowRight",
        "ArrowUp",
        "ArrowDown",
        "Enter",
      ];
      if (currentLength >= HTML_LIMIT && !allowedKeys.includes(e.key)) {
        e.preventDefault();
      }
    };

    const quillRoot = quill.root;
    quillRoot.addEventListener("paste", handlePaste);
    quillRoot.addEventListener("keydown", handleKeydown);

    return () => {
      quillRoot.removeEventListener("paste", handlePaste);
      quillRoot.removeEventListener("keydown", handleKeydown);
    };
  }, [jobUtils.details, data.name]);

  return (
    <div className="flex flex-col md:flex-row border-b py-2 min-h-[180px]">
      <div className="flex flex-col w-full md:max-w-[25%] gap-[10px]">
        <h3 className="text-gray-700 text-sm font-semibold flex gap-1">
          {data.title}
          {data?.required && <strong className="text-red-500">*</strong>}
        </h3>
      </div>

      <div className="flex flex-col gap-[3px] w-full text-gray-600 justify-between">
        <div className="h-max max-h-24">
          <ReactQuill
            ref={quillRef}
            placeholder={data.placeholder}
            value={content}
            onChange={handleChange}
            className="h-[90%]"
          />
        </div>

        <div className="text-[10px] flex flex-col gap-1 mt-1">
          <span
            className={
              isOverPlainTextLimit
                ? "text-red-500 font-semibold"
                : "text-gray-500"
            }
          >
            {plainText.length}/{PLAIN_TEXT_LIMIT} characters
          </span>

          {isOverHtmlLimit && (
            <span className="text-red-500">
              Your input is too long for submission. Try reducing formatting or
              text.
            </span>
          )}
        </div>
      </div>
    </div>
  );
}

export default DescriptionItem;
