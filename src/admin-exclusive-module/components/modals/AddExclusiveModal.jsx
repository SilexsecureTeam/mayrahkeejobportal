import { MdClose } from "react-icons/md";
import PopUpBox from "../../../components/PopUpBox";
import FormButton from "../../../components/FormButton";
import useRegistration from "../../../hooks/useRegistration";
import { useContext, useState } from "react";
import { FaSpinner } from "react-icons/fa6";
import { AdminExclusiveManagementContext } from "../../../context/AdminExclusiveManagement";

function AddExclusiveModal({ toogleExclusiveModal, isOpen }) {
  const { registerExclusive } = useRegistration();
  const [loading, setLoading] = useState(false);
  const { exclusives, getAllExclusives } = useContext(AdminExclusiveManagementContext);

  const handleSubmit = async (e) => {
    setLoading(true);
    e.preventDefault();

    const data = {
      name: e.target[0].value,
      email: e.target[1].value,
      password: e.target[2].value,
      re_enter_password: e.target[3].value,
    };

    await registerExclusive(() => {}, data);
    await getAllExclusives();
    toogleExclusiveModal();
    setLoading(false);
     // Reset form after successful submission
     e.target.reset();
  };

  return (
    <PopUpBox isOpen={isOpen}>
      <div className="bg-white min-w-96 sm:w-[80%] md:w-[60%] lg:w-[40%] min-h-[50%] flex flex-col gap-5 rounded-lg px-5 py-3">
        <button
          onClick={toogleExclusiveModal}
          className="flex gap-1 w-fit border px-2 rounded-lg py-1 items-center bg-red-600 text-white"
        >
          <MdClose strokeWidth={2} />
        </button>

        <h3 className="text-center font-semibold text-lg sm:text-xl">
          Create an Exclusive Account
        </h3>

        <form
          onSubmit={handleSubmit}
          className="w-full items-center gap-5 flex flex-col"
        >
          <input
            type="text"
            required
            className="p-2 border focus:outline-none w-full rounded-md"
            placeholder="Enter Full Name"
          />

          <input
            type="email"
            required
            className="p-2 border focus:outline-none w-full rounded-md"
            placeholder="Enter Email"
          />

          <input
            type="password"
            required
            className="p-2 border focus:outline-none w-full rounded-md"
            placeholder="******"
          />

          <input
            type="password"
            required
            className="p-2 border focus:outline-none w-full rounded-md"
            placeholder="******"
          />

          <button
            type="submit"
            disabled={loading}
            className="px-2 py-1 relative bg-primaryColor w-full font-semibold hover:scale-[102%] duration-75 rounded-md text-white"
          >
            Add Exclusive
            {loading && (
              <div className="absolute w-full flex items-center justify-center h-full left-0 top-0 bg-white/80">
                <FaSpinner className="animate-spin text-primaryColor" />
              </div>
            )}
          </button>
        </form>
      </div>
    </PopUpBox>
  );
}

export default AddExclusiveModal;
