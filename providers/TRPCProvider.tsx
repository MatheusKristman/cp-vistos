"use client";

import { useState } from "react";
import superjson from "superjson";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { httpBatchLink } from "@trpc/react-query";

import { trpc } from "@/lib/trpc-client";

export default function TRPCProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const baseUrl = window.location.origin;

  const [queryClient] = useState(() => new QueryClient());
  const [trpcClient] = useState(
    trpc.createClient({
      links: [
        httpBatchLink({
          url: `${baseUrl}/api/trpc`,
          transformer: superjson,
        }),
      ],
    }),
  );

  return (
    <trpc.Provider client={trpcClient} queryClient={queryClient}>
      <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
    </trpc.Provider>
  );
}
