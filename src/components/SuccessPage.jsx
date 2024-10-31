// SuccessPage.js
import img from '../assets/pngs/success-img.png'
const SuccessPage = () => {
  return (
    <div className="h-full flex items-center justify-center">
      <div className="bg-white p-8 h-fit rounded-lg text-center">
        <img
          src={img}
          alt="Success Illustration"
          className="mx-auto mb-6 w-52 md:w-[413px] md:h-[355px]"
        />
        <h1 className="text-2xl font-semibold text-gray-800 mb-2">
          Payment approved
        </h1>
        <p className="text-lg text-gray-600 mb-4">Congratulations</p>
        <button className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600">
          View Details
        </button>
      </div>
    </div>
  );
};

export default SuccessPage;
