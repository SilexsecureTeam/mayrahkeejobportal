import LearningCourseCard from './LearningCourseCard'
const LearningCourseGrid = ({ list }) => {
    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 px-4 py-8">
            {
                list?.map((course) => (
                    <LearningCourseCard
                        key={course?.id}
                        title="The Power of Typography and Text Alignment"
                        author="Eniola Emmanuel"
                        price="30.00"
                        rating="4.0"
                        img={course?.image}
                    />
                ))}
        </div>
    )
};
export default LearningCourseGrid;