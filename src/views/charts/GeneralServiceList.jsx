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
    return (
      this.props.generalServiceList &&
      this.props.generalServiceList.length !==
        nextProps.generalServiceList.length
    );
  }
  render() {
    const { generalServiceList = [] } = this.props;
    const filterData = generalServiceList.filter(
      item => item.servicesCount > 0
    );
    return (
      <Fragment key={shortid.generate()}>
        <div className="FirstPie" style={{ width: '100%', height: 335 }}>
          {filterData.length === 0 ? (
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
                      fill={
                        entry.serviceStatus === 'Completed'
                          ? '#03C03C'
                          : entry.serviceStatus === 'UpComing'
                            ? ' #fcc200'
                            : '#E30022'
                      }
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
