export default function ArtisanIDSection({
  register,
  idFile,
  setIdFile,
  existingIdUpload, // 👈 e.g. a URL or truthy value if ID is already uploaded
}) {
  const handleFileChange = (e) => {
    const file = e.target.files[0];

    if (!file) return;

    const allowedTypes = ["image/jpeg", "image/png"];
    if (!allowedTypes.includes(file.type)) {
      alert("Only JPG or PNG files are allowed");
      return;
    }

    if (file.size > 1024 * 1024) {
      alert("File size must be less than 1MB");
      return;
    }

    setIdFile(file);
  };

  const hasExistingId = !!existingIdUpload;

  return (
    <div className="col-span-2 grid grid-cols-2 gap-4 border-t pt-4">
      <div className="flex flex-col gap-1">
        <label>
          Means of Identification <span className="text-red-500">*</span>
        </label>
        <select
          {...register("means_of_identification", { required: true })}
          defaultValue=""
          className="p-1 border border-gray-900 rounded-md"
        >
          <option disabled value="">
            -- Select Means of Identification --
          </option>
          <option value="NIN">NIN</option>
          <option value="Driver's License">Driver's License</option>
          <option value="Voter's Card">Voter's Card</option>
          <option value="National ID">National ID</option>
          <option value="Others">Others</option>
        </select>
      </div>

      <div className="flex flex-col gap-1">
        <label>
          Upload ID Image {/* only required when there is no existing ID */}
          {!hasExistingId && <span className="text-red-500">*</span>}
        </label>
        <input
          type="file"
          accept="image/png, image/jpeg"
          onChange={handleFileChange}
          // required only if no existing upload and no new file selected
          required={!hasExistingId && !idFile}
          className="p-1 border border-gray-900 rounded-md"
        />

        {hasExistingId && !idFile && (
          <small className="text-xs text-green-600">
            An ID image is already uploaded. You can upload a new one to replace
            it (optional).
          </small>
        )}

        {idFile && (
          <small className="text-xs text-blue-600">
            Selected file: {idFile.name}
          </small>
        )}

        <small className="text-xs text-gray-500">
          Max file size: 1MB (JPG or PNG)
        </small>
      </div>
    </div>
  );
}
