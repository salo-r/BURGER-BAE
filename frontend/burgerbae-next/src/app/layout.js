import Script from "next/script";
import ReduxProvider from "@/providers/ReduxProvider";
import LayoutProvider from "@/providers/LayoutProvider";

import "@/app/globals.css";

export default function RootLayout({ children }) {
  return (
    <html>
      <head>
<link
  rel="stylesheet"
  href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css"
/></head>
      <body>
         <Script
          src="https://checkout.razorpay.com/v1/checkout.js"
          strategy="afterInteractive"
        />
        <ReduxProvider>
          <LayoutProvider>{children}</LayoutProvider>
        </ReduxProvider>
      </body>
    </html>
  );
}
