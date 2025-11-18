import React from "react";
import { createRoot, Root } from "react-dom/client";

import LoanRecommendation from "./LoanRecommendation";
import { ChatGPTIntegration, useChatGPTToolOutput } from "./integration";

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
      <button
        onClick={() => {
          (window as any).openai.openExternal({
            href: "https://otp.vanta.ru/widget/85612efd-1454-4748-9ea5-5a546aa4ecda",
          });
        }}
        className="bg-gradient-to-r from-blue-500 to-cyan-600 text-white px-6 py-2 rounded-lg text-sm font-semibold hover:opacity-90 transition-all hover:scale-105 shadow-lg"
      >
        Заполнить заявку
      </button>
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
