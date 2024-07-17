import Spinner from "./Spinner";
function FormButton({ children, loading, onClick, height = 'h-[45px]', width = 'w-full' }) {
  return onClick ? (
    <button
      onClick={onClick}
      className={`text-little ${
        !loading
          ? "hover:text-[13px] hover:scale-105 duration-75"
          : "hover:text-little hover:scale-100 duration-75"
      } relative ${width} ${height}  font-semibold text-white bg-primaryColor  rounded-md`}
    >
      {children}
      {loading && <Spinner />}
    </button>
  ) : (
    <button
      type="submit"
      className={`text-small ${
        !loading
          ? "hover:text-[13px] hover:scale-105 duration-75"
          : "hover:text-little hover:scale-100 duration-75"
      } relative ${width} ${height}  font-semibold text-white bg-primaryColor  rounded-md`}
    >
      {children}
      {loading && <Spinner />}
    </button>
  );
}

export default FormButton;
