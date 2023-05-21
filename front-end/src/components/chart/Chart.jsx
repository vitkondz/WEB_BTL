import "./chart.css";
import {
  LineChart,
  Line,
  XAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  YAxis,
  BarChart,
  Legend,
  Bar
} from "recharts";

export default function Chart({ year, title, data, dataKey, grid, kind }) {

  return (
    <div className="chart">
      <h3 className="chartTitle">{title + ' ' + year}</h3>
      <ResponsiveContainer width="100%" aspect={4 / 1}>
          <LineChart data={data}>
            <XAxis dataKey={kind} stroke="#5550bd" />
            <YAxis />
            <Line type="monotone" dataKey={dataKey} stroke="#5550bd" />
            <Tooltip />
            {grid && <CartesianGrid stroke="#e0dfdf" strokeDasharray="5 5" />}
          </LineChart>

        </ResponsiveContainer>

    </div>
  );
}

// import {
//   LineChart,
//   Line,
//   XAxis,
//   CartesianGrid,
//   Tooltip,
//   ResponsiveContainer,
//   YAxis,
// } from "recharts";

// import { userData as data } from "./dummyData";
// export default function Chart({ title, dataKey, grid }) {

//   return (
//     <div className="chart">
//       <h3 className="chartTitle">{title}</h3>
//       <ResponsiveContainer width="95%" aspect={4 / 1}>
//         <LineChart data={data}>
//           <XAxis dataKey={'name'} stroke="#5550bd" />
//           <YAxis/>
//           <Line type="monotone" dataKey={'Active User'} stroke="#5550bd" />
//           <Tooltip />
//           {grid && <CartesianGrid stroke="#e0dfdf" strokeDasharray="5 5" />}
//         </LineChart>
        
//       </ResponsiveContainer>
//     </div>
//   );
// }