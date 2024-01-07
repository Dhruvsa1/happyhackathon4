import { useEffect } from "react";
import { useLocation } from "react-router-dom";

export default function ScrollToBottom() {
  const { pathname } = useLocation();

  useEffect(() => {
    // Scroll to the bottom of the page
    window.scrollTo(0, document.body.scrollHeight);
  }, [pathname]);

  return null;
}
