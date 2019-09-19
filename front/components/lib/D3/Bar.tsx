import React, { useState, useRef, useEffect } from "react";
import * as d3 from "d3";
import { produce } from "immer";

type TData = {
  key: number;
  label: string;
  value: number;
  svg: { fill: d3.RGBColor };
  arc?: {
    outerRadius?: number;
    cornerRadius?: number;
    isTooltip?: boolean;
  };
};

const Bar = () => {
  useEffect(() => {
    Draw();
  }, []);

  const margin = { top: 40, right: 40, bottom: 150, left: 40 };
  const [width, height] = [
    800 - margin.left - margin.right,
    500 - margin.top - margin.bottom
  ];
  const [data, setData] = useState<TData[]>([
    {
      key: 1,
      label: "Category1",
      value: 50,
      svg: { fill: d3.rgb(d3.schemePaired[0]) },
      arc: {
        isTooltip: false
      }
    },
    {
      key: 2,
      label: "Category2",
      value: 50,
      svg: { fill: d3.rgb(d3.schemePaired[1]) },
      arc: {
        isTooltip: false
      }
    },
    {
      key: 3,
      label: "Category3",
      value: 40,
      svg: { fill: d3.rgb(d3.schemePaired[2]) },
      arc: {
        isTooltip: false
      }
    },
    {
      key: 4,
      label: "Category4",
      value: 95,
      svg: { fill: d3.rgb(d3.schemePaired[3]) },
      arc: {
        isTooltip: false
      }
    },
    {
      key: 5,
      label: "Category5",
      value: 35,
      svg: { fill: d3.rgb(d3.schemePaired[4]) },
      arc: {
        isTooltip: false
      }
    }
  ]);

  const NODE = useRef(null);

  const x = d3
    .scaleBand()
    .rangeRound([0, width])
    .padding(0.05)
    .domain(data.map(d => d.label));
  const y = d3
    .scaleLinear()
    .range([height, 0])
    .domain([0, d3.max(data, d => d.value)]);
  const [xAxis, yAxis] = [d3.axisBottom(x), d3.axisLeft(y).ticks(10)];

  const Draw = (): any => {
    const node = d3.select(NODE.current).select("g");

    console.log(node);

    // Set up left Axis
    node
      .append("g")
      .attr("class", "y axis")
      .call(yAxis)
      .append("text")
      .attr("transform", "rotate(-90)")
      .attr("y", -5)
      .attr("dy", "1.71em")
      .attr("dx", ".29em")
      .style("text-anchor", "end")
      .text("Values");

    // Set up bottom Axis
    node
      .append("g")
      .attr("class", "x axis")
      .call(xAxis)
      .style("transform", `translate(${0}, ${height}px)`);

    // node
    //   .selectAll("bar")
    //   .data(data)
    //   .enter()
    //   .append("rect")
    //   .attr("class", "bar")
    //   .attr("x", d => x(d.label))
    //   .attr("width", x.bandwidth())
    //   .attr("y", d => y(d.value))
    //   .attr("height", d => height - y(d.value))
    //   .attr(
    //     "fill",
    //     d =>
    //       `rgba(${d.svg.fill.r}, ${d.svg.fill.g}, ${d.svg.fill.b}, ${d.svg.fill.opacity})`
    //   )
    //   .style("cursor", "pointer")
    //   .on("mouseover", (d: TData) => handleMouseOver(d));
  };

  const handleMouseOver = (d: TData) => {
    setData(
      produce(draft => {
        draft.map((section: TData) => {
          section.arc.isTooltip = section.key == d.key ? true : false;
          section.svg.fill.opacity = section.key == d.key ? 1 : 0.5;
        });
      })
    );

    console.log(d3.select(".BarTooltip").select(".value"));
    d3.select(".BarTooltip")
      .select(".value")
      .html(`${d.value}`);
    d3.select(".BarTooltip")
      .style("display", "block")
      .style("opacity", 1);
  };

  const handleMouseMove = (d: TData) => {
    // console.log(d3.select(NODE.current));
    d3.select(".BarTooltip")
      .style("top", (window.event as MouseEvent).pageY + 250 + "px")
      .style("left", (window.event as MouseEvent).pageX - 225 + "px");
  };

  const handleMouseOut = (d: TData) => {
    setData(
      produce(draft => {
        draft.map(section => {
          section.arc.isTooltip = false;
          section.svg.fill.opacity = 1;
        });
      })
    );

    d3.select(".BarTooltip")
      .style("display", "none")
      .style("opacity", 0);
  };

  return (
    <div style={{ flex: 1 }}>
      <svg
        width={width + margin.left + margin.right}
        height={height + margin.top + margin.bottom}
        ref={NODE}>
        <g transform={`translate(${margin.left}, ${margin.top})`}>
          {data.map(d => {
            return (
              <rect
                className="rectBar"
                x={x(d.label)}
                y={y(d.value)}
                width={x.bandwidth()}
                height={height - y(d.value)}
                fill={`rgba(${d.svg.fill.r}, ${d.svg.fill.g}, ${d.svg.fill.b}, ${d.svg.fill.opacity})`}
                style={{ cursor: "pointer" }}
                onMouseOver={() => handleMouseOver(d)}
                onMouseMove={() => handleMouseMove(d)}
                onMouseOut={() => handleMouseOut(d)}></rect>
            );
          })}
        </g>
      </svg>
      <div
        className="BarTooltip"
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

export default Bar;
