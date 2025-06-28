import { ImUpload2 } from "react-icons/im";

export default function ProfileImageUpload({ imageUrl, handleImageChange }) {
  return (
    <div className="flex flex-col items-center gap-1 border-b pb-4">
      <h3 className="font-semibold text-lg">Profile Image</h3>
      <div className="h-[100px] w-[100px] border border-[#dee2e6] rounded-full flex items-center justify-center overflow-hidden text-gray-500">
        <label
          htmlFor="profile-image"
          className="flex flex-col items-center cursor-pointer"
        >
          {imageUrl ? (
            <img src={imageUrl} className="h-full object-cover" />
          ) : (
            <ImUpload2 size={20} />
          )}
          <span className="text-xs">Upload pic</span>
        </label>
        <input
          type="file"
          id="profile-image"
          accept="image/jpeg,image/png,image/jpg"
          onChange={handleImageChange}
          className="hidden"
        />
      </div>
      <small className="text-gray-500 text-xs">Max file size: 1MB</small>
    </div>
  );
}
