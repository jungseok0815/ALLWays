import React, { useState } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

function MemoEditor() {
  const [memo, setMemo] = useState("");

  const handleChange = (value) => {
    setMemo(value);
  };

  const handleSave = () => {
    // 메모 저장 로직을 추가하세요
    console.log("메모 저장:", memo);
  };

  return (
    <div>
      <ReactQuill value={memo} onChange={handleChange} />
      <button onClick={handleSave}>저장</button>
    </div>
  );
}

export default MemoEditor;
