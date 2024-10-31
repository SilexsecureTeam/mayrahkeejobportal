const ApplicantHeader = ({ username }) => {
    return (
      <header className="text-white p-4 flex flex-wrap gap-5 items-center justify-between">
        <section>
        <h2 className="text-xl font-bold text-blue-900">Good Evening, {username}</h2>
        <nav className="flex my-2 space-x-4 font-medium">
          <a href="#" className="text-green-500">Offers</a>
          <a href="#" className="text-gray-800">Domestic Staff</a>
          <a href="#" className="text-green-500">Kunle Ademu</a>
        </nav>
        </section>
        
        <div className="flex space-x-4">
          <button className="bg-green-600 text-white px-4 py-1 rounded">Accepted</button>
          <button className="bg-red-600 text-white px-4 py-1 rounded">Rejected</button>
        </div>
      </header>
    );
  };
  
  export default ApplicantHeader;
  