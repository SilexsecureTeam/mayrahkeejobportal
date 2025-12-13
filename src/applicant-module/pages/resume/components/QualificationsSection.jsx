import { qualificationOptions } from "../../../../utils/formFields";
import { toast } from "react-toastify";

const QualificationsSection = ({ qualifications, setQualifications }) => {
  const addQualification = () =>
    setQualifications((p) => [
      ...p,
      {
        awarding_institution: "",
        qualification_title: "",
        year_attended: "",
        year_of_graduation: "",
        course_studied: "",
      },
    ]);

  const update = (i, field, value) => {
    const copy = [...qualifications];
    copy[i][field] = value;
    setQualifications(copy);
  };

  const remove = (i) => {
    if (qualifications.length === 1) {
      toast.error("At least one qualification is required");
      return;
    }
    setQualifications((p) => p.filter((_, idx) => idx !== i));
  };

  return (
    <>
      <p className="font-medium text-lg my-4">Qualifications</p>

      {qualifications.map((q, i) => (
        <div key={i} className="border p-4 mb-4 rounded bg-gray-50">
          <div className="flex justify-between mb-2">
            <span>Qualification #{i + 1}</span>
            {i > 0 && (
              <button onClick={() => remove(i)} className="text-red-500">
                Remove
              </button>
            )}
          </div>

          <input
            value={q.awarding_institution}
            onChange={(e) => update(i, "awarding_institution", e.target.value)}
            placeholder="Awarding Institution"
            className="border p-2 w-full mb-2 rounded"
          />

          <select
            value={q.qualification_title}
            onChange={(e) => update(i, "qualification_title", e.target.value)}
            className="border p-2 w-full mb-2 rounded"
          >
            <option value="">Select Qualification</option>
            {qualificationOptions.map((opt) => (
              <option key={opt} value={opt}>
                {opt}
              </option>
            ))}
          </select>

          <input
            type="number"
            placeholder="Year of Entry"
            value={q.year_attended}
            onChange={(e) =>
              update(i, "year_attended", e.target.value.slice(0, 4))
            }
            className="border p-2 w-full mb-2 rounded"
          />

          <input
            type="number"
            placeholder="Year of Graduation"
            value={q.year_of_graduation}
            onChange={(e) =>
              update(i, "year_of_graduation", e.target.value.slice(0, 4))
            }
            className="border p-2 w-full mb-2 rounded"
          />

          <input
            value={q.course_studied}
            onChange={(e) => update(i, "course_studied", e.target.value)}
            placeholder="Course Studied"
            className="border p-2 w-full rounded"
          />
        </div>
      ))}

      <button
        type="button"
        onClick={addQualification}
        className="bg-green-600 text-white px-4 py-2 rounded"
      >
        + Add Qualification
      </button>
    </>
  );
};

export default QualificationsSection;
