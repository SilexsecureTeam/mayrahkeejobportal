import { recentNews } from './LandingData';
import { useState, useEffect } from 'react';

const News = () => {
    const [recent, setRecent] = useState();
    const [news, setNews] = useState();

    useEffect(() => {
        setRecent(recentNews.find(news => news.reads === 20));
        setNews(recentNews.filter(news => news.reads !== 20));
    }, []);

    return (
        <div className="flex flex-wrap md:flex-nowrap gap-4 h-auto md:h-[500px] items-stretch">
            {/* Recent view */}
            {recent && (
                <section
                    key={recent?.id}
                    className="w-full md:w-1/2 flex-1 flex flex-col p-4"
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
                            <p className="text-green-600 text-sm font-medium">
                                Read More {">>"}
                            </p>
                        </article>
                    </div>
                </section>
            )}
            <div className="w-full md:w-1/2 flex flex-col gap-4 overflow-y-auto max-h-[500px]">
                {news &&
                    news.map((newsItem) => (
                        <section
                            key={newsItem?.id}
                            className="flex justify-between md:p-4"
                        >
                        <div className="w-28 h-28md:w-32 md:h-auto lg:w-48 lg:h-auto flex-shrink-0">
                        <img
                                className="w-full h-full object-cover rounded-md"
                                src={newsItem?.image}
                                alt="News"
                            />
                        </div>
                            
                            <div className="p-2 flex-1">
                                <small className="mt-2 text-gray-400 flex items-center">
                                    <span className="mr-2 w-2 h-2 rounded-full bg-gray-400"></span>
                                    {newsItem?.time_posted}
                                </small>
                                <h4 className="font-bold text-lg md:text-xl md:my-2 lg:my-3">
                                    {newsItem?.title}
                                </h4>
                                <p className="text-sm text-gray-500 mb-2 md:mb-3">
                                    {newsItem?.desc.slice(0, 100)}...
                                </p>
                                <article className="mt-2 flex justify-between gap-1 md:gap-3">
                                    <small className="mt-2 text-gray-400 flex items-center">
                                        <span className="mr-2 w-2 h-2 rounded-full bg-gray-400"></span>
                                        {newsItem?.reads} min read.
                                    </small>
                                    <p className="text-green-600 text-sm font-medium">
                                        Read More {">>"}
                                    </p>
                                </article>
                            </div>
                        </section>
                    ))}
            </div>
        </div>
    );
};

export default News;
