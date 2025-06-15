import TitleWrapper from "../../generics/wrappers/title-wrapper/TitleWrapper";
import Chart from "./chart/Chart";
import './TopCharts.scss';

export default function TopCharts() {
    return (
        <TitleWrapper className="app-top-charts" title="Top charts">
            <div className="flex flex-col items-stretch justify-start gap-3">
                <Chart />
                <Chart />
                <Chart />
            </div>
        </TitleWrapper>
    );
}