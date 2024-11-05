import React, { useEffect } from "react";
import HeadTitle from "./HeadTitle";
import { useDispatch, useSelector } from "react-redux";
import { fetchvolumeServices } from "../../redux/slices/apiSlice";
import { BarChart, Bar, Legend, ResponsiveContainer } from "recharts";

const VolumeServices = () => {
  const state = useSelector((state) => state.apis.volumeServicesData);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchvolumeServices());
  }, [dispatch]); // dispatch가 실행될 때 한번 실행

  // console.log(state);
  const formatLegendValue = (name, legendObj) => {
    const initialvalue = 0;
    const totalvalue = state?.reduce((acc, cur) => {
      if (Object.keys(cur).includes(legendObj.dataKey)) {
        // name.dataKey가 cur 객체에 포함되어 있는지 확인
        return acc + cur[legendObj.dataKey]; // 포함되어 있다면 acc에 누적해서 더함
      } else {
        return acc;
      }
    }, initialvalue);

    return (
      <span className="custom-legend-item-text-group flex items-center gap-[5px]">
        <span className="custom-legend-item-text">{name}</span>
        <span className="custom-legend-item-text text-xs text-[#151d48] dark:text-gray-300 font-medium">
          {totalvalue}
        </span>
      </span>
    );
  };

  return (
    <div className="block-wrap ml-[14px] my-[14px]">
      <HeadTitle title="Volume vs Services Level" />
      <div className="stacked-bar-char w-full h-[250px] mb-5">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            data={state}
            width={500}
            height={300}
            margin={{
              top: 5,
              left: -20,
              bottom: 5,
            }}
          >
            <Legend
              iconType="circle"
              iconSize={10}
              style={{ paddingTop: "10px" }}
              formatter={formatLegendValue}
            />
            <Bar
              dataKey="volume"
              fill="#0095ff"
              radius={[0, 0, 4, 4]}
              barSize={16}
              stackId="a"
            />
            <Bar
              dataKey="services"
              fill="#00e096"
              radius={[4, 4, 0, 0]}
              barSize={16}
              stackId="a"
            />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default VolumeServices;
