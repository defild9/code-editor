"use client";
import React, { useState, useCallback } from "react";
import CodeMirror from "@uiw/react-codemirror";
import { html } from "@codemirror/lang-html";
import { css } from "@codemirror/lang-css";
import { atomone } from "@uiw/codemirror-theme-atomone";
import { dracula } from "@uiw/codemirror-theme-dracula";
import { githubLight } from "@uiw/codemirror-theme-github";

const Web: React.FC = () => {
  const [htmlCode, setHtmlCode] = useState<string>(
    "<!DOCTYPE html>\n<html>\n  <head></head>\n  <body></body>\n</html>"
  );
  const [cssCode, setCssCode] = useState<string>("body { margin: 0; }");
  const [theme, setTheme] = useState<any>(atomone);

  const handleHtmlChange = useCallback((value: string) => {
    setHtmlCode(value);
  }, []);

  const handleCssChange = useCallback((value: string) => {
    setCssCode(value);
  }, []);

  const handleThemeChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedTheme = event.target.value;
    if (selectedTheme === "atomone") {
      setTheme(atomone);
    } else if (selectedTheme === "dracula") {
      setTheme(dracula);
    } else if (selectedTheme === "githubLight") {
      setTheme(githubLight);
    }
  };

  return (
    <div className="grid grid-rows-[auto_1fr_1fr] grid-cols-2 h-screen gap-4 p-4">
      <div className="row-span-1 col-span-2 flex justify-between items-center">
        <h1 className="text-xl text-white font-bold">HTML + CSS Editor</h1>
        <select
          onChange={handleThemeChange}
          className="p-2 rounded bg-gray-700 text-white"
        >
          <option value="atomone">Atom One</option>
          <option value="dracula">Dracula</option>
          <option value="githubLight">GitHub Light</option>
        </select>
      </div>
      <div className="row-span-1 col-span-1 flex flex-col">
        <div className="flex-1 bg-gray-800 text-white p-4 rounded-lg shadow-lg overflow-hidden mb-4">
          <h2 className="text-lg font-semibold text-white mb-2">HTML</h2>
          <div className="flex-1 w-full h-full rounded overflow-hidden relative">
            <CodeMirror
              value={htmlCode}
              height="100%"
              extensions={[html()]}
              onChange={handleHtmlChange}
              theme={theme}
              className="w-full h-full"
            />
          </div>
        </div>
      </div>
      <div className="row-span-1 col-span-1 flex flex-col">
        <div className="flex-1 bg-gray-800 text-white p-4 rounded-lg shadow-lg overflow-hidden mb-4">
          <h2 className="text-lg font-semibold text-white mb-2">CSS</h2>
          <div className="flex-1 w-full h-full rounded overflow-hidden relative">
            <CodeMirror
              value={cssCode}
              height="100%"
              extensions={[css()]}
              onChange={handleCssChange}
              theme={theme}
              className="w-full h-full"
            />
          </div>
        </div>
      </div>
      <div className="row-span-1 col-span-2 flex flex-col">
        <div className="flex-1 bg-gray-800 text-white p-4 rounded-lg shadow-lg">
          <h2 className="text-lg font-semibold text-white mb-2">Preview</h2>
          <iframe
            srcDoc={`${htmlCode}<style>${cssCode}</style>`}
            className="w-full h-full rounded border-none"
            style={{ borderRadius: "8px", overflow: "hidden" }}
          />
        </div>
      </div>
    </div>
  );
};

export default Web;
