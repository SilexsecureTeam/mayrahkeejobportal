function NavBar({ state }) {
  return (
    <nav className="w-full h-[8%] px-6 flex items-center justify-between bg-white">
      <h1 className="font-semibold text-xl tracking-wide">{state.title}</h1>

      <div className="flex justify-between pr-5">
        <button className="border px-[5px] py-[3px] text-sm border-primaryColor text-primaryColor">Go to E-Learning</button>
      </div>
    </nav>
  );
}

export default NavBar;
