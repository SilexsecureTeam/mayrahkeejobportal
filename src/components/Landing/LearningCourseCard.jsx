const LearningCourseCard = ({ title, author, price, rating, img }) => {
    return (
        <div className="min-w-[280px] max-w-[300px] flex-shrink-0 border shadow-sm rounded-md overflow-hidden h-auto">
            <img 
                src={img || `https://via.placeholder.com/150/0000/FFFFFF?text=${title}`} 
                alt={title} 
                className="h-48 w-full object-cover" 
            />
            <section className="p-4 pb-1">
                <h3 className="font-bold text-lg">{title}</h3>
                <p className="text-gray-600">{author}</p>
                <div className="flex flex-col gap-2 mt-2">
                    <span className="text-yellow-500">{rating} ★</span>
                    <span className="font-bold">${price}</span>
                </div>
                <button className="mt-4 px-4 py-2 bg-green-500 text-white rounded w-full">
                    Best Seller
                </button>
            </section>
        </div>
    );
};

export default LearningCourseCard;
