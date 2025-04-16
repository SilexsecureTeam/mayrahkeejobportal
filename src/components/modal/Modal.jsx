import { motion, AnimatePresence } from "framer-motion";
import { MdClose } from "react-icons/md";

const Modal = ({ isOpen, closeModal, children }) => {
  if (!isOpen) return null; // Ensure modal only renders when open

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="w-screen h-screen fixed inset-0 flex items-center justify-center bg-black/50 z-[1000000]"
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.8 }}
          transition={{ type: "spring", stiffness: 200, damping: 20 }}
          className="relative flex flex-col justify-center h-max max-h-[90vh] bg-white p-6 rounded-lg shadow-lg"
        >
          <button
            onClick={closeModal}
            className="absolute top-2 right-2 text-red-500 hover:text-red-600 font-bold text-lg p-4 cursor-pointer"
          >
            <MdClose size={30} />
          </button>
          <section>{children}</section>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default Modal;
