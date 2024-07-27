import { stats_cards_dummies } from "../../../utils/dummies";
import StatsCard from "./StatsCard";

function StatsCardWrapper() {

    return ( <ul className="flex w-full justify-between h-[50px]">
        {stats_cards_dummies.map(currentStat => <StatsCard data={currentStat}/>)}
    </ul> );
}

export default StatsCardWrapper;