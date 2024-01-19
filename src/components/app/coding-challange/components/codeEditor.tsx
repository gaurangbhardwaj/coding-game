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
}

const CodeEditor: React.FC<ICodeEditor> = ({
  theme = "vs-dark",
  code = "",
  onChange = () => {},
  height = "500px",
  width = `600px`,
  lang = "javascript",
  defaultValue = "// Add you code here",
}) => {
  const [value, setValue] = useState<string | undefined>(code || "");
  const handleEditorChange = (value: string | undefined) => {
    setValue(value);
    onChange(value);
  };
  return (
    <Editor
      height={height}
      width={width}
      language={lang}
      value={value}
      theme={theme}
      defaultValue={defaultValue}
      onChange={handleEditorChange}
    />
  );
};

export default CodeEditor;
