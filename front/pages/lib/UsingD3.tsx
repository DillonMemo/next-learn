import React, { FormEvent, useState, useEffect } from "react";
import { NextPage } from "next";

import Donut from "../../components/lib/D3/Donut";

interface IProps {
  form: any;
  getInitalProps: any;
}

const UsingD3: NextPage<IProps> = props => {
  return (
    <div>
      <h2>D3 Chart Example</h2>
      <Donut />
    </div>
  );
};

export default UsingD3;
