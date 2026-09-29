import styled from "styled-components";
import DashboardBox from "./DashboardBox";
import Heading from "../../ui/Heading";
import { useDarkMode } from "../../context/DarkModeContext";
import {
  Area,
  AreaChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { subDays, eachDayOfInterval, format, isSameDay } from "date-fns";

const StyledSalesChart = styled(DashboardBox)`
  grid-column: 1 / -1;

  /* Hack to change grid line colors */
  & .recharts-cartesian-grid-horizontal line,
  & .recharts-cartesian-grid-vertical line {
    stroke: var(--color-chart-grid);
  }
`;

const Header = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-wrap: wrap;
  gap: 1.6rem;
`;

const Titles = styled.div`
  display: flex;
  align-items: baseline;
  gap: 1.4rem;
`;

const Range = styled.span`
  font-size: 1.3rem;
  font-weight: 600;
  color: var(--color-grey-500);
`;

const Legend = styled.ul`
  display: flex;
  gap: 2rem;
  font-size: 1.3rem;
  font-weight: 600;
  color: var(--color-grey-600);

  & li {
    display: flex;
    align-items: center;
    gap: 0.8rem;
  }
`;

const Swatch = styled.span`
  width: 1.4rem;
  height: 3px;
  border-radius: 2px;
  background-color: ${(props) => props.$color};
`;

function SalesChart({ bookings, numDays }) {
  const { isDarkMode } = useDarkMode();
  const allDates = eachDayOfInterval({
    start: subDays(new Date(), numDays - 1),
    end: new Date(),
  });
  const data = allDates.map((date) => {
    const dayBookings = bookings.filter((booking) =>
      isSameDay(date, new Date(booking.created_at)),
    );
    return {
      label: format(date, "MMM dd"),
      totalSales: dayBookings.reduce((acc, b) => acc + b.totalPrice, 0),
      extrasSales: dayBookings.reduce((acc, b) => acc + b.extrasPrice, 0),
    };
  });

  const colors = isDarkMode
    ? {
        totalSales: { stroke: "#7bc49c", fill: "#7bc49c" },
        extrasSales: { stroke: "#e8ad66", fill: "#e8ad66" },
        text: "#949d97",
        line: "#26322b",
        background: "#151d19",
      }
    : {
        totalSales: { stroke: "#1e4a38", fill: "#1e4a38" },
        extrasSales: { stroke: "#c77a2e", fill: "#c77a2e" },
        text: "#69706a",
        line: "#e6e0d4",
        background: "#ffffff",
      };

  return (
    <StyledSalesChart>
      <Header>
        <Titles>
          <Heading as="h2">Sales</Heading>
          <Range>
            {format(allDates.at(0), "MMM dd")} —{" "}
            {format(allDates.at(-1), "MMM dd, yyyy")}
          </Range>
        </Titles>
        <Legend>
          <li>
            <Swatch $color={colors.totalSales.stroke} />
            Total sales
          </li>
          <li>
            <Swatch $color={colors.extrasSales.stroke} />
            Extras
          </li>
        </Legend>
      </Header>
      <ResponsiveContainer height={280} width="100%">
        <AreaChart data={data} margin={{ top: 8, right: 8, left: 0, bottom: 0 }}>
          <XAxis
            dataKey="label"
            tick={{ fill: colors.text, fontSize: 12 }}
            tickLine={false}
            axisLine={{ stroke: colors.line }}
            minTickGap={24}
          />
          <YAxis
            unit="$"
            tick={{ fill: colors.text, fontSize: 12 }}
            tickLine={false}
            axisLine={false}
            width={64}
          />
          <CartesianGrid strokeDasharray="4 5" vertical={false} />
          <Tooltip
            contentStyle={{
              backgroundColor: colors.background,
              border: `1px solid ${colors.line}`,
              borderRadius: 12,
            }}
            labelStyle={{ fontWeight: 700, color: colors.text }}
          />
          <Area
            dataKey="totalSales"
            type="monotone"
            stroke={colors.totalSales.stroke}
            fill={colors.totalSales.fill}
            fillOpacity={isDarkMode ? 0.14 : 0.1}
            strokeWidth={2.5}
            name="Total sales"
            unit="$"
          />
          <Area
            dataKey="extrasSales"
            type="monotone"
            stroke={colors.extrasSales.stroke}
            fill={colors.extrasSales.fill}
            fillOpacity={0.16}
            strokeWidth={2.5}
            name="Extras sales"
            unit="$"
          />
        </AreaChart>
      </ResponsiveContainer>
    </StyledSalesChart>
  );
}
export default SalesChart;
