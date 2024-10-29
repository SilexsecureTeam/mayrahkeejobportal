function ProgressBar({ measured, total }) {
  const progress = (measured / total) * 100;
  return (
    <div className="w-full overflow-x-hidden h-[5px]  bg-gray-300">
      <div
        style={{ width: `${progress}%` }}
        className="h-full bg-primaryColor"
      />
    </div>
  );
}

export default ProgressBar;
