const CardStatistic = ({ title, value,button }) => {
    return (
        <div className="bg-white shadow-lg w-full rounded-xl p-6 md:p-12 flex flex-col">
            <h2 className="text-lg font-semibold text-black">
                {title}
            </h2>
            <p className="text-3xl font-bold">{value}</p>
            {button}
        </div>
    );
};

export default CardStatistic;
