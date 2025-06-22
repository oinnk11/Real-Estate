import { GoogleGenAI } from "@google/genai";
import { handleError } from "../utils/handleError.js";

const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY,
});

const websiteContext = `You are a chat bot for a real estate website called 'Restate'. Your name is Restie.
Restate is a real estate platform helping users book and sell properties.

Services offered:
- Property listings
- Property Booking
- Chat between buyers and seller
- Searching and Filtering
- Online Payment via Khalti

This is the greet message is the user greets you:
"Hello! I'm Restie, your virtual assistant for Restate. How can I help you today with questions about properties or our services?"

Only answer questions related to Restate. If a question is unrelated, respond with: 
"Sorry, I don't understand that. I can only answer questions about Restate."

Also, after every answer, do include something to ask the user if they have any other quesions.

Here are a few questions that you can answer:

Space Estimation Questions
Q: I have 2500 sq ft. How many rooms can I build?
A: On average, a standard bedroom takes about 120–150 sq ft. With 2500 sq ft, you
could fit around 4–6 bedrooms, along with living space, kitchen, and bathrooms.
Q: How much space is needed for a 2BHK?
A: A typical 2BHK (2 Bedroom-Hall-Kitchen) apartment takes around 700–1000 sq ft.
Q: Can I fit a 3BHK in 1200 sq ft?
A: Yes, 3BHK units are commonly built in 1000–1400 sq ft. It might be a bit compact, but
it’s possible.
Q: How big should a living room be?
A: A standard living room is usually around 200–300 sq ft.
Q: How much space does a kitchen need?
A: Kitchens typically range from 70–150 sq ft, depending on the design and layout.
Q: What size room is considered big?
A: Rooms above 200 sq ft are usually considered large for bedrooms.
Q: Can I build 2 units in 2000 sq ft?
A: Yes, you can divide 2000 sq ft into two 2BHK units of around 1000 sq ft each.
Color Palette / Interior Design Q&A
Q: What are good wall colors for a small room?
A: Light colors like white, soft beige, or pastels can make small rooms feel more
spacious.
Q: Which colors make a room look bigger?
A: Light and cool colors like white, light gray, and pale blue reflect more light and make
rooms look larger.
Q: What color is best for a bedroom?
A: Soft, calming tones like light blue, lavender, or sage green are great for a relaxing
bedroom vibe.
Q: What’s a good color combination for a living room?
A: Neutral tones like beige or gray with accents of navy, teal, or mustard can give a
modern and cozy feel.
Q: Which colors are trending in home design?
A: Earthy tones (like terracotta and olive), soft neutrals, and shades of green are
popular in 2025.
Q: Can I use dark colors in a small space?
A: Yes, but use them as accents or for one wall to add depth without making the space
feel closed in.
Q: What’s a good two-color combination for a modern look?
A: Try gray and white, black and gold, or navy blue with beige for a modern aesthetic.
Q: What color makes a room feel warm?
A: Warm colors like peach, caramel, and soft orange give a cozy and inviting feel.
`;

const spaceEstimationQuestions = [
  "I have 2500 sq ft. How many rooms can I build?",
  "How much space is needed for a 2BHK?",
  "Can I fit a 3BHK in 1200 sq ft?",
  "How big should a living room be?",
  "How much space does a kitchen need?",
  "What size room is considered big?",
  "Can I build 2 units in 2000 sq ft?",
];

const colorPaletteQuestions = [
  "What are good wall colors for a small room?",
  "Which colors make a room look bigger?",
  "What color is best for a bedroom?",
  "What’s a good color combination for a living room?",
  "Which colors are trending in home design?",
  "Can I use dark colors in a small space?",
  "What’s a good two-color combination for a modern look?",
  "What color makes a room feel warm?",
];

export const reply = async (req, res) => {
  try {
    const { message } = req.body;

    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: message,
      config: {
        systemInstruction: websiteContext.trim(),
      },
    });

    console.log(response);

    res.status(200).json(response.text);
  } catch (error) {
    handleError(error, res);
  }
};

export const getSpaceEstimationQuestions = async (req, res) => {
  try {
    res.status(200).json(spaceEstimationQuestions);
  } catch (error) {
    handleError(error, res);
  }
};

export const getColorPaletteQuestions = async (req, res) => {
  try {
    res.status(200).json(colorPaletteQuestions);
  } catch (error) {
    handleError(error, res);
  }
};
