"use client"

import { useState } from "react"
import { OutfitGenerator } from "./components/outfit-generator"
import { OutfitAnalyzer } from "./components/outfit-analyzer"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

export default function SatoriOutfitAnalyzer() {
  const [generatedOutfits, setGeneratedOutfits] = useState<string[]>([])

  return (
    <div className="container mx-auto px-4 py-8 bg-coral-pink-50">
      <h1 className="text-4xl font-bold text-center mb-2 text-coral-pink-700">SATORI</h1>
      <h2 className="text-2xl font-semibold text-center mb-8 text-coral-pink-600">The Outfit Analyzer</h2>

      <Card className="mb-8 border-coral-pink-200 shadow-lg hover:shadow-xl transition-shadow duration-300">
        <CardHeader>
          <CardTitle className="text-coral-pink-700">About SATORI</CardTitle>
        </CardHeader>
        <CardContent>
          <CardDescription className="text-coral-pink-800">
            The <strong>SATORI Website</strong> is a user-friendly application designed to help users create stylish and
            coordinated outfits by analyzing their wardrobe. It simplifies outfit planning by allowing users to input
            their clothing items and accessories and generating various combinations of outfits.
          </CardDescription>
        </CardContent>
      </Card>

      <div className="grid md:grid-cols-2 gap-8">
        <OutfitGenerator setGeneratedOutfits={setGeneratedOutfits} />
        <OutfitAnalyzer />
      </div>

      {generatedOutfits.length > 0 && (
        <Card className="mt-8 border-coral-pink-200 shadow-lg hover:shadow-xl transition-shadow duration-300">
          <CardHeader>
            <CardTitle className="text-coral-pink-700">Suggested Outfits</CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="list-disc pl-5 text-coral-pink-800">
              {generatedOutfits.map((outfit, index) => (
                <li key={index} className="hover:text-coral-pink-600 transition-colors duration-300">
                  {outfit}
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>
      )}
    </div>
  )
}

