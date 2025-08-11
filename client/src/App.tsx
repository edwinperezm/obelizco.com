import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ElementDefault } from "@/pages/ElementDefault";
import { CheckoutPage } from "@/pages/CheckoutPage";
import { SuccessPage } from "@/pages/SuccessPage";
import { CanceledPage } from "@/pages/CanceledPage";
import { NotFound } from "@/pages/not-found";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";

// Create a client
const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Router>
          <Routes>
            {/* Add pages below */}
            <Route path="/" element={<ElementDefault />} />
            <Route path="/checkout" element={<CheckoutPage />} />
            <Route path="/success" element={<SuccessPage />} />
            <Route path="/canceled" element={<CanceledPage />} />
            {/* Fallback to 404 */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Router>
        <Toaster />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
