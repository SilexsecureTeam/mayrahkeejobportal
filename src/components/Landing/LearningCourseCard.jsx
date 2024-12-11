
const LearningCourseCard = ({ title, author, price, rating, img }) => {
    return (
        <div className="border shadow-sm max-w-[300px] pb-2">
            <img src={img ? img : `https://via.placeholder.com/150/0000/FFFFFF?text=${title}`} alt={title} className="mb-4 h-48 w-full object-cover" />
            <section className=" px-4">
            <h3 className="font-bold text-lg">{title}</h3>
            <p className="text-gray-600">{author}</p>
            <div className="flex flex-col justify-between gap-2 mt-2">
            <span className="text-yellow-500">{rating} ★</span>
                <span className="font-bold">${price}</span>
                
            </div>
            <button className="mt-4 px-4 py-2 bg-green-500 text-white rounded">
                Best Seller
            </button>
            </section>
        </div>
    )
};
export default LearningCourseCard;