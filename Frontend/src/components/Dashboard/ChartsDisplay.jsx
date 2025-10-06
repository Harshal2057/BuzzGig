import React, { useRef, useEffect } from "react";
import gsap from "gsap";
import { assets } from "../../assets/assets.js";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid } from "recharts";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  ChartLegend,
  ChartLegendContent,
} from "../lightswind/chart.js";

const ChartsDisplay = () => {
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
    <div className="w-full h-full">
      <ChartContainer
        config={chartConfig}
        className="w-full h-full rounded-2xl"
      >
        <BarChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="month" />
          <YAxis />

          {/* Bars */}
          <Bar
            dataKey="projects"
            fill="var(--color-projects)"
            radius={[6, 6, 0, 0]}
          />
          <Bar
            dataKey="earning"
            fill="var(--color-earning)"
            radius={[6, 6, 0, 0]}
          />

          {/* Tooltip */}
          <ChartTooltip content={<ChartTooltipContent />} cursor={false} />

          {/* Legend */}
          <ChartLegend content={<ChartLegendContent />} />
        </BarChart>
      </ChartContainer>
    </div>
  );
};

export default ChartsDisplay;