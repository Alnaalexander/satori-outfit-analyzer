document.addEventListener("DOMContentLoaded", () => {
  const outfitForm = document.getElementById("outfitForm")
  const analyzeForm = document.getElementById("analyzeForm")
  const suggestedOutfits = document.getElementById("suggestedOutfits")
  const outfitList = document.getElementById("outfitList")
  const analysisResult = document.getElementById("analysisResult")

  outfitForm.addEventListener("submit", (e) => {
    e.preventDefault()
    generateOutfits()
  })

  analyzeForm.addEventListener("submit", (e) => {
    e.preventDefault()
    analyzeOutfit()
  })

  function generateOutfits() {
    const tops = document
      .getElementById("tops")
      .value.split(",")
      .map((item) => item.trim())
    const pants = document
      .getElementById("pants")
      .value.split(",")
      .map((item) => item.trim())
    const accessories = document
      .getElementById("accessories")
      .value.split(",")
      .map((item) => item.trim())
    const suggestions = []

    tops.forEach((top) => {
      pants.forEach((pant) => {
        accessories.forEach((accessory) => {
          suggestions.push(`${top} + ${pant} + ${accessory}`)
        })
      })
    })

    displayOutfits(suggestions)
  }

  function displayOutfits(outfits) {
    outfitList.innerHTML = ""
    outfits.forEach((outfit) => {
      const li = document.createElement("li")
      li.textContent = outfit
      outfitList.appendChild(li)
    })
    suggestedOutfits.style.display = "block"
  }

  function analyzeOutfit() {
    const imageFile = document.getElementById("outfitImage").files[0]
    const occasion = document.getElementById("occasion").value
    const contrast = document.getElementById("contrast").value

    if (!imageFile || !occasion || !contrast) {
      alert("Please complete all fields.")
      return
    }

    analysisResult.textContent = "Analyzing your outfit..."

    // Simulating API call with setTimeout
    setTimeout(() => {
      const analysis = mockAnalyzeOutfit(occasion, contrast)
      analysisResult.innerHTML = `<p><strong>Feedback:</strong> ${analysis.feedback}</p>
                                        <p><strong>Suggestions:</strong> ${analysis.suggestions}</p>`
    }, 2000)
  }

  function mockAnalyzeOutfit(occasion, contrast) {
    const feedbackOptions = {
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

    const contrastSuggestions = {
      high: "High contrast brings energy and excitement to your outfit.",
      low: "Low contrast offers a soft and subtle elegance.",
      neutral: "Neutral contrast keeps the outfit balanced and versatile.",
    }

    const randomFeedback = feedbackOptions[occasion][Math.floor(Math.random() * feedbackOptions[occasion].length)]
    const contrastFeedback = contrastSuggestions[contrast]
    const feedback = `${randomFeedback} ${contrastFeedback}`
    const suggestions = "Experiment with different textures or add a pop of color to elevate your style."

    return { feedback, suggestions }
  }
})

