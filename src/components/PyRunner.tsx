"use client";

import { useState } from "react";
import { CAPTURE_FIGURE, loadPyodideRuntime } from "@/lib/pyodide";

type Status = "idle" | "booting" | "running" | "done" | "error";

const LABEL: Record<Status, string> = {
  idle: "Run",
  booting: "Booting Python…",
  running: "Running…",
  done: "Run again",
  error: "Retry",
};

export default function PyRunner({ code }: { code: string }) {
  const [status, setStatus] = useState<Status>("idle");
  const [output, setOutput] = useState("");
  const [image, setImage] = useState<string | null>(null);
  const [error, setError] = useState("");
  const [booted, setBooted] = useState(false);
  const [showCode, setShowCode] = useState(false);

  async function run() {
    setError("");
    setImage(null);
    setOutput("");
    setStatus(booted ? "running" : "booting");
    try {
      const py = await loadPyodideRuntime();
      setBooted(true);
      setStatus("running");

      let buffer = "";
      const collect = (s: string) => {
        buffer += s;
      };
      py.setStdout({ batched: collect });
      py.setStderr({ batched: collect });

      await py.runPythonAsync(code);
      const figure = (await py.runPythonAsync(CAPTURE_FIGURE)) as string | null;

      setOutput(buffer.trim());
      setImage(figure ? `data:image/png;base64,${figure}` : null);
      setStatus("done");
    } catch (e) {
      setError(e instanceof Error ? e.message : String(e));
      setStatus("error");
    }
  }

  const busy = status === "booting" || status === "running";

  return (
    <div className="runner">
      <div className="runner-bar mono">
        <button onClick={run} disabled={busy} className="runner-run">
          {busy && <span className="spinner" aria-hidden />}
          {LABEL[status]}
        </button>
        <button
          onClick={() => setShowCode((v) => !v)}
          className="runner-toggle"
          aria-expanded={showCode}
        >
          {showCode ? "hide code" : "code"}
        </button>
        {status === "booting" && (
          <span className="runner-hint">first run downloads Python (~10MB)</span>
        )}
      </div>

      {showCode && (
        <pre className="runner-code">
          <code>{code}</code>
        </pre>
      )}

      {(output || image || error) && (
        <div className="runner-out">
          {error ? (
            <pre className="runner-error">{error}</pre>
          ) : (
            <>
              {image && (
                // eslint-disable-next-line @next/next/no-img-element
                <img className="runner-fig" src={image} alt="Plot output" />
              )}
              {output && <pre className="runner-stdout mono">{output}</pre>}
            </>
          )}
        </div>
      )}
    </div>
  );
}
