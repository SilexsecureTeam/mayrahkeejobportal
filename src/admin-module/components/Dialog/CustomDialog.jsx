import React, { useState } from "react";
import { Dialog } from "primereact/dialog";
import { Button } from "primereact/button";
import { FaExclamationCircle } from "react-icons/fa";

const CustomDialog = ({ header, fetchData, buttonLabel }) => {
  const [visible, setVisible] = useState(false);
  const [content, setContent] = useState("");
  const [loading, setLoading] = useState(false);

  const handleOpen = async () => {
    setVisible(true);
    setLoading(true);
    const data = await fetchData();
    setContent(data);
    setLoading(false);
  };

  return (
    <div className="card flex flex-col space-y-4">
      <button
        className="card flex flex-col justify-center items-center space-y-4 bg-blue-300 px-2 py-2 "
        onClick={handleOpen}
      >
        {buttonLabel}
      </button>
      <Dialog
        header={header}
        visible={visible}
        style={{ width: "50vw" }}
        onHide={() => setVisible(false)}
      >
        {loading ? (
          <p>Loading...</p>
        ) : content ? (
          <p className="m-0">{content}</p>
        ) : (
          <div className="flex items-center gap-2 text-red-500">
            <FaExclamationCircle className="text-xl" />
            <span>Not Found</span>
          </div>
        )}
      </Dialog>
    </div>
  );
};

export default CustomDialog;