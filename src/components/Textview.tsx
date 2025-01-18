/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable react/prop-types */

import React from "react";
type TextviewProps = {
  title?: string,
  data?: string | object | any[] | null;
}

const Textview: React.FC<TextviewProps> = ({ title = '-', data }) => {
  return (
    <div>
      <label>{title} <span>{title && data ? ':' : '' }</span></label>
      {data ?
      <span style={{color: 'black', whiteSpace: 'pre-wrap', fontFamily: 'monospace'}}>
        {typeof data === 'string' ? data : JSON.stringify(data, null, 2)}
      </span>
      : '' }
    </div>
  );
};

export default Textview;
