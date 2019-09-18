import React, { FormEvent, useState, useEffect } from "react";
import { NextPage } from "next";

import Donut from "../../components/lib/D3/Donut";
import Pie from "../../components/lib/D3/Pie";
import Bar from "../../components/lib/D3/Bar";

interface IProps {
  form: any;
  getInitalProps: any;
}

const UsingD3: NextPage<IProps> = props => {
  return (
    <div>
      <h2>D3 Chart Example</h2>
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          textAlign: "center"
        }}>
        <Donut />
        <Pie />
      </div>
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          textAlign: "center",
          marginTop: 30
        }}>
        <Bar />
      </div>
    </div>
  );
};

export default UsingD3;
