import React, { Component, Fragment } from 'react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Cell
} from 'recharts';
import shortid from 'shortid';

const COLORS = [
  '#E30022',
  '#FF8B00',
  '#F2B400',
  '#03C03C',
  '#1F75FE',
  '#431C53'
];
class MonthlyReportList extends Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  shouldComponentUpdate(nextProps) {
    return (
      this.props.monthlyReportList &&
      this.props.monthlyReportList.length !== nextProps.monthlyReportList.length
    );
  }

  render() {
    const { monthlyReportList } = this.props;
    return (
      <Fragment key={shortid.generate()}>
        <div className="fstBar" style={{ width: '100%', height: 380 }}>
          {monthlyReportList.length === 0 ? (
            <center>
              <p style={{ paddingTop: '45%' }}>No Data found !</p>
            </center>
          ) : (
            <ResponsiveContainer>
              <BarChart
                width={500}
                height={300}
                data={monthlyReportList}
                margin={{
                  top: 5,
                  right: 30,
                  left: 20,
                  bottom: 5
                }}
              >
                <CartesianGrid strokeDasharray="5 3" />
                <XAxis name="Month" dataKey="monthList" height={120} />
                <YAxis />
                <Tooltip />
                <Bar dataKey="monthwiseCount" nameKey="monthList">
                  {monthlyReportList.map((entry, index) => (
                    <Cell
                      key={`cell-${index}`}
                      fill={COLORS[index % COLORS.length]}
                    />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          )}
        </div>
      </Fragment>
    );
  }
}

export default MonthlyReportList;
