"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";
import { Upload, FileText, Edit, UploadCloud } from "lucide-react";

export default function SentimentAnalysisPage() {
  const [inputTab, setInputTab] = useState("text");
  const [textInput, setTextInput] = useState("");
  const [file, setFile] = useState<File | null>(null);
  const [sentimentResult, setSentimentResult] = useState<{
    prediction?: string | string[];
    distribution?: { positive?: number; neutral?: number; negative?: number };
  } | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const gradientElement = document.querySelector(".animate-gradient-x");
    let hue = 0;

    const animateGradient = () => {
      hue = (hue + 1) % 360;
      const color1 = `hsl(${hue}, 100%, 90%)`;
      const color2 = `hsl(${(hue + 60) % 360}, 100%, 90%)`;
      const color3 = `hsl(${(hue + 120) % 360}, 100%, 90%)`;
      gradientElement!.style.backgroundImage = `linear-gradient(to bottom right, ${color1}, ${color2}, ${color3})`;
      requestAnimationFrame(animateGradient);
    };

    animateGradient();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    const formData = new FormData();
    if (textInput) formData.append("text", textInput);
    if (file) formData.append("file", file);

    try {
      if (!process.env.NEXT_PUBLIC_API_URL) {
        throw new Error("API URL is not defined in environment variables");
      }

      const response = await fetch(process.env.NEXT_PUBLIC_API_URL, {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      console.log("Response data:", data); // Debug log

      let distribution = { positive: 0, neutral: 0, negative: 0 };

      if (Array.isArray(data.prediction)) {
        // For multiple predictions, calculate distribution based on counts
        const counts = { positive: 0, neutral: 0, negative: 0 };
        data.prediction.forEach((pred: string) => {
          if (pred === "positive") counts.positive++;
          else if (pred === "neutral") counts.neutral++;
          else if (pred === "negative") counts.negative++;
        });
        const total = data.prediction.length;
        distribution = {
          positive: total > 0 ? counts.positive / total : 0,
          neutral: total > 0 ? counts.neutral / total : 0,
          negative: total > 0 ? counts.negative / total : 0,
        };
      } else {
        // For single prediction, set dominant sentiment to 75% with balanced rest
        if (data.prediction === "positive") {
          distribution = { positive: 0.75, neutral: 0.15, negative: 0.1 };
        } else if (data.prediction === "negative") {
          distribution = { positive: 0.1, neutral: 0.15, negative: 0.75 };
        } else if (data.prediction === "neutral") {
          distribution = { positive: 0.15, neutral: 0.75, negative: 0.1 };
        }
      }

      setSentimentResult({
        prediction: data.prediction,
        distribution,
      });
    } catch (error) {
      console.error("Error during sentiment analysis:", error);
      setSentimentResult({
        prediction: `Error: ${error instanceof Error ? error.message : "Failed to fetch prediction"}`,
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen p-6 md:p-12 bg-gradient-to-br from-pink-100 via-purple-100 to-pink-100 animate-gradient-x">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-10 text-center">Text Sentiment Analysis</h1>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Input Section */}
          <Card className="bg-white/90 backdrop-blur-sm border-none shadow-lg">
            <CardHeader>
              <CardTitle className="text-2xl">Input</CardTitle>
              <CardDescription>Enter text or upload a CSV file for sentiment analysis</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <Tabs defaultValue="text" value={inputTab} onValueChange={setInputTab} className="w-full">
                <TabsList className="grid grid-cols-2 w-full bg-gray-100">
                  <TabsTrigger value="text" className="flex items-center gap-2">
                    <FileText className="h-4 w-4" />
                    Text Input
                  </TabsTrigger>
                  <TabsTrigger value="file" className="flex items-center gap-2">
                    <Upload className="h-4 w-4" />
                    File Upload
                  </TabsTrigger>
                </TabsList>
                <TabsContent value="text" className="mt-4">
                  <div className="space-y-2">
                    <label htmlFor="analysis-text" className="font-medium">
                      Text for Analysis
                    </label>
                    <div className="relative">
                      <Textarea
                        id="analysis-text"
                        placeholder="Enter your text here..."
                        className="min-h-[200px] resize-none pr-12"
                        value={textInput}
                        onChange={(e) => setTextInput(e.target.value)}
                      />
                      <div className="absolute bottom-3 right-3 flex gap-2">
                        <button className="p-1.5 rounded-md bg-gray-100 hover:bg-gray-200 transition-colors">
                          <Edit className="h-4 w-4 text-gray-600" />
                        </button>
                        <button className="p-1.5 rounded-md bg-gray-100 hover:bg-gray-200 transition-colors">
                          <UploadCloud className="h-4 w-4 text-gray-600" />
                        </button>
                      </div>
                    </div>
                  </div>
                </TabsContent>
                <TabsContent value="file" className="mt-4">
                  <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center">
                    <UploadCloud className="h-10 w-10 text-gray-400 mx-auto mb-4" />
                    <p className="text-gray-600 mb-2">Drag and drop your CSV file here</p>
                    <p className="text-gray-400 text-sm mb-4">or</p>
                    <input
                      type="file"
                      accept=".csv"
                      onChange={(e) => setFile(e.target.files?.[0] || null)}
                      className="hidden"
                    />
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => document.querySelector("input[type='file']")?.click()}
                    >
                      Browse Files
                    </Button>
                  </div>
                </TabsContent>
              </Tabs>

              <Button
                className="w-full bg-emerald-600 hover:bg-emerald-700 text-white"
                onClick={handleSubmit}
                disabled={isLoading}
              >
                {isLoading ? "Loading..." : "Submit"}
              </Button>
            </CardContent>
          </Card>

          {/* Results Section */}
          <Card className="bg-white/90 backdrop-blur-sm border-none shadow-lg">
            <CardHeader>
              <CardTitle className="text-2xl">Results</CardTitle>
              <CardDescription>Sentiment analysis prediction and visualization</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div>
                <h3 className="text-xl font-medium mb-3">Prediction</h3>
                <div className="bg-gray-50 rounded-lg p-6 text-center">
                  {sentimentResult?.prediction ? (
                    <div className="text-xl font-medium text-gray-800">
                      {Array.isArray(sentimentResult.prediction)
                        ? `${sentimentResult.prediction.length} predictions`
                        : sentimentResult.prediction +
                          ` (${Math.round(
                            (sentimentResult.distribution?.[sentimentResult.prediction.toLowerCase() as keyof typeof sentimentResult.distribution] || 0) *
                              100
                          )}%)`}
                    </div>
                  ) : (
                    <div className="text-gray-500">No prediction yet</div>
                  )}
                </div>
              </div>

              <div>
                <div className="flex justify-between items-center mb-3">
                  <h3 className="text-xl font-medium">Sentiment Distribution</h3>
                  <svg
                    className="h-5 w-5 text-gray-400"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M3 17H6M10 17H13M17 17H20M3 12H6M10 12H13M17 12H20M3 7H6M10 7H13M17 7H20"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                    />
                  </svg>
                </div>
                <div className="bg-gray-50 rounded-lg p-6">
                  {sentimentResult?.distribution ? (
                    <>
                      <div className="mb-2 flex justify-between">
                        <span className="text-sm font-medium">Positive</span>
                        <span className="text-sm font-medium">
                          {Math.round(sentimentResult.distribution.positive * 100)}%
                        </span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2.5 mb-4">
                        <div
                          className="bg-green-500 h-2.5 rounded-full"
                          style={{ width: `${sentimentResult.distribution.positive * 100}%` }}
                        ></div>
                      </div>
                      <div className="mb-2 flex justify-between">
                        <span className="text-sm font-medium">Neutral</span>
                        <span className="text-sm font-medium">
                          {Math.round(sentimentResult.distribution.neutral * 100)}%
                        </span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2.5 mb-4">
                        <div
                          className="bg-blue-500 h-2.5 rounded-full"
                          style={{ width: `${sentimentResult.distribution.neutral * 100}%` }}
                        ></div>
                      </div>
                      <div className="mb-2 flex justify-between">
                        <span className="text-sm font-medium">Negative</span>
                        <span className="text-sm font-medium">
                          {Math.round(sentimentResult.distribution.negative * 100)}%
                        </span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2.5">
                        <div
                          className="bg-red-500 h-2.5 rounded-full"
                          style={{ width: `${sentimentResult.distribution.negative * 100}%` }}
                        ></div>
                      </div>
                    </>
                  ) : (
                    <div className="text-gray-500">No data to display</div>
                  )}
                </div>
              </div>

              <p className="text-sm text-gray-500 italic">
                Results are based on sentiment analysis algorithms and may not always reflect the intended meaning.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}