import React, { useState } from "react";
import Editor from "@monaco-editor/react";

interface ICodeEditor {
  theme?: string;
  code?: string;
  onChange?: Function;
  height?: string;
  width?: string;
  lang?: string;
  defaultValue?: string;
  options?: object;
}

const CodeEditor: React.FC<ICodeEditor> = ({
  theme = "vs-dark",
  code = "",
  onChange = () => {},
  height = "500px",
  width = `600px`,
  lang = "javascript",
  defaultValue = "// Add you code here",
  options = {},
}) => {
  const handleEditorChange = (value: string | undefined) => {
    onChange(value);
  };
  return (
    <Editor
      options={options}
      height={height}
      width={width}
      language={lang}
      value={code}
      theme={theme}
      defaultValue={defaultValue}
      onChange={handleEditorChange}
    />
  );
};

export default CodeEditor;
