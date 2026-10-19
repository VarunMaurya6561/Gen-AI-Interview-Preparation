const obj = {
  "matchScore": 85,
  "technicalQuestions": [
    {
      "question": "Explain the difference between JWT and Session-based authentication.",
      "intention": "Assess understanding of security and state management in full-stack applications.",
      "answer": "Session-based authentication is stateful and relies on cookies/server-side storage, whereas JWT is stateless and carries user information in the payload, reducing server overhead."
    },
    {
      "question": "How do you handle middleware in Express.js?",
      "intention": "Evaluate backend proficiency and knowledge of request lifecycle.",
      "answer": "Middleware functions have access to the request, response, and the next function, allowing code execution, request/response modification, and termination of the cycle."
    },
    {
      "question": "Explain the virtual DOM in React and how it improves performance.",
      "intention": "Test React.js core conceptual understanding.",
      "answer": "The virtual DOM is a lightweight copy of the real DOM. React compares the current virtual DOM with a new one via reconciliation and updates only the changed elements, minimizing expensive re-renders."
    },
    {
      "question": "How do you optimize MongoDB queries for performance?",
      "intention": "Check database management expertise.",
      "answer": "Indexing, using aggregation frameworks correctly, limiting returned fields, and avoiding large document growth are key to optimizing MongoDB performance."
    },
    {
      "question": "Describe how you would implement real-time communication in a MERN stack application.",
      "intention": "Check knowledge of advanced features like WebSockets.",
      "answer": "I would use the Socket.io library on top of Node.js to establish a persistent connection between the client and server for bi-directional communication."
    }
  ],
  "behavioralQuestions": [
    {
      "question": "Describe a situation where you had to debug a complex issue under pressure.",
      "intention": "Gauge problem-solving skills and resilience.",
      "answer": "I once faced a race condition in an API. I used step-through debugging and logs to isolate the conflict and successfully resolved it by adjusting the logic."
    },
    {
      "question": "How do you handle disagreements within a development team regarding coding standards?",
      "intention": "Assess communication and team collaboration.",
      "answer": "I prioritize objectivity by referencing established industry best practices or official documentation and focus on finding a consensus that benefits the codebase quality."
    },
    {
      "question": "Tell me about a time you had to learn a new technology quickly to finish a project.",
      "intention": "Evaluate adaptability and willingness to learn.",
      "answer": "I recently learned Tailwind CSS for a project by diving into the official documentation and building a small landing page to practice the utility-first classes."
    },
    {
      "question": "How do you manage your time when juggling multiple feature requests or tasks?",
      "intention": "Examine time management and prioritization skills.",
      "answer": "I use task management tools like Jira or Trello to categorize items by priority and impact, ensuring that critical tasks are completed first."
    },
    {
      "question": "Why do you want to work for our company as a MERN developer?",
      "intention": "Check genuine interest and cultural alignment.",
      "answer": "I am drawn to the focus on innovation and scalability, and I see this as the perfect environment to grow my engineering skills while contributing to high-impact products."
    }
  ],
  "skillsGap": [
    {
      "skill": "TypeScript",
      "severity": "medium"
    },
    {
      "skill": "Cloud Platforms (AWS/Docker)",
      "severity": "high"
    },
    {
      "skill": "CI/CD Pipelines",
      "severity": "medium"
    }
  ],
  "preparationPlan": [
    {
      "day": 1,
      "tasks": [
        "Review ES6+ features",
        "Practice advanced React hooks",
        "Study Context API vs Redux"
      ]
    },
    {
      "day": 2,
      "tasks": [
        "Deep dive into Express.js middleware and error handling",
        "Refactor existing projects to use custom middleware"
      ]
    },
    {
      "day": 3,
      "tasks": [
        "Focus on MongoDB indexing and aggregation",
        "Optimize an existing database schema for better performance"
      ]
    },
    {
      "day": 4,
      "tasks": [
        "Start learning TypeScript basics",
        "Convert a small JavaScript module to TypeScript"
      ]
    },
    {
      "day": 5,
      "tasks": [
        "Study Docker containers and basic CI/CD concepts",
        "Deploy a project to Vercel or Render"
      ]
    },
    {
      "day": 6,
      "tasks": [
        "Mock Interview: Review technical and behavioral answers",
        "Record a practice session for clarity"
      ]
    },
    {
      "day": 7,
      "tasks": [
        "Review GitHub repositories to ensure clean, documented code",
        "Perform a final audit of resume project links"
      ]
    }
  ]
}


console.log(obj.technicalQuestions);


