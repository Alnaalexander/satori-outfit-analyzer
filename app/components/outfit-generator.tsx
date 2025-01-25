import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

interface OutfitGeneratorProps {
  setGeneratedOutfits: (outfits: string[]) => void
}

export function OutfitGenerator({ setGeneratedOutfits }: OutfitGeneratorProps) {
  const [tops, setTops] = useState("")
  const [pants, setPants] = useState("")
  const [accessories, setAccessories] = useState("")

  const generateOutfits = () => {
    const topsList = tops.split(",").map((item) => item.trim())
    const pantsList = pants.split(",").map((item) => item.trim())
    const accessoriesList = accessories.split(",").map((item) => item.trim())
    const suggestions: string[] = []

    topsList.forEach((top) => {
      pantsList.forEach((pant) => {
        accessoriesList.forEach((accessory) => {
          suggestions.push(`${top} + ${pant} + ${accessory}`)
        })
      })
    })

    setGeneratedOutfits(suggestions)
  }

  return (
    <Card className="border-coral-pink-200 shadow-lg hover:shadow-xl transition-shadow duration-300">
      <CardHeader>
        <CardTitle className="text-coral-pink-700">Generate Outfit Combinations</CardTitle>
      </CardHeader>
      <CardContent>
        <form className="space-y-4">
          <div>
            <Label htmlFor="tops" className="text-coral-pink-700">
              Enter Tops (comma-separated):
            </Label>
            <Input
              id="tops"
              value={tops}
              onChange={(e) => setTops(e.target.value)}
              placeholder="e.g., Red Shirt, Blue T-Shirt"
              className="border-coral-pink-300 focus:border-coral-pink-500 focus:ring-coral-pink-500"
            />
          </div>
          <div>
            <Label htmlFor="pants" className="text-coral-pink-700">
              Enter Pants (comma-separated):
            </Label>
            <Input
              id="pants"
              value={pants}
              onChange={(e) => setPants(e.target.value)}
              placeholder="e.g., Black Jeans, White Trousers"
              className="border-coral-pink-300 focus:border-coral-pink-500 focus:ring-coral-pink-500"
            />
          </div>
          <div>
            <Label htmlFor="accessories" className="text-coral-pink-700">
              Enter Accessories (comma-separated):
            </Label>
            <Input
              id="accessories"
              value={accessories}
              onChange={(e) => setAccessories(e.target.value)}
              placeholder="e.g., Watch, Hat, Sunglasses"
              className="border-coral-pink-300 focus:border-coral-pink-500 focus:ring-coral-pink-500"
            />
          </div>
          <Button
            type="button"
            onClick={generateOutfits}
            className="bg-coral-pink-500 hover:bg-coral-pink-600 text-white transition-colors duration-300"
          >
            Generate Outfit Suggestions
          </Button>
        </form>
      </CardContent>
    </Card>
  )
}

