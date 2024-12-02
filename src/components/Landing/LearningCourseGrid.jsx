import LearningCourseCard from './LearningCourseCard'
const LearningCourseGrid = ({ list }) => {
    return (
        <div className="flex gap-x-5 justify-between overflow-x-auto h-max min-w-full py-7">
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