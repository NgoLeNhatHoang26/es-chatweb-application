import React from "react";
function MessageInput({ value, onChange }) {
  return (
    <input
      placeholder="Nhập tin nhắn..."
      style={{
        padding: '10px',
        width: '90%',
        fontSize: '1.2rem',
        border: '1px solid #000000',
      }}
      value={value}
      onChange={onChange}
    />
  );
}
export default React.memo(MessageInput)