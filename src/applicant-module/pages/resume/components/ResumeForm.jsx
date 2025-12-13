import { FcApproval } from "react-icons/fc";
import QualificationsSection from "./QualificationsSection";

const ResumeForm = ({
  details,
  setDetails,
  qualifications,
  setQualifications,
  loading,
  onSubmit,
}) => {
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setDetails((p) => ({ ...p, [name]: value }));
  };

  return (
    <form onSubmit={onSubmit}>
      <p className="text-2xl font-medium mb-4">Add Resume</p>

      <input
        name="title"
        value={details.title}
        onChange={handleInputChange}
        placeholder="Resume Title"
        className="border p-2 w-full rounded mb-4"
      />

      <QualificationsSection
        qualifications={qualifications}
        setQualifications={setQualifications}
      />

      <button
        disabled={loading}
        className="bg-green-600 text-white px-4 py-2 rounded w-full mt-4"
      >
        {loading ? "Saving..." : "Save Resume"}
      </button>
    </form>
  );
};

export default ResumeForm;
