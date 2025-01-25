import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export function OutfitAnalyzer() {
  const [imageFile, setImageFile] = useState<File | null>(null)
  const [occasion, setOccasion] = useState("")
  const [contrast, setContrast] = useState("")
  const [feedback, setFeedback] = useState("")
  const [suggestions, setSuggestions] = useState("")

  const analyzeOutfit = async () => {
    if (!imageFile || !occasion || !contrast) {
      alert("Please complete all fields.")
      return
    }

    setFeedback("Analyzing your outfit...")
    setSuggestions("")

    const analysis = await mockAnalyzeOutfit(imageFile, occasion, contrast)
    setFeedback(analysis.feedback)
    setSuggestions(analysis.suggestions)
  }

  return (
    <Card className="border-coral-pink-200 shadow-lg hover:shadow-xl transition-shadow duration-300">
      <CardHeader>
        <CardTitle className="text-coral-pink-700">Analyze Your Outfit</CardTitle>
      </CardHeader>
      <CardContent>
        <form className="space-y-4">
          <div>
            <Label htmlFor="outfitImage" className="text-coral-pink-700">
              Upload an Image:
            </Label>
            <Input
              id="outfitImage"
              type="file"
              accept="image/*"
              onChange={(e) => setImageFile(e.target.files?.[0] || null)}
              required
              className="border-coral-pink-300 focus:border-coral-pink-500 focus:ring-coral-pink-500"
            />
          </div>
          <div>
            <Label htmlFor="occasion" className="text-coral-pink-700">
              Select Occasion:
            </Label>
            <Select onValueChange={setOccasion}>
              <SelectTrigger className="border-coral-pink-300 focus:border-coral-pink-500 focus:ring-coral-pink-500">
                <SelectValue placeholder="Choose Occasion" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="casual">Casual</SelectItem>
                <SelectItem value="formal">Formal</SelectItem>
                <SelectItem value="date-night">Date Night</SelectItem>
                <SelectItem value="party">Party</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div>
            <Label htmlFor="contrast" className="text-coral-pink-700">
              Contrast Color Option:
            </Label>
            <Select onValueChange={setContrast}>
              <SelectTrigger className="border-coral-pink-300 focus:border-coral-pink-500 focus:ring-coral-pink-500">
                <SelectValue placeholder="Choose Contrast" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="high">High Contrast</SelectItem>
                <SelectItem value="low">Low Contrast</SelectItem>
                <SelectItem value="neutral">Neutral</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <Button
            type="button"
            onClick={analyzeOutfit}
            className="bg-coral-pink-500 hover:bg-coral-pink-600 text-white transition-colors duration-300"
          >
            Analyze Outfit
          </Button>
        </form>
        {feedback && (
          <div className="mt-4">
            <h3 className="text-lg font-semibold text-coral-pink-700">Analysis Results</h3>
            <p className="text-coral-pink-800">{feedback}</p>
            {suggestions && <p className="mt-2 text-coral-pink-800">{suggestions}</p>}
          </div>
        )}
      </CardContent>
    </Card>
  )
}

async function mockAnalyzeOutfit(imageFile: File, occasion: string, contrast: string) {
  const feedbackOptions: Record<string, string[]> = {
    casual: [
      "Your casual outfit looks comfortable and stylish!",
      "Perfect choice for a laid-back day.",
      "Consider pairing it with sneakers for a sporty touch.",
    ],
    formal: [
      "Your formal attire exudes professionalism.",
      "A classic look that's ideal for a formal setting.",
      "Adding a tie or a blazer might elevate the look further.",
    ],
    "date-night": [
      "Your outfit is romantic and perfect for a date night!",
      "Great choice for an intimate evening.",
      "Consider accessorizing with subtle jewelry to enhance the look.",
    ],
    party: [
      "Your party outfit is vibrant and fun!",
      "You look ready to light up the dance floor.",
      "Adding bold accessories or glitter can make it stand out even more.",
    ],
  }

  const contrastSuggestions: Record<string, string> = {
    high: "High contrast brings energy and excitement to your outfit.",
    low: "Low contrast offers a soft and subtle elegance.",
    neutral: "Neutral contrast keeps the outfit balanced and versatile.",
  }

  const mismatchSuggestions: Record<string, string> = {
    casual: "Your outfit doesn't seem casual enough. Try switching to comfortable jeans and a t-shirt.",
    formal: "Your outfit isn't formal enough. Consider a blazer or tailored pants.",
    "date-night": "Your outfit doesn't match a romantic vibe. Try adding soft tones and elegant accessories.",
    party: "Your outfit doesn't seem party-ready. Go for bold colors and eye-catching accessories.",
  }

  return new Promise<{ feedback: string; suggestions: string }>((resolve) => {
    setTimeout(() => {
      const isMismatch = Math.random() < 0.3
      let feedback: string
      let suggestions: string

      if (isMismatch) {
        feedback = mismatchSuggestions[occasion]
        suggestions = "You might want to rethink your accessories or choose an outfit better suited for the occasion."
      } else {
        const randomFeedback = feedbackOptions[occasion][Math.floor(Math.random() * feedbackOptions[occasion].length)]
        const contrastFeedback = contrastSuggestions[contrast]
        feedback = `${randomFeedback} ${contrastFeedback}`
        suggestions = "Experiment with different textures or add a pop of color to elevate your style."
      }

      resolve({ feedback, suggestions })
    }, 2000)
  })
}

