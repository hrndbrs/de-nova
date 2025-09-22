"use client";

import { Suspense, useState } from "react";
import { Button } from "./ui/button";
import { BigFiveReport } from "./bigfive-report";
import { AIAnalysis, AnalysisLoader } from "./ai-analysis";
import { Card } from "./ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";
import { Copy, Share } from "lucide-react";
import { EmailModal, EmailModalTrigger } from "./email-modal";

type ResultProps = {
  id: string;
};

export function Result({ id }: ResultProps) {
  const [isEmailModalOpen, setIsEmailModalOpen] = useState(false);
  const [_, setCopied] = useState(false);

  const handleCopyCode = async () => {
    try {
      await navigator.clipboard.writeText(id);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Failed to copy code:", err);
    }
  };

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: "deNOVA MIND - Hasil Analisis Kepribadian",
          text: `Lihat hasil analisis kepribadian saya di deNOVA MIND. Kode: ${id}`,
          url: window.location.origin + "/cek-results",
        });
      } catch (err) {
        console.error("Error sharing:", err);
      }
    } else {
      handleCopyCode();
    }
  };

  return (
    <>
      {/* Code Display and Actions */}
      <div className="flex flex-col lg:flex-row gap-6 items-start">
        <div className="flex-1">
          <Card className="p-4">
            <div className="flex items-center gap-3">
              <code className="flex-1 text-sm font-mono bg-muted px-3 py-2 rounded">
                {id || "Loading..."}
              </code>
              <Button variant="ghost" size="sm" onClick={handleCopyCode}>
                <Copy className="h-4 w-4" />
              </Button>
            </div>
            <p className="text-xs text-muted-foreground mt-2">
              *Simpan kode ini untuk cek kembali hasil big-five analysis kamu
            </p>
          </Card>
        </div>

        <div className="flex gap-3">
          <Button
            onClick={handleShare}
            className="flex items-center gap-2"
            disabled
          >
            <Share className="h-4 w-4" />
            Bagikan
          </Button>
          <Suspense fallback={<EmailModalTrigger disabled />}>
            <EmailModalTrigger onClick={() => setIsEmailModalOpen(true)} />
          </Suspense>
        </div>
      </div>
      <Tabs defaultValue="big-five" className="w-full">
        <TabsList className="grid w-full grid-cols-2 max-w-md mx-auto">
          <TabsTrigger value="big-five">Big-Five</TabsTrigger>
          <TabsTrigger value="ai-analysis">AI Analysis</TabsTrigger>
        </TabsList>

        <TabsContent value="big-five" className="space-y-6">
          <BigFiveReport />
        </TabsContent>
        <TabsContent value="ai-analysis" className="space-y-6">
          <Suspense fallback={<AnalysisLoader />}>
            <AIAnalysis />
          </Suspense>
        </TabsContent>
      </Tabs>

      <Suspense>
        <EmailModal
          isOpen={isEmailModalOpen}
          onClose={() => setIsEmailModalOpen(false)}
        />
      </Suspense>
    </>
  );
}
