import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { createFileRoute } from "@tanstack/react-router";
import { z } from "zod";
import { handleMcpRequest } from "../utils/mcp-handler";
import { config } from "../lib/config";

import loanProducts from "../data/example-loans";

const server = new McpServer({
  name: "loan-app",
  version: "1.0.0",
});

// Функция для получения базового URL из request или env
const getRequestBaseURL = () => {
  // В Vercel эта переменная доступна
  if (process.env.VERCEL_URL) {
    return `https://${process.env.VERCEL_URL}/`;
  }
  // Fallback для других окружений
  if (process.env.VITE_APP_URL) {
    return process.env.VITE_APP_URL;
  }
  return config.baseURL;
};

server.registerResource(
  "show-loan-html",
  "ui://widget/show-loan.html",
  {},
  async () => {
    const baseURL = getRequestBaseURL();
    const resourceOrigin = (() => {
      try {
        return new URL(baseURL).origin;
      } catch {
        return "http://localhost:3000";
      }
    })();

    return {
      contents: [
        {
          uri: "ui://widget/show-loan.html",
          mimeType: "text/html+skybridge",
          text: `
<link rel="stylesheet" href="${baseURL}chatgpt-widget.css">
<div id="tanstack-app-root"></div>
<script src="${baseURL}chatgpt-widget.js"></script>
          `.trim(),
          _meta: {
            "openai/widgetDomain": "https://chatgpt.com",
            "openai/widgetDescription": "Displays a loan product with styling",
            "openai/widgetCSP": {
              connect_domains: [resourceOrigin],
              resource_domains: [resourceOrigin],
            },
          },
        },
      ],
    };
  }
);

server.registerTool(
  "getLoans",
  {
    title: "Get all loan products",
    description: "Get all loan products from the database. Returns information about available loans including amount, interest rate, term, monthly payment and approval speed.",
  },
  async () => {
    return {
      content: [{ type: "text", text: JSON.stringify(loanProducts) }],
    };
  }
);

server.registerTool(
  "showLoan",
  {
    title: "Show a loan product",
    description: "Show detailed information about a specific loan product from the database",
    inputSchema: {
      id: z.number().describe("The id of the loan product to show"),
    },
    _meta: {
      "openai/outputTemplate": "ui://widget/show-loan.html",
      "openai/toolInvocation/invoking": "Загружаю информацию о кредите...",
      "openai/toolInvocation/invoked": "Информация о кредите загружена!",
    },
  },
  async ({ id }) => {
    const loan = loanProducts.find((loan) => loan.id === +id);
    if (!loan) {
      return {
        content: [{ type: "text", text: "Loan product not found" }],
      };
    }
    return {
      content: [
        {
          type: "text",
          text: JSON.stringify(loanProducts.find((loan) => loan.id === +id)),
        },
      ],
      structuredContent: loan,
    };
  }
);

export const Route = createFileRoute("/mcp")({
  server: {
    handlers: {
      GET: async () => {
        return new Response(
          JSON.stringify({
            name: "loan-app",
            version: "1.0.0",
            description: "Loan Products MCP Server - онлайн кредиты",
            capabilities: {
              tools: true,
              resources: true,
            },
          }),
          {
            status: 200,
            headers: {
              "Content-Type": "application/json",
              "Access-Control-Allow-Origin": "*",
            },
          }
        );
      },
      POST: async ({ request }) => {
        return await handleMcpRequest(request, server);
      },
      OPTIONS: async () => {
        return new Response(null, {
          status: 200,
          headers: {
            "Access-Control-Allow-Origin": "*",
            "Access-Control-Allow-Methods": "GET,POST,PUT,DELETE,OPTIONS",
            "Access-Control-Allow-Headers": "*",
            "Access-Control-Max-Age": "86400",
          },
        });
      },
    },
  },
});
