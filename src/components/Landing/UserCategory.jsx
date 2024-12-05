import Btn from './Btn'
import { userCategory } from './LandingData';
const UserCategory = () => {

    return (
        <div className="flex gap-x-5 justify-between overflow-x-auto overflow-y-hidden h-max min-w-full py-7 bg-[#47aa4910]">
            {userCategory?.map((user) => (

                <section key={user?.id} className="flex-shrink-0 max-w-72 mx-5 bg-white p-2 rounded-xl">
                    <img src={user?.image} alt={user?.title} className="w-full h-48 rounded-2xl object-cover" />
                    <p className="font-bold text-xl capitalize my-2">{user?.title}</p>
                    <p className="text-gray-500 font-medium text-xs mb-8">{user?.desc}</p>
                    
<div className="mb-2" ><Btn
                        title="Register"
                        loc="/signup"
                        styl="bg-black text-sm shadow-[1px_1px_0] shadow-gray-400 hover:shadow-[-1px_-1px_0] text-white"
                    /></div>
                </section>

            ))}

        </div>
    )
}

export default UserCategory;