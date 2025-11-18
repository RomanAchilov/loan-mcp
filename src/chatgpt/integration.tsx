import React, {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";

interface ChatGPTContext {
  toolOutput: any;
}

const ChatGPTEnvironmentContext = createContext<ChatGPTContext>({
  toolOutput: null,
});

export function ChatGPTIntegration({
  children,
}: {
  children: React.ReactNode;
}) {
  const [toolOutput, setToolOutput] = useState<any>(() => {
    return (window as any).openai.toolOutput;
  });

  useEffect(() => {
    let checkInterval = setInterval(() => {
      if ((window as any).openai && (window as any).openai.toolOutput) {
        setToolOutput((window as any).openai.toolOutput);
        clearInterval(checkInterval);
      }
    }, 100);
    return () => clearInterval(checkInterval);
  }, []);

  const contextValue = useMemo(
    () => ({
      toolOutput,
    }),
    [toolOutput]
  );

  return (
    <ChatGPTEnvironmentContext.Provider value={contextValue}>
      {children}
    </ChatGPTEnvironmentContext.Provider>
  );
}

export function useChatGPTToolOutput<T = any>(): T | null {
  const { toolOutput } = useContext(ChatGPTEnvironmentContext);
  return toolOutput as T;
}
