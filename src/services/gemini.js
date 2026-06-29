import { GoogleGenerativeAI } from "@google/generative-ai";

// Initialize Gemini
const genAI = new GoogleGenerativeAI(
  import.meta.env.VITE_GEMINI_API_KEY
);

// Select Gemini model
const model = genAI.getGenerativeModel({
  model: "gemini-2.5-flash",
});

// =====================================================
// AI GOAL DECOMPOSER / SMART PLANNER
// =====================================================

export async function generatePlan(goal) {
  try {
    const prompt = `
You are an expert AI Productivity Coach.

The user wants to achieve this goal:

"${goal}"

Generate:
1. Step-by-step roadmap.
2. Daily plan.
3. Important milestones.
4. Productivity tips.
5. Motivation.

Keep the response practical and well-structured.
`;

    const result = await model.generateContent(prompt);

    return result.response.text();
  } catch (error) {
    console.log("Error generating plan:", error);
    throw error;
  }
}

// =====================================================
// AI PANIC MODE
// =====================================================

export async function generatePanicPlan(
  task,
  deadline,
  progress
) {
  try {
    const prompt = `
You are an emergency productivity coach.

The user is in PANIC MODE.

Task: ${task}
Deadline: ${deadline}
Current Progress: ${progress}%

Create:

1. Emergency action plan.
2. Hour-by-hour schedule.
3. Highest priority tasks only.
4. Distraction avoidance tips.
5. Short motivational message.

Keep the response concise and actionable.
`;

    const result = await model.generateContent(prompt);

    return result.response.text();
  } catch (error) {
    console.log("Error generating panic plan:", error);
    throw error;
  }
}

// =====================================================
// AI PRODUCTIVITY TIPS
// =====================================================

export async function generateProductivityTips(
  completedTasks,
  pendingTasks
) {
  try {
    const prompt = `
You are an AI productivity mentor.

User Stats:

Completed Tasks: ${completedTasks}
Pending Tasks: ${pendingTasks}

Provide:

1. Personalized productivity suggestions.
2. Time management advice.
3. Ways to improve consistency.
4. Motivation.

Keep the response short and practical.
`;

    const result = await model.generateContent(prompt);

    return result.response.text();
  } catch (error) {
    console.log("Error generating productivity tips:", error);
    throw error;
  }
}

export const generateTaskPriorities = async (tasks) => {
  try {
    const prompt = `
You are an expert productivity coach.

Analyze these tasks and rank them in the order the user should complete them.

Consider:
- Deadline
- Priority
- Completion status

Ignore completed tasks.

For each task provide:

1. Task Name
2. Reason
3. Suggested Action

Tasks:
${JSON.stringify(tasks)}

Return the response in beautiful numbered format.
`;

    const result = await model.generateContent(prompt);

    return result.response.text();
  } catch (error) {
    console.log(error);
    return "Unable to generate recommendations.";
  }
};

export const generateProductivityInsights = async (stats) => {
  try {
    const prompt = `
You are an expert productivity coach.

Analyze the following productivity statistics and provide:

1. Overall productivity analysis.
2. Strengths.
3. Areas for improvement.
4. Actionable recommendations.
5. A motivational message.

Statistics:
${JSON.stringify(stats)}

Keep the response concise and motivating.
`;

    const result = await model.generateContent(prompt);

    return result.response.text();
  } catch (error) {
    console.log(error);
    return "Unable to generate productivity insights.";
  }
};

export const generateDailyPlan = async (tasks) => {
  try {
    const prompt = `
You are an expert AI productivity coach.

Create a detailed daily schedule for the user.

Rules:
- Consider deadlines.
- Consider task priorities.
- Ignore completed tasks.
- Schedule difficult tasks earlier in the day.
- Include short breaks.
- Make the schedule realistic.

Tasks:
${JSON.stringify(tasks)}

Return:
Time Slot - Task
Reason

Example:

09:00 AM - Resume Building
Reason: High priority and due tomorrow.

11:00 AM - Study DSP
Reason: Medium priority.

Include motivational advice at the end.
`;

    const result = await model.generateContent(prompt);

    return result.response.text();
  } catch (error) {
    console.log(error);
    return "Unable to generate daily schedule.";
  }
};