import React, { useEffect, useState, useRef } from "react";
import * as d3 from "d3";
import Faker from "faker";

type TData = {
  key: number;
  label: string;
  values: any;
};

const Line = () => {
  const uniqueDates = ["2014-06-01", "2015-06-01", "2016-06-01"];
  const margin = { top: 40, right: 40, bottom: 150, left: 40 };
  const [width, height] = [
    800 - margin.left - margin.right,
    500 - margin.top - margin.bottom
  ];
  const NODE = useRef(null);

  const [data, setData] = useState([
    {
      key: 1,
      label: "Data Set 1",
      values: [
        { date: uniqueDates[0], value: 481404864 },
        { date: uniqueDates[1], value: 597660864 },
        { date: uniqueDates[2], value: 579396352 }
      ]
    },
    {
      key: 2,
      label: "Data Set 2",
      values: [
        { date: uniqueDates[0], value: 277259625 },
        { date: uniqueDates[1], value: 312616500 },
        { date: uniqueDates[2], value: 398914625 }
      ]
    },
    {
      key: 3,
      label: "Data Set 3",
      values: [
        { date: uniqueDates[0], value: 32406000 },
        { date: uniqueDates[1], value: 48613500 },
        { date: uniqueDates[2], value: 54267125 }
      ]
    }
  ]);

  const xLine = d3
    .scaleTime()
    .domain([
      new Date(uniqueDates[0]),
      new Date(uniqueDates[uniqueDates.length - 1])
    ])
    .rangeRound([0, width]);
  const yMax = 657426950;
  const y = d3
    .scaleLinear()
    .domain([0, yMax])
    .rangeRound([height, 0]);

  const line = d3
    .line<{ date: string; value: number }>()
    .x(d => xLine(new Date(d.date)))
    .y(d => y(d.value));

  const handleMouseOver = (
    d: { date: string; start: number; width: number },
    i: number
  ) => {
    d3.select((event as any).target.parentNode)
      .select(".focus-grid")
      .attr("opacity", "1");

    data.map((_, index) => {
      d3.select(
        d3
          .selectAll(".line-g")
          .selectAll("circle")
          .nodes()[data.length * index + i]
      ).style("r", "5.5");
    });

    const pivotData = data.find((e, i) => {
      return e.values[i].date == d.date;
    });
    showTooltip(pivotData, ".LineTooltip");
  };

  const handleMouseOut = (
    d: { date: string; start: number; width: number },
    i: number
  ) => {
    d3.select((event as any).target.parentNode)
      .select(".focus-grid")
      .attr("opacity", "0");
    d3.select(".LineTooltip")
      .style("display", "none")
      .style("opacity", "0");
    data.map((_, index) => {
      d3.select(
        d3
          .selectAll(".line-g")
          .selectAll("circle")
          .nodes()[data.length * index + i]
      ).style("r", "3.5");
    });
  };

  const showTooltip = (d, element) => {
    console.log(event);
    let xPosition = (event as MouseEvent).pageX + 20;
    let yPosition = (event as MouseEvent).pageY + 20;
  };

  return (
    <div style={{ flex: 1 }}>
      <svg
        width={width + margin.left + margin.right}
        height={height + margin.top + margin.bottom}
        ref={NODE}>
        <g transform={`translate(${margin.left}, ${margin.top})`}>
          {uniqueDates.map((d, i) => {
            const xNow = xLine(new Date(d));
            const xPrev =
              i >= 1
                ? xLine(new Date(uniqueDates[i - 1]))
                : xLine(new Date(uniqueDates[0]));
            const xNext =
              i < uniqueDates.length - 1
                ? xLine(new Date(uniqueDates[i + 1]))
                : xLine(new Date(uniqueDates[uniqueDates.length - 1]));

            let xWidth = i === 0 ? xNext - xNow : xNow - xPrev;
            let xStart = i === 0 ? 0 : xNow - xWidth / 2;
            xWidth =
              i === 0 || i === uniqueDates.length - 1 ? xWidth / 2 : xWidth;
            console.log(
              "xNow",
              xNow,
              "xPrev",
              xPrev,
              "xNext",
              xNext,
              "xWidth",
              xWidth,
              "xStart",
              xStart
            );

            xStart = uniqueDates.length > 1 ? xStart : 0;
            xWidth = uniqueDates.length > 1 ? xWidth : width;

            const dateSpaces = { date: d, start: xStart, width: xWidth };

            return (
              <g className="focus-space">
                <line
                  className="focus-grid"
                  stroke="lightgray"
                  strokeWidth={1}
                  opacity={0}
                  x1={xLine(new Date(d))}
                  y1={0}
                  x2={xLine(new Date(d))}
                  y2={height}
                />
                <rect
                  className="focus-g"
                  x={xStart}
                  y={0}
                  width={xWidth}
                  height={height}
                  opacity={0}
                  onMouseOver={() => handleMouseOver(dateSpaces, i)}
                  onMouseOut={() => handleMouseOut(dateSpaces, i)}
                />
              </g>
            );
          })}
          {data.map((d, i) => {
            const pathRange = d3
              .scaleLinear()
              .domain([0, 100])
              .range([1, 10]);

            return (
              <g className="line-g">
                <path
                  fill="none"
                  strokeWidth={pathRange(1)}
                  strokeLinejoin="round"
                  strokeLinecap="round"
                  stroke={d3.rgb(d3.schemePaired[i]).toString()}
                  d={line(d.values)}
                />
                {d.values.map(row => {
                  return (
                    <circle
                      r={3.5}
                      fill={d3.rgb(d3.schemePaired[i]).toString()}
                      stroke="#fff"
                      cx={xLine(new Date(row.date))}
                      cy={y(row.value)}
                    />
                  );
                })}
              </g>
            );
          })}
        </g>
      </svg>
      <div
        className="LineTooltip"
        style={{ position: "absolute", display: "none", opacity: 0 }}>
        <div
          className="value"
          style={{
            display: "inline-flex",
            alignItems: "center",
            height: "100%"
          }}></div>
      </div>
    </div>
  );
};

export default Line;
