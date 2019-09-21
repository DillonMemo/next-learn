import React, { useEffect, useState, useRef } from "react";
import * as d3 from "d3";
import Faker from "faker";

type TData = {
  key: number;
  label: string;
  values: any;
};

/**
 * @description - 배열의 최대값 구하는 알고리즘
 * @param arr - 배열의 비교할 숫자
 * @param arrLength - 배열의 범위
 */
const maxArr = (arr: number[], arrLength: number): number => {
  let max = arr[0];

  for (let i = 1; i < arrLength; i++) {
    if (max < arr[i]) {
      max = arr[i];
    }
  }

  return max;
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
    },
    {
      key: 4,
      label: "Data Set 4",
      values: [
        { date: uniqueDates[0], value: 431404864 },
        { date: uniqueDates[1], value: 362616500 },
        { date: uniqueDates[2], value: 89267125 }
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
  const xLineAxis = d3
    .scaleTime()
    .domain([
      new Date(uniqueDates[0]),
      new Date(uniqueDates[uniqueDates.length - 1])
    ])
    .rangeRound([0, width + 10]);

  const arr = Array();
  data.map(row => {
    row.values.map(d => {
      arr.push(d.value);
    });
  });
  const yMax = maxArr(arr, arr.length);

  const y = d3
    .scaleLinear()
    .domain([0, yMax])
    .rangeRound([height, 0]);

  const line = d3
    .line<{ date: string; value: number }>()
    .x(d => xLine(new Date(d.date)) + margin.left)
    .y(d => y(d.value));

  /// Set Up Axis
  const xAxis = d3
    .scaleBand()
    .rangeRound([0, width + 50])
    .padding(0.05)
    .domain(uniqueDates.map(d => d));
  const yAxis = d3
    .scaleLinear()
    .range([height, 0])
    .domain([0, yMax]);
  const [_xAxis, _yAxis] = [
    d3
      .axisBottom(xLineAxis)
      .tickValues(uniqueDates.map(d => new Date(d)))
      .tickFormat(d => d3.timeFormat("%Y")(new Date(d.toString())))
      .tickSizeOuter(10),
    d3.axisLeft(yAxis).ticks(10)
  ];

  const yGrids = [];
  for (let i = 0; i < 4; i++) {
    const stepY = (i / 3) * yMax;
    yGrids.push(stepY);
  }

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
          .nodes()[_.values.length * index + i]
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
          .nodes()[_.values.length * index + i]
      ).style("r", "3.5");
    });
  };

  const showTooltip = (d, element) => {
    console.log(event);
    let xPosition = (event as MouseEvent).pageX + 20;
    let yPosition = (event as MouseEvent).pageY + 20;
  };

  useEffect(() => {
    const node = d3.select(NODE.current).select("g");

    // Set up left Axis
    node
      .append("g")
      .attr("class", "y axis")
      .attr("transform", `translate(${margin.left - 10}, 0)`)
      .call(_yAxis)
      .append("text")
      .attr("transform", "rotate(-90)")
      .attr("y", -10)
      .attr("dy", "1.71em")
      .attr("dx", ".29em")
      .style("text-anchor", "end")
      .text("Values");

    node
      .append("g")
      .attr("class", "x axis")
      .call(_xAxis)
      .attr("transform", `translate(${margin.left - 10}, ${height})`);

    const xAxisNode = node
      .select(".x")
      .selectAll(".tick")
      .nodes();
    const xNow = uniqueDates.map((d, i) => {
      return xLine(new Date(d));
    });

    xAxisNode.map((d, i) => {
      d3.select(d).attr("transform", `translate(${xNow[i] + 10}, 0)`);
    });
  }, []);

  return (
    <div style={{ flex: 1 }}>
      <svg
        width={width + margin.left + margin.right + 50}
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
                  x1={xLine(new Date(d)) + margin.left}
                  y1={0}
                  x2={xLine(new Date(d)) + margin.left}
                  y2={height}
                />
                <rect
                  className="focus-g"
                  x={xStart + margin.left}
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
              <g className="line-g" transform="translate(20px, 0)">
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
                      cx={xLine(new Date(row.date)) + margin.left}
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
