"use client";
import React, { useState, useCallback } from "react";
import CodeMirror from "@uiw/react-codemirror";
import { javascript } from "@codemirror/lang-javascript";
import { atomone } from "@uiw/codemirror-theme-atomone";
import { dracula } from "@uiw/codemirror-theme-dracula";
import { githubLight } from "@uiw/codemirror-theme-github";

const Home: React.FC = () => {
  const [code, setCode] = useState<string>("console.log('hello world!');");
  const [output, setOutput] = useState<string>("");
  const [theme, setTheme] = useState<any>(atomone);

  const onChange = useCallback((value: string) => {
    setCode(value);
  }, []);

  const runCode = () => {
    try {
      const capturedLogs: string[] = [];
      const originalConsoleLog = console.log;

      console.log = (...args: any[]) => {
        capturedLogs.push(args.join(" "));
        originalConsoleLog.apply(console, args);
      };

      eval(code);

      console.log = originalConsoleLog;
      setOutput(capturedLogs.join("\n"));
    } catch (error) {
      setOutput((error as Error).toString());
    }
  };

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
    <main className="grid grid-cols-3 h-screen">
      <div className="row-span-1 col-span-2 bg-gray-900 p-4 flex flex-col h-full">
        <div className="mb-4 flex justify-between items-center">
          <button
            onClick={runCode}
            className="p-3 bg-blue-500 hover:bg-blue-700 text-white font-semibold text-lg rounded"
          >
            Run Code
          </button>
          <select
            onChange={handleThemeChange}
            className="p-2 rounded bg-gray-700 text-white"
          >
            <option value="atomone">Atom One</option>
            <option value="dracula">Dracula</option>
            <option value="githubLight">GitHub Light</option>
          </select>
        </div>
        <CodeMirror
          value={code}
          height="100%"
          extensions={[javascript({ jsx: true })]}
          onChange={onChange}
          theme={theme}
          className="w-full h-full text-xl flex-grow"
        />
      </div>
      <div className="row-span-1 col-span-1 bg-gray-900 text-white p-5 flex flex-col h-full">
        <h2 className="text-lg font-semibold mb-2">Console Output:</h2>
        <pre className="bg-gray-800 p-3 rounded h-full overflow-auto">
          {output}
        </pre>
      </div>
    </main>
  );
};

export default Home;
