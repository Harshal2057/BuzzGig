import React from "react";
import { LineChart, Line, XAxis, YAxis, CartesianGrid } from "recharts";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  ChartLegend,
  ChartLegendContent,
} from "../lightswind/chart.js";

const ChartsDisplayClient = () => {
  const data = [
    { month: "Jan", projects: 400, earning: 240 },
    { month: "Feb", projects: 300, earning: 456 },
    { month: "Mar", projects: 200, earning: 139 },
    { month: "Apr", projects: 278, earning: 390 },
    { month: "May", projects: 189, earning: 480 },
  ];

  const chartConfig = {
    projects: { label: "Projects", color: "#0A1FC2" },
    earning: { label: "Earning", color: "#FF5733" },
  };

  return (
    <div className="w-5/6 h-5/6">
      <ChartContainer
        config={chartConfig}
        className="w-full h-full rounded-2xl"
      >
        <LineChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="month" />
          <YAxis />

          {/* Lines */}
          <Line
            type="monotone"
            dataKey="projects"
            stroke="var(--color-projects)"
            strokeWidth={3}
            dot={{ r: 5 }}
            activeDot={{ r: 8 }}
          />
          <Line
            type="monotone"
            dataKey="earning"
            stroke="var(--color-earning)"
            strokeWidth={3}
            dot={{ r: 5 }}
            activeDot={{ r: 8 }}
          />

          {/* Tooltip */}
          <ChartTooltip content={<ChartTooltipContent />} cursor={false} />

          {/* Legend */}
          <ChartLegend content={<ChartLegendContent />} />
        </LineChart>
      </ChartContainer>
    </div>
  );
};

export default ChartsDisplayClient;
