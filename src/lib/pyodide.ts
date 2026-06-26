/**
 * On-demand Pyodide (CPython in WebAssembly) loader.
 *
 * Nothing downloads until the first call — the multi-MB runtime is fetched
 * from the CDN only when a visitor actually clicks "Run". The promise is
 * memoised so every card on the page shares one interpreter.
 */

const PYODIDE_VERSION = "0.26.4";
const INDEX_URL = `https://cdn.jsdelivr.net/pyodide/v${PYODIDE_VERSION}/full/`;

// Pyodide attaches loadPyodide to window once its script tag loads.
interface PyodideInterface {
  runPythonAsync: (code: string) => Promise<unknown>;
  runPython: (code: string) => unknown;
  loadPackage: (names: string[]) => Promise<void>;
  setStdout: (opts: { batched: (s: string) => void }) => void;
  setStderr: (opts: { batched: (s: string) => void }) => void;
}

declare global {
  interface Window {
    loadPyodide?: (opts: { indexURL: string }) => Promise<PyodideInterface>;
  }
}

let runtime: Promise<PyodideInterface> | null = null;

function loadScript(src: string): Promise<void> {
  return new Promise((resolve, reject) => {
    if (document.querySelector(`script[data-src="${src}"]`)) return resolve();
    const el = document.createElement("script");
    el.src = src;
    el.dataset.src = src;
    el.onload = () => resolve();
    el.onerror = () => reject(new Error(`Failed to load ${src}`));
    document.head.appendChild(el);
  });
}

export function loadPyodideRuntime(): Promise<PyodideInterface> {
  if (!runtime) {
    runtime = (async () => {
      await loadScript(`${INDEX_URL}pyodide.js`);
      if (!window.loadPyodide) throw new Error("Pyodide failed to initialise");
      const py = await window.loadPyodide({ indexURL: INDEX_URL });
      await py.loadPackage(["numpy", "matplotlib"]);
      // Headless backend so matplotlib renders to a buffer, not a GUI;
      // silence the resulting "non-interactive backend" warnings from plt.show().
      py.runPython(
        'import matplotlib\nmatplotlib.use("AGG")\nimport warnings\nwarnings.filterwarnings("ignore")'
      );
      return py;
    })();
  }
  return runtime;
}

/** Run after user code: returns the current matplotlib figure as base64 PNG, or None. */
export const CAPTURE_FIGURE = `
def __capture_figure():
    import io, base64
    try:
        import matplotlib.pyplot as plt
    except Exception:
        return None
    if not plt.get_fignums():
        return None
    buf = io.BytesIO()
    plt.gcf().savefig(buf, format="png", dpi=120, bbox_inches="tight")
    plt.close("all")
    return base64.b64encode(buf.getvalue()).decode()
__capture_figure()
`;
