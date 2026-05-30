import {

  ResponsiveContainer,
  AreaChart,
  Area,
  Tooltip

} from "recharts";

const data = [

  { value: 1200 },
  { value: 2100 },
  { value: 1800 },
  { value: 3200 },
  { value: 2800 },
  { value: 4200 },
  { value: 5100 }

];

function TrafficChart() {

  return (

    <ResponsiveContainer
      width="100%"
      height="100%"
    >

      <AreaChart data={data}>

        <defs>

          <linearGradient
            id="colorGradient"

            x1="0"
            y1="0"

            x2="0"
            y2="1"
          >

            <stop
              offset="0%"

              stopColor="#38BDF8"

              stopOpacity={0.45}
            />

            <stop
              offset="100%"

              stopColor="#38BDF8"

              stopOpacity={0}
            />

          </linearGradient>

        </defs>

        <Tooltip />

        <Area

          type="monotone"

          dataKey="value"

          stroke="#38BDF8"

          strokeWidth={4}

          fill="url(#colorGradient)"
        />
              minWidth={0}
              minHeight={0}

      </AreaChart>

    </ResponsiveContainer>
  );
}

export default TrafficChart;