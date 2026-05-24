"use client";

import * as React from "react";

function ContentProtection() {
  React.useEffect(() => {
    // Block right-click context menu
    const blockContext = (e: MouseEvent) => e.preventDefault();

    // Block copy/cut clipboard events
    const blockClipboard = (e: ClipboardEvent) => e.preventDefault();

    // Block keyboard shortcuts: Ctrl/Cmd + C/A/S/U/P, F12
    const blockShortcuts = (e: KeyboardEvent) => {
      if (e.key === "F12") {
        e.preventDefault();
        return;
      }
      if (
        (e.ctrlKey || e.metaKey) &&
        ["c", "C", "a", "A", "s", "S", "u", "U", "p", "P"].includes(e.key)
      ) {
        e.preventDefault();
      }
    };

    // Block image drag-to-download
    const blockDrag = (e: DragEvent) => {
      if ((e.target as HTMLElement).tagName === "IMG") {
        e.preventDefault();
      }
    };

    document.addEventListener("contextmenu", blockContext);
    document.addEventListener("copy", blockClipboard);
    document.addEventListener("cut", blockClipboard);
    document.addEventListener("keydown", blockShortcuts);
    document.addEventListener("dragstart", blockDrag);

    return () => {
      document.removeEventListener("contextmenu", blockContext);
      document.removeEventListener("copy", blockClipboard);
      document.removeEventListener("cut", blockClipboard);
      document.removeEventListener("keydown", blockShortcuts);
      document.removeEventListener("dragstart", blockDrag);
    };
  }, []);

  return null;
}

export { ContentProtection };
