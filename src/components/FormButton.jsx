import Spinner from "./Spinner";


function FormButton({ children, loading, onClick, height = 'h-[45px]', width = 'w-full bg-primaryColor text-white   ' }) {
  return onClick ? (
    <button
      onClick={onClick}
      className={`overflow-hidden text-little ${
        !loading
          ? "hover:text-[13px] hover:scale-105 duration-75"
          : "hover:text-little hover:scale-100 duration-75"
      } relative ${width} ${height}  font-semibold    rounded-md`}
    >
      {children}
      {loading && <Spinner />}
    </button>
  ) : (
    <button
      type="submit"
      className={`overflow-hidden text-small ${
        !loading
          ? "hover:text-[13px] hover:scale-105 duration-75"
          : "hover:text-little hover:scale-100 duration-75"
      } relative ${width} ${height}  font-semibold  rounded-md`}
    >
      {children}
      {loading && <Spinner />}
    </button>
  );
}

export default FormButton;
