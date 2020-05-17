/**
 *
 * GraphLine
 *
 */

import React, { PureComponent } from 'react';
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';

export default class Example extends PureComponent {
  render() {
    return (
      <div style={{ width: '100%', height: 400 }}>
        <ResponsiveContainer>
          <AreaChart
            data={this.props.data}
            margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
          >
            <defs>
              <linearGradient id="colorUv" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#8884d8" stopOpacity={0.8} />
                <stop offset="95%" stopColor="#8884d8" stopOpacity={0} />
              </linearGradient>
              <linearGradient id="colorPv" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#DDE85D" stopOpacity={0.8} />
                <stop offset="95%" stopColor="#DDE85D" stopOpacity={0} />
              </linearGradient>
              <linearGradient id="colord" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#E85D5D" stopOpacity={0.8} />
                <stop offset="95%" stopColor="#E85D5D" stopOpacity={0} />
              </linearGradient>
              <linearGradient id="colorr" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#5DE890" stopOpacity={0.8} />
                <stop offset="95%" stopColor="#5DE890" stopOpacity={0} />
              </linearGradient>
            </defs>
            <XAxis dataKey="Date" />
            <YAxis />
            <CartesianGrid strokeDasharray="3 3" />
            <Tooltip />
            <Area
              type="monotone"
              dataKey="Confirmed"
              stroke="#DDE85D"
              fillOpacity={2}
              fill="url(#colorPv)"
            />
            <Area
              type="monotone"
              dataKey="Active"
              stroke="#8884d8"
              fillOpacity={2}
              fill="url(#colorUv)"
            />
            <Area
              type="monotone"
              dataKey="Deaths"
              stroke="#E85D5D"
              fillOpacity={2}
              fill="url(#colord)"
            />
            <Area
              type="monotone"
              dataKey="Recovered"
              stroke="#5DE890"
              fillOpacity={2}
              fill="url(#colorr)"
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    );
  }
}
