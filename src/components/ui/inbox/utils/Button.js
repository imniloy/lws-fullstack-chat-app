import React from 'react';

const Button = ({ className, message, Icon, ...args }) => {
  return (
    <button className={className} {...args}>
      <span>{message}</span>
      <span>{Icon}</span>
    </button>
  );
}

export default Button;
