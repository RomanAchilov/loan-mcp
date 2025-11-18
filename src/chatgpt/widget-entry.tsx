import React from "react";
import { createRoot, Root } from "react-dom/client";

import LoanRecommendation from "./LoanRecommendation";
import { ChatGPTIntegration, useChatGPTToolOutput } from "./integration";
import { getBaseURL } from "../lib/config";

import "@/styles.css";

const CONTAINER_ID = "tanstack-app-root";

function ensureRoot(): Root {
  const container = document.getElementById(CONTAINER_ID);
  if (!container) {
    throw new Error(`Container #${CONTAINER_ID} not found`);
  }

  let root = (container as any)._reactRoot as Root | undefined;
  if (!root) {
    root = createRoot(container);
    (container as any)._reactRoot = root;
  }
  return root;
}

function PlaceLoanRecommendation() {
  const toolOutput = useChatGPTToolOutput<{ id?: string }>();
  if (!toolOutput?.id) {
    return null;
  }
  return (
    <LoanRecommendation id={toolOutput.id}>
      <a
        onClick={() => {
          (window as any).openai.openExternal({
            href: `${getBaseURL()}example/loans/${toolOutput.id}`,
          });
        }}
      >
        <button className="bg-gradient-to-r from-blue-500 to-cyan-600 text-white px-4 py-1.5 rounded-lg text-sm hover:opacity-90 transition-opacity">
          Подробнее
        </button>
      </a>
    </LoanRecommendation>
  );
}

function render() {
  ensureRoot().render(
    <React.StrictMode>
      <ChatGPTIntegration>
        <PlaceLoanRecommendation />
      </ChatGPTIntegration>
    </React.StrictMode>
  );
}

render();
