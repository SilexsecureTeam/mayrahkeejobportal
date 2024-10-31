const ApplicantProfileCard = ({ userData }) => {
    return (
      <aside className="w-full h-fit lg:w-1/4 md:min-w-80 bg-white p-6 shadow-[0_0_2px_#999] mb-4 lg:mb-0">
      <div className="text-center flex flex-wrap gap-3 justify-around">
        <div className="bg-gray-300 h-24 w-24 rounded-full"></div>
        <section>
        <h3 className="text-xl font-bold mt-4">{userData.name}</h3>
        <p className="text-gray-600">{userData.jobTitle}</p>
        <div className="flex items-center mt-2">
          <span className="text-yellow-500">★</span>
          <span className="ml-1">{userData.rating}</span>
        </div>
        </section>
      </div>
      <div className="mt-4 bg-gray-100 p-2">
        <div className='flex justify-between gap-2 items-center p-2 border-b '>
        <h4 className="font-bold text-gray-800">Applied Jobs</h4>
        <p className="text-gray-500 text-sm">{userData.appliedTime}</p>
        
        </div>
        <div className="p-3 mt-2 rounded-lg">
          <p className="font-semibold">{userData.appliedJob.title}</p>
          <p className="text-gray-500 text-sm">{userData.appliedJob.category} • {userData.appliedJob.type}</p>
        </div>
      </div>
      <div className="mt-6">
        <h4 className="font-bold text-gray-800">Contact</h4>
        <ul className="text-gray-600 space-y-2 mt-2">
          <li>Email: {userData.email}</li>
          <li>Phone: {userData.phone}</li>
          <li>Instagram: {userData.social.instagram}</li>
          <li>Twitter: {userData.social.twitter}</li>
          <li>Website: {userData.website}</li>
        </ul>
      </div>
    </aside>
    );
  };
  
  export default ApplicantProfileCard;
  