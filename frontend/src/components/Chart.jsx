import {LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid} from "recharts";

const Chart = ({ body }) => {
  const data = [...body];
  return (
      <ResponsiveContainer width="100%" height={300}>
          <LineChart data={data}>
              <XAxis dataKey="year" />
              <YAxis domain={[0, 3]} reversed={true} tickCount={4} />
              <CartesianGrid strokeDasharray="5 5"/>
              <Tooltip />
              <Line
                  type="monotone"
                  fill="#dc3545"
                  dataKey="position"
                  stroke="#dc3545"
              />

          </LineChart>
      </ResponsiveContainer>
  );
};

export default Chart;
