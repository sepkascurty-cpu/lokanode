import type { Metadata } from "next";
import { Space_Grotesk, Inter } from "next/font/google";
import "./globals.css";

const spaceGrotesk = Space_Grotesk({
  variable: "--font-space-grotesk",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800"],
});

export const metadata: Metadata = {
  title: "LOKANODE — Futuristic Tech Newsroom | Technology Beyond Gravity",
  description: "LOKANODE is a premium aerospace-modern technology newsroom. Exploring the frontiers of Artificial Intelligence, orbital space flight, quantum neural computing, robotics, and future civilizations.",
  keywords: ["technology news", "aerospace", "space tech", "artificial intelligence", "robotics", "quantum computing", "semiconductor geopolitics"],
  authors: [{ name: "LOKANODE News Team" }],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${spaceGrotesk.variable} ${inter.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-[#05070A] text-white">
        {/* Hidden Google Translate Target */}
        <div id="google_translate_element" style={{ display: "none" }} />
        
        {children}

        {/* Google Translate Boot Scripts */}
        <script
          dangerouslySetInnerHTML={{
            __html: `
              function googleTranslateElementInit() {
                new google.translate.TranslateElement({
                  pageLanguage: 'en',
                  includedLanguages: 'en,id',
                  layout: google.translate.TranslateElement.InlineLayout.SIMPLE
                }, 'google_translate_element');
              }
            `,
          }}
        />
        <script
          src="//translate.google.com/translate_a/element.js?cb=googleTranslateElementInit"
          async
          defer
          className="lazyload"
        />
      </body>
    </html>
  );
}
