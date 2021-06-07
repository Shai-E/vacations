import { useEffect, useState } from "react";
import "./Reports.css";
import { Bar } from "react-chartjs-2";
import { useSelector } from "react-redux";
import Loader from "../Loader/Loader";
import moment from "moment";
import { VacationModel } from "../../models/VacationModel";
import { RootState } from "../../store/store";
import { UserModel } from "../../models/UserModel";
import { useHistory } from "react-router-dom";

const Reports = ():JSX.Element => {
    const [data, setData] = useState([]);
    const [labels, setLabels] = useState();
    const [options, setOptions] = useState({});
    const [chartData, setChartData] = useState({});
    const [isLoading, setIsLoading] = useState(true);
    const history = useHistory();

    const vacations = useSelector((state: RootState) => state.vacations.vacations);
    const user:UserModel = useSelector((state: RootState) => state.user);

    useEffect(():void=>{
        if(!user.isAdmin){
            history.push("/page-404");
        }
    },[user.isAdmin, history]);

    useEffect(():void => {
        const followedVacationsData = vacations
            .filter((v: VacationModel) => v.followers! > 0)
            .map((v: VacationModel) => {
                return { x: `${v.destination} ${moment(v.startDate).format("DD/MM/YYYY")}`, y: v.followers };
            });
        setData(followedVacationsData);
        const labelsData = followedVacationsData.map((v: {x: string, y: number}) => v["x"]);
        setLabels(labelsData);
        const optionsInit = {
            plugins: {
                title: {
                    display: true,
                    text: "All Vacations with Followers",
                    color: "black",
                    font: {
                        size: 30,
                    },
                },
                legend: {
                    display: false,
                },
                
            },
            responsive: true,
            maintainAspectRatio: false,
            scales: {
                y: {
                    grid: {
                        display: true,
                    },
                    ticks: {
                        stepSize: 1,
                    },
                },
                x: {
                    grid: {
                        borderColor: "grey",
                        tickColor: "grey",
                    },
                    ticks: {
                        color: "black",
                        font: {
                            size: 16,
                        },
                    },
                },
            },
        };
        setOptions(optionsInit);
    }, [vacations]);

    useEffect(():void => {
        if (data) {
            const chartDataInit = {
                labels: labels,
                datasets: [
                    {
                        label: "followers",
                        data: data,
                        backgroundColor: [
                            "rgba(255, 99, 132, 0.2)",
                            "rgba(54, 162, 235, 0.2)",
                            "rgba(255, 206, 86, 0.2)",
                            "rgba(75, 192, 192, 0.2)",
                            "rgba(153, 102, 255, 0.2)",
                            "rgba(255, 159, 64, 0.2)",
                        ],
                        borderColor: [
                            "rgba(255, 99, 132, 1)",
                            "rgba(54, 162, 235, 1)",
                            "rgba(255, 206, 86, 1)",
                            "rgba(75, 192, 192, 1)",
                            "rgba(153, 102, 255, 1)",
                            "rgba(255, 159, 64, 1)",
                        ],
                        borderWidth: 1,
                        hoverBackgroundColor: [
                            "rgba(255, 99, 132, 0.7)",
                            "rgba(54, 162, 235, 0.7)",
                            "rgba(255, 206, 86, 0.7)",
                            "rgba(75, 192, 192, 0.7)",
                            "rgba(153, 102, 255, 0.7)",
                            "rgba(255, 159, 64, 0.7)",
                        ],
                    },
                ],
            };
            setChartData(chartDataInit);
            setIsLoading(false);
        }
    }, [data, labels]);

    if (isLoading) return <Loader />;

    return (
        <div className="Reports">
            {data.length !== 0 ? (
                <Bar type={"bar"} data={chartData} options={options} className="chart"></Bar>
            ) : (
                <h1>No Vacations Are followed Yet</h1>
            )}
        </div>
    );
};

export default Reports;
