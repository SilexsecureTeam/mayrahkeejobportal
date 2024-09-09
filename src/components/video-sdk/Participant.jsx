function Participant({data}) {
  console.log('Participant', data)
  return (
    <div className="w-full h-[70%]">
      <img className="h-full w-full object-cover rounded-md" src="https://images.pexels.com/photos/4491440/pexels-photo-4491440.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" />
    </div>
  );
}

export default Participant;
