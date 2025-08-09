import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/not-found";

import { ElementDefault } from "@/pages/ElementDefault";
import { CheckoutPage } from "@/pages/CheckoutPage";
import { SuccessPage } from "@/pages/SuccessPage";
import { CanceledPage } from "@/pages/CanceledPage";

function Router() {
  return (
    <Switch>
      {/* Add pages below */}
      <Route path="/" component={ElementDefault} />
      <Route path="/checkout" component={CheckoutPage} />
      <Route path="/success" component={SuccessPage} />
      <Route path="/canceled" component={CanceledPage} />
      {/* Fallback to 404 */}
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Router />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
