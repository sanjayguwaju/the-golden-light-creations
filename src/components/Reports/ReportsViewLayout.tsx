import { Geist, Geist_Mono } from "next/font/google";
import { ReportsView } from "./ReportsView";

const geist = Geist({ subsets: ["latin"], variable: "--font-geist" });
const geistMono = Geist_Mono({ subsets: ["latin"], variable: "--font-geist-mono" });

export function ReportsViewLayout() {
  return (
    <div className={`reports-view ${geist.variable} ${geistMono.variable}`}>
      <ReportsView />
    </div>
  );
}
