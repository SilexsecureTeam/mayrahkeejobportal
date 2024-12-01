
const LearningCourseCard = ({ title, author, price, rating, img }) => {
    return (
        <div className="border rounded shadow-sm p-4">
            <img src={img} alt={title} className="rounded mb-4 h-48 w-full" />
            <h3 className="font-bold text-lg">{title}</h3>
            <p className="text-gray-600">{author}</p>
            <div className="flex items-center justify-between mt-2">
                <span className="font-bold">${price}</span>
                <span className="text-yellow-500">{rating} ★</span>
            </div>
            <button className="mt-4 px-4 py-2 bg-green-500 text-white rounded">
                Best Seller
            </button>
        </div>
    )
};
export default LearningCourseCard;