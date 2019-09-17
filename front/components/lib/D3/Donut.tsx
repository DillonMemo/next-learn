import React, { useState, useRef } from "react";
import * as d3 from "d3";
import { select, event } from "d3-selection";
import Faker from "faker";
import { produce } from "immer";

type TData = {
  key: number;
  value: number;
  svg: { fill: d3.RGBColor };
  arc: {
    outerRadius?: number;
    cornerRadius?: number;
    isTooltip?: boolean;
  };
};

const Donut = () => {
  const outerRadius = (Radius = 120) => ({
    fixRadius: Radius + 10,
    basicRadius: Radius
  });
  //   const outerRadius = () => { returnfixRadius: 110, basicRadius: 100 };
  const [data, setData] = useState<TData[]>([
    {
      key: 1,
      value: 50,
      svg: { fill: d3.rgb(d3.schemePaired[0]) },
      arc: {
        outerRadius: outerRadius().basicRadius,
        cornerRadius: 10,
        isTooltip: false
      }
    },
    {
      key: 2,
      value: 50,
      svg: { fill: d3.rgb(d3.schemePaired[1]) },
      arc: {
        outerRadius: outerRadius().basicRadius,
        cornerRadius: 10,
        isTooltip: false
      }
    },
    {
      key: 3,
      value: 40,
      svg: { fill: d3.rgb(d3.schemePaired[2]) },
      arc: {
        outerRadius: outerRadius().basicRadius,
        cornerRadius: 10,
        isTooltip: false
      }
    },
    {
      key: 4,
      value: 95,
      svg: { fill: d3.rgb(d3.schemePaired[3]) },
      arc: {
        outerRadius: outerRadius().basicRadius,
        cornerRadius: 10,
        isTooltip: false
      }
    },
    {
      key: 5,
      value: 35,
      svg: { fill: d3.rgb(d3.schemePaired[4]) },
      arc: {
        outerRadius: outerRadius().basicRadius,
        cornerRadius: 10,
        isTooltip: false
      }
    }
  ]);
  const [width, height] = [300, 300];

  const pie = d3.pie<TData>().value(d => d.value)(data);

  const handleMouseOver = (d: d3.PieArcDatum<TData>) => {
    setData(
      produce(draft => {
        draft.map((section: TData) => {
          section.arc.outerRadius =
            section.key == d.data.key
              ? outerRadius().fixRadius
              : outerRadius().basicRadius;
          section.arc.isTooltip = section.key == d.data.key ? true : false;
          section.svg.fill.opacity = section.key == d.data.key ? 1 : 0.5;
        });
      })
    );

    const total = d3.sum(data.map(d => d.value));
    const percent = Math.round((1000 * d.data.value) / total) / 10;
    console.log(total, percent);

    d3.select("#tooltip")
      .select(".count")
      .html(`${d.data.value}`);
    d3.select("#tooltip")
      .select(".percent")
      .html(`${percent}`);
    d3.select("#tooltip")
      .style("display", "block")
      .style("opacity", 1);
  };
  const handleMouseMove = () => {
    d3.select("#tooltip")
      .style("top", (window.event as MouseEvent).offsetY + 152 + "px")
      .style("left", (window.event as MouseEvent).offsetX + 230 + "px");
  };

  const handleMouseOut = (d: d3.PieArcDatum<TData>) => {
    setData(
      produce(draft => {
        draft.map(section => {
          section.arc.outerRadius = outerRadius().basicRadius;
          section.arc.isTooltip = false;
          section.svg.fill.opacity = 1;
        });
      })
    );

    d3.select("#tooltip")
      .style("display", "none")
      .style("opacity", 0);
  };

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "row",
        textAlign: "center"
      }}>
      <div style={{ flex: 1 }}>
        <svg width={width} height={height}>
          <g transform={`translate(${width / 2}, ${height / 2})`}>
            {pie.map(d => {
              const path = d3
                .arc<any, typeof d>()
                .outerRadius(d.data.arc.outerRadius)
                .innerRadius(70)
                .padAngle(0);

              // 백분율 계산
              const percent =
                Math.round(
                  ((d.endAngle - d.startAngle) / (2 * Math.PI)) * 10000
                ) / 100;

              return (
                <path
                  key={d.index}
                  d={path(d)}
                  fill={`rgba(${d.data.svg.fill.r}, ${d.data.svg.fill.g}, ${d.data.svg.fill.b}, ${d.data.svg.fill.opacity})`}
                  onMouseOver={() => handleMouseOver(d)}
                  onMouseMove={() => handleMouseMove()}
                  onMouseOut={() => handleMouseOut(d)}
                  style={{ cursor: "pointer" }}
                />
              );
            })}
          </g>
        </svg>
        <div id="tooltip" style={{ position: "absolute" }}>
          <div className="count"></div>
          <div className="percent"></div>
        </div>
      </div>
      <div style={{ flex: 1 }}>Sample2</div>
    </div>
  );
};

export default Donut;
