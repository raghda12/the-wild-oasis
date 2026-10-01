import styled from "styled-components";
import Heading from "../../ui/Heading";
import {
  PieChart,
  ResponsiveContainer,
  Pie,
  Cell,
  Legend,
  Tooltip,
} from "recharts";
import { useDarkMode } from "../../context/DarkModeContext";

const ChartBox = styled.div`
  /* Box */
  background-color: var(--color-grey-0);
  border: 1px solid var(--color-grey-200);
  border-radius: var(--border-radius-lg);
  box-shadow: var(--shadow-md);

  padding: 2.2rem 2.4rem;
  grid-column: 3 / span 2;

  @media (max-width: 1200px) {
    grid-column: 1 / -1;
  }

  @media (max-width: 600px) {
    padding: 2rem 1.6rem;
  }
  display: flex;
  flex-direction: column;
  gap: 1.2rem;

  & .recharts-legend-item-text {
    color: var(--color-grey-600) !important;
    font-size: 1.4rem;
    font-weight: 600;
  }
`;

const Header = styled.div`
  display: flex;
  align-items: baseline;
  justify-content: space-between;
`;

const Sub = styled.span`
  font-size: 1.3rem;
  font-weight: 600;
  color: var(--color-grey-500);
`;

// Greens for short stays, ambers for long stays: ordered light-to-dark within
// each family so neighbouring slices also differ in lightness
const durations = [
  "1 night",
  "2 nights",
  "3 nights",
  "4-5 nights",
  "6-7 nights",
  "8-14 nights",
  "15-21 nights",
  "21+ nights",
];
const colorsLight = [
  "#1e4a38",
  "#3f7d5f",
  "#8dbfa2",
  "#eac48f",
  "#c77a2e",
  "#7f4519",
  "#58605a",
  "#2a322d",
];
const colorsDark = [
  "#b5e0c7",
  "#7bc49c",
  "#3f8a64",
  "#f0c58e",
  "#e8ad66",
  "#b97834",
  "#949d97",
  "#c6ccc7",
];

function prepareData(colors, stays) {
  const startData = durations.map((duration, i) => ({
    duration,
    value: 0,
    color: colors[i],
  }));

  function incArrayValue(arr, field) {
    return arr.map((obj) =>
      obj.duration === field ? { ...obj, value: obj.value + 1 } : obj,
    );
  }

  const data = stays
    .reduce((arr, cur) => {
      const num = cur.numNights;
      if (num === 1) return incArrayValue(arr, "1 night");
      if (num === 2) return incArrayValue(arr, "2 nights");
      if (num === 3) return incArrayValue(arr, "3 nights");
      if ([4, 5].includes(num)) return incArrayValue(arr, "4-5 nights");
      if ([6, 7].includes(num)) return incArrayValue(arr, "6-7 nights");
      if (num >= 8 && num <= 14) return incArrayValue(arr, "8-14 nights");
      if (num >= 15 && num <= 21) return incArrayValue(arr, "15-21 nights");
      if (num > 21) return incArrayValue(arr, "21+ nights");
      return arr;
    }, startData)
    .filter((obj) => obj.value > 0);

  return data;
}

function DurationChart({ confirmedStays }) {
  const { isDarkMode } = useDarkMode();
  const data = prepareData(isDarkMode ? colorsDark : colorsLight, confirmedStays);
  const surface = isDarkMode ? "#151d19" : "#ffffff";

  return (
    <ChartBox>
      <Header>
        <Heading as="h2">Stay duration</Heading>
        <Sub>
          {confirmedStays.length} confirmed{" "}
          {confirmedStays.length === 1 ? "stay" : "stays"}
        </Sub>
      </Header>
      <ResponsiveContainer width="100%" height={260}>
        <PieChart>
          <Pie
            data={data}
            nameKey="duration"
            dataKey="value"
            innerRadius={78}
            outerRadius={108}
            cx="40%"
            cy="50%"
            paddingAngle={2}
          >
            {data.map((entry) => (
              <Cell
                fill={entry.color}
                stroke={surface}
                strokeWidth={2}
                key={entry.duration}
              />
            ))}
          </Pie>
          <Tooltip
            contentStyle={{
              backgroundColor: surface,
              border: `1px solid ${isDarkMode ? "#26322b" : "#e6e0d4"}`,
              borderRadius: 12,
            }}
            itemStyle={{ color: isDarkMode ? "#e2dfd8" : "#2a322d" }}
          />
          <Legend
            verticalAlign="middle"
            align="right"
            width="36%"
            layout="vertical"
            iconSize={10}
            iconType="circle"
          />
        </PieChart>
      </ResponsiveContainer>
    </ChartBox>
  );
}
export default DurationChart;
