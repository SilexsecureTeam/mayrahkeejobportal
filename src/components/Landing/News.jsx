import { recentNews } from './LandingData';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
const News = () => {
    const [recent, setRecent] = useState();
    const [news, setNews] = useState();
    const navigate = useNavigate();

    useEffect(() => {
        setRecent(recentNews.slice(0, 5).find(news => news.id === 1));
        setNews(recentNews.slice(0, 5).filter(news => news.id !== 1));
    }, []);

    return (
        <div className="bg-[#47aa4910] py-4">
            <div className="flex justify-between items-center px-3">
                <h2 className="text-sm font-semibold">LATEST NEWS</h2>
                <button className="text-green-600 border-[1px] border-green-600 px-6 py-1 rounded-full font-bold text-sm" onClick={() => { navigate("news"); scrollTo(0, 0) }}>Read All</button>
            </div>
            <div className="flex flex-wrap md:flex-nowrap gap-4 h-auto min-h-[550px] items-stretch">
                {/* Recent view */}
                {recent && (
                    <section
                        key={recent?.id}
                        className="w-full h-max md:w-1/2 flex-1 flex flex-col p-4"
                    >
                        <img
                            className="w-full h-[250px] md:h-[350px] object-cover rounded-md"
                            src={recent?.image}
                            alt="Recent News"
                        />
                        <div className="p-2 ">
                            <small className="mt-2 text-gray-400 flex items-center">
                                <span className="mr-2 w-2 h-2 rounded-full bg-gray-400"></span>
                                {recent?.time_posted}
                            </small>
                            <h4 className="font-bold text-lg md:text-xl my-3">
                                {recent?.title}
                            </h4>
                            <p className="text-sm text-gray-500 mb-3">
                                {recent?.desc}
                            </p>
                            <article className="mt-2 flex justify-between gap-3">
                                <small className="mt-2 text-gray-400 flex items-center">
                                    <span className="mr-2 w-2 h-2 rounded-full bg-gray-400"></span>
                                    {recent?.reads} min read.
                                </small>
                                <p className="cursor-pointer text-green-600 text-sm font-medium" onClick={() => { navigate(`news/${recent?.id}`); scrollTo(0, 0) }}>
                                    Read More {">>"}
                                </p>
                            </article>
                        </div>
                    </section>
                )}
                <div className="w-full md:w-1/2 flex flex-col gap-2 overflow-y-auto max-h-[550px]">
                    {news &&
                        news.map((newsItem) => (
                            <section
                                key={newsItem?.id}
                                className="flex justify-between items-stretch"
                            >
                                <div className="w-28 min-h-28 md:w-32 md:h-auto lg:w-40 lg:h-auto flex-shrink-0">
                                    <img
                                        className="w-full h-full object-cover rounded-md"
                                        src={newsItem?.image}
                                        alt="News"
                                    />
                                </div>

                                <div className="p-2 flex-1 w-[90%] md:w-full flex flex-col justify-center">
                                    <small className="mt-2 text-gray-400 flex items-center">
                                        <span className="mr-2 w-2 h-2 rounded-full bg-gray-400"></span>
                                        {newsItem?.time_posted}
                                    </small>
                                    <h4 className="font-bold text-sm md:my-2 lg:my-3">
                                        {newsItem?.title}
                                    </h4>
                                    <p className="text-sm text-gray-500 mb-1 md:mb-3">
                                        {newsItem?.desc.slice(0, 100)}...
                                    </p>
                                    <article className="flex items-center justify-between gap-1 md:gap-3">
                                        <small className="mt-2 text-gray-400 flex items-center">
                                            <span className="mr-2 w-2 h-2 rounded-full bg-gray-400"></span>
                                            {newsItem?.reads} min read.
                                        </small>
                                        <p className="cursor-pointer text-green-600 text-xs font-medium"
                                            onClick={() => { navigate(`news/${newsItem?.id}`); scrollTo(0, 0) }}>
                                            Read More {">>"}
                                        </p>
                                    </article>
                                </div>
                            </section>
                        ))}
                </div>
            </div>
        </div>

    );
};

export default News;
