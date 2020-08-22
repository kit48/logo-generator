import * as React from 'react';

export interface LogoProps extends React.HTMLProps<HTMLDivElement> {
  name: string;
  number: string;
  backgroundColor: string;
  square?: boolean;
}

export default (props: LogoProps) => {
  const { name, number, backgroundColor = '#8fd3f6', style, square, ...rest } = props;

  const fontStyle: React.CSSProperties = {
    marginTop: -6,
    marginLeft: -6,
  };

  return (
    <div
      style={{
        userSelect: 'none',
        width: square ? 330 : 234,
        height: 330,
        paddingLeft: square ? 48 : 0,
        backgroundColor,
        boxSizing: 'border-box',
        color: '#fefefe',
        fontFamily: "'Inconsolata', monospace",
        letterSpacing: '-12px',
        fontSize: '180px',
        lineHeight: '125px',
        ...style,
      }}
      {...rest}
    >
      <div style={fontStyle}>{name || '　'}</div>
      <div style={fontStyle}>{number}</div>
    </div>
  );
};
