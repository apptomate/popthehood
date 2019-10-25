import React, { Component, Fragment } from 'react';
import {
  PieChart,
  Pie,
  Cell,
  Legend,
  Tooltip,
  ResponsiveContainer
} from 'recharts';
import shortid from 'shortid';

const COLORS = ['#F2B400', '#03C03C', '#1F75FE', '#431C53'];

const RADIAN = Math.PI / 180;
const renderCustomizedLabel = ({
  cx,
  cy,
  midAngle,
  innerRadius,
  outerRadius,
  percent
}) => {
  const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
  const x = cx + radius * Math.cos(-midAngle * RADIAN);
  const y = cy + radius * Math.sin(-midAngle * RADIAN);

  return (
    <text
      x={x}
      y={y}
      fill="white"
      textAnchor={x > cx ? 'start' : 'end'}
      dominantBaseline="central"
    >
      {`${(percent * 100).toFixed(0)}%`}
    </text>
  );
};
class GeneralServiceList extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  shouldComponentUpdate(nextProps) {
    return this.props.generalServiceList !== nextProps.generalServiceList;
  }
  render() {
    const { generalServiceList = [] } = this.props;
    return (
      <Fragment key={shortid.generate()}>
        <div className="FirstPie" style={{ width: '100%', height: 380 }}>
          {generalServiceList.length === 0 ? (
            <center>
              <p style={{ paddingTop: '45%' }}>No Data found !</p>
            </center>
          ) : (
            <ResponsiveContainer>
              <PieChart>
                <Pie
                  data={generalServiceList}
                  labelLine={false}
                  label={renderCustomizedLabel}
                  outerRadius={130}
                  innerRadius={50}
                  fill="#8884d8"
                  dataKey="servicesCount"
                  nameKey="serviceStatus"
                >
                  {generalServiceList.map((entry, index) => (
                    <Cell
                      key={`cell-${index}`}
                      fill={COLORS[index % COLORS.length]}
                    />
                  ))}
                </Pie>
                <Tooltip />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          )}
        </div>
      </Fragment>
    );
  }
}

export default GeneralServiceList;
