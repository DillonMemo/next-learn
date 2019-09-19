import React, { useState, useRef } from "react";
import * as d3 from "d3";
import { event as currentEvent } from "d3";
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

    // tooltip 핸들러
    const total = d3.sum(data.map(d => d.value));
    const percent = Math.round((1000 * d.data.value) / total) / 10;
    console.log(total, percent);

    d3.select("#DonutTooltip")
      .select(".percent")
      .html(`${percent}%`);
    d3.select("#DonutTooltip")
      .style("display", "block")
      .style("opacity", 1);
  };
  const handleMouseMove = d => {
    console.log(currentEvent);
    // tooltip 핸들러
    d3.select("#DonutTooltip")
      .style("top", (window.event as MouseEvent | any).layerY + 50 + "px")
      .style("left", (window.event as MouseEvent | any).layerX + "px");
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

    // tooltip 핸들러
    d3.select("#DonutTooltip")
      .style("display", "none")
      .style("opacity", 0);
  };

  return (
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
              <g key={d.data.key}>
                <path
                  key={d.index}
                  d={path(d)}
                  fill={`rgba(${d.data.svg.fill.r}, ${d.data.svg.fill.g}, ${d.data.svg.fill.b}, ${d.data.svg.fill.opacity})`}
                  onMouseOver={() => handleMouseOver(d)}
                  onMouseMove={() => handleMouseMove(d)}
                  onMouseOut={() => handleMouseOut(d)}
                  style={{ cursor: "pointer" }}
                />
                {d.data.arc.isTooltip ? (
                  <g></g>
                ) : (
                  <g
                    transform={`translate(${path.centroid(d)[0] -
                      10}, ${path.centroid(d)[1] + 5})`}>
                    <text>{d.value}</text>
                  </g>
                )}
              </g>
            );
          })}
        </g>
      </svg>
      <div
        id="DonutTooltip"
        style={{ position: "absolute", display: "none", opacity: 0 }}>
        <div
          className="percent"
          style={{
            display: "inline-flex",
            alignItems: "center",
            height: "100%"
          }}></div>
      </div>
    </div>
  );
};

export default Donut;
