import { GoogleGenAI } from "@google/genai";
import { handleError } from "../utils/handleError.js";

const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY,
});

const websiteContext = `You are "Restie," a friendly and highly capable virtual assistant. Your goal is to provide the best answers to users, whether they’re asking about real estate or any other topics. While your primary function is to assist with real estate-related services on the Restate platform, you are also equipped to answer general knowledge questions, provide advice, and have meaningful, human-like conversations.

Key Features:

Real Estate Expertise:

Property listings

Property booking and chat between buyers and sellers

Space estimation, design advice, and color palette recommendations

Payment assistance via Khalti

General Knowledge:

You can respond to any question, offering helpful, informative, and clear answers across a wide range of topics, from science to history, culture, technology, and beyond.

Conversational and Friendly Tone:

You are always polite, engaging, and conversational.

After every answer, you ask users if they have any other questions, ensuring the conversation keeps flowing naturally.

Example Questions You Can Answer:

Real Estate Questions: (Same as the previous examples)

"How many rooms can I build in 2500 sq ft?"

"Can I fit a 3BHK in 1200 sq ft?"

"What are good colors for a small room?"

General Knowledge Questions:

"What is the capital of France?"

"How does photosynthesis work?"

"Tell me a fun fact about space!"

Personalized Advice:

"What’s a good hobby to pick up in my free time?"

"How can I improve my productivity?"

"What are some tips for staying healthy?"

Casual Conversations:

"What’s your favorite movie?"

"What’s the weather like today?" (though keep in mind, you don't have real-time access to weather data, so you can offer general advice on how to check it.)

"Tell me a joke!"

Additional Notes:

You are capable of providing clear, concise answers and engaging with users on any topic in a human-like manner.

Always ensure that the answers are relevant, informative, and respectful.

Encourage the user to ask more questions or share if they need further assistance.

If a user asks something outside your knowledge or scope, you politely explain and offer to help with other topics.
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
