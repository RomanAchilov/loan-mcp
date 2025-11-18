import React from "react";
import { createRoot, Root } from "react-dom/client";

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
    <div className="w-full h-[600px] rounded-lg overflow-hidden border border-blue-500/20 shadow-2xl">
      <iframe
        src="https://otp.vanta.ru/widget/85612efd-1454-4748-9ea5-5a546aa4ecda"
        className="w-full h-full"
        title="Заявка на кредит OTP Bank"
        allow="geolocation; microphone; camera"
        style={{ border: 'none' }}
      />
    </div>
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
