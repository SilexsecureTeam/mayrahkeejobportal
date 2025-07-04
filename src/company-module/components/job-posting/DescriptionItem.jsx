import { useEffect, useRef, useState } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

function DescriptionItem({ data, jobUtils }) {
  const [content, setContent] = useState(jobUtils.details[data.name] || "");
  const quillRef = useRef(null);

  const PLAIN_TEXT_LIMIT = data?.characters || 1000;

  const getPlainText = (html) => {
    const temp = document.createElement("div");
    temp.innerHTML = html;
    return temp.textContent || temp.innerText || "";
  };

  const plainText = getPlainText(content).trim();
  const isOverPlainTextLimit = plainText.length > PLAIN_TEXT_LIMIT;

  const handleChange = (html) => {
    const plain = getPlainText(html).trim();
    if (plain.length <= PLAIN_TEXT_LIMIT) {
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
      const plain = getPlainText(quill.root.innerHTML).trim();
      const available = PLAIN_TEXT_LIMIT - plain.length;

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
      const plain = getPlainText(quill.root.innerHTML).trim();
      const allowedKeys = [
        "Backspace",
        "Delete",
        "ArrowLeft",
        "ArrowRight",
        "ArrowUp",
        "ArrowDown",
        "Enter",
      ];
      if (plain.length >= PLAIN_TEXT_LIMIT && !allowedKeys.includes(e.key)) {
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
    <div className="flex flex-col md:flex-row border-b py-4 min-h-[220px]">
      <div className="flex flex-col w-full md:max-w-[25%] gap-[10px]">
        <h3 className="text-gray-700 text-sm font-semibold flex gap-1">
          {data.title}
          {data?.required && <strong className="text-red-500">*</strong>}
        </h3>
      </div>

      <div className="flex flex-col w-full text-gray-600 justify-between">
        <div className="min-h-[150px] max-h-[250px]">
          <ReactQuill
            ref={quillRef}
            placeholder={data.placeholder}
            value={content}
            onChange={handleChange}
            className="h-[150px] overflow-y-auto"
          />
        </div>

        <div className="text-[10px] flex flex-col gap-1 mt-2">
          <span
            className={
              isOverPlainTextLimit
                ? "text-red-500 font-semibold"
                : "text-gray-500"
            }
          >
            {plainText.length}/{PLAIN_TEXT_LIMIT} characters
          </span>

          {isOverPlainTextLimit && (
            <span className="text-red-500">
              You’ve exceeded the maximum number of characters allowed.
            </span>
          )}
        </div>
      </div>
    </div>
  );
}

export default DescriptionItem;
