import React, { useState } from "react";
import Editor from "@monaco-editor/react";

const CodeEditor: React.FC = ({
  theme = "vs-dark",
  code = "",
  onChange = (value: string | undefined) => {},
  height = "500px",
  width = `600px`,
  lang = "javascript",
  defaultValue = "// Add you code here",
}: any) => {
  const [value, setValue] = useState<string | undefined>(code || "");
  const handleEditorChange = (value: string | undefined) => {
    setValue(value);
    onChange(value);
  };
  return (
    <div>
      <Editor
        height={height}
        width={width}
        language={lang}
        value={value}
        theme={theme}
        defaultValue={defaultValue}
        onChange={handleEditorChange}
      />
    </div>
  );
};

export default CodeEditor;
