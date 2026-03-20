export async function GET() {
  const questions = {
    "Google": [
      {
        "question": "What is a challenging Networking problem you faced at work?",
        "year": 2020,
        "round": "Managerial",
        "difficulty": "Easy",
        "tags": ["Data Structures", "Backend"]
      },
      {
        "question": "What is a challenging Databases problem you faced at work?",
        "year": 2021,
        "round": "Technical",
        "difficulty": "Hard",
        "tags": ["Leadership", "AWS"]
      },
      {
        "question": "What is a challenging Leadership problem you faced at work?",
        "year": 2021,
        "round": "Technical",
        "difficulty": "Hard",
        "tags": ["GCP", "Kubernetes"]
      },
      {
        "question": "Describe a time when you had to handle a difficult technical issue.",
        "year": 2023,
        "round": "Behavioral",
        "difficulty": "Medium",
        "tags": ["Problem Solving", "Cloud"]
      },
      {
        "question": "How do you optimize a microservices architecture for scalability?",
        "year": 2022,
        "round": "Technical",
        "difficulty": "Medium",
        "tags": ["System Design", "Backend"]
      },
    {
      "question": "Describe your experience with continuous integration/continuous deployment (CI/CD).",
      "year": 2022,
      "round": "Behavioral",
      "difficulty": "Medium",
      "tags": ["DevOps", "CI/CD"]
    },
    {
      "question": "How do you handle database replication for high availability?",
      "year": 2024,
      "round": "Technical",
      "difficulty": "Hard",
      "tags": ["Databases", "AWS"]
    }
  ],
  Amazon: [
    {
      question: "Describe your approach to handling scalability in cloud architecture.",
      year: 2023,
      round: "Technical",
      difficulty: "Hard",
      tags: ["Cloud", "AWS"]
    }
  ],
  "Uber": [
    {
      "question": "Explain how you would implement a distributed system for real-time location tracking.",
      "year": 2023,
      "round": "System Design",
      "difficulty": "Hard",
      "tags": ["Distributed Systems", "Real-Time"]
    },
    {
      "question": "What are the challenges in maintaining consistency in a highly distributed ride-hailing system?",
      "year": 2023,
      "round": "Technical",
      "difficulty": "Hard",
      "tags": ["Distributed Systems", "Consistency"]
    },
    {
      "question": "How would you handle data sharding in a large-scale ride-hailing application?",
      "year": 2023,
      "round": "System Design",
      "difficulty": "Medium",
      "tags": ["Databases", "Scalability"]
    },
    {
      "question": "What are the differences between horizontal and vertical scaling, and when would you use each in a ride-hailing platform?",
      "year": 2024,
      "round": "Technical",
      "difficulty": "Medium",
      "tags": ["Scalability", "Cloud"]
    }
  ],
  "Meta": [
    {
      "question": "How would you design a content moderation system for Facebook?",
      "year": 2023,
      "round": "System Design",
      "difficulty": "Hard",
      "tags": ["System Design", "Content Moderation"]
    },
    {
      "question": "How would you ensure that Facebook's news feed algorithm is both efficient and scalable?",
      "year": 2023,
      "round": "Technical",
      "difficulty": "Hard",
      "tags": ["Algorithms", "Scalability"]
    },
    {
      "question": "What are the trade-offs between SQL and NoSQL databases, and when would you choose one over the other in a social media platform?",
      "year": 2022,
      "round": "Technical",
      "difficulty": "Medium",
      "tags": ["Databases", "System Design"]
    },
    {
      "question": "What is your approach to handling concurrency and race conditions in a multi-user environment like Facebook?",
      "year": 2023,
      "round": "Technical",
      "difficulty": "Medium",
      "tags": ["Concurrency", "Multithreading"]
    }
  ],
  "Netflix": [
    {
      "question": "How would you design a recommendation system for Netflix?",
      "year": 2023,
      "round": "System Design",
      "difficulty": "Hard",
      "tags": ["Machine Learning", "System Design"]
    },
    {
      "question": "What are the key considerations when designing a video streaming platform for millions of users?",
      "year": 2023,
      "round": "System Design",
      "difficulty": "Hard",
      "tags": ["System Design", "Scalability"]
    },
    {
      "question": "How would you ensure low-latency video playback on a global scale?",
      "year": 2022,
      "round": "Technical",
      "difficulty": "Hard",
      "tags": ["Low Latency", "Global Systems"]
    },
    {
      "question": "What strategies would you use to handle large-scale data storage for Netflix's content?",
      "year": 2023,
      "round": "Technical",
      "difficulty": "Medium",
      "tags": ["Databases", "Storage"]
    },
    {
      "question": "How would you design a system to handle user account recommendations based on watching patterns?",
      "year": 2023,
      "round": "System Design",
      "difficulty": "Medium",
      "tags": ["Recommendation Systems", "Data Science"]
    },
    {
      "question": "What is your approach to ensuring consistency and availability in a distributed system like Netflix?",
      "year": 2024,
      "round": "Technical",
      "difficulty": "Medium",
      "tags": ["Distributed Systems", "CAP Theorem"]
    },
    {
      "question": "How would you optimize the content delivery network (CDN) to improve video streaming performance?",
      "year": 2023,
      "round": "Technical",
      "difficulty": "Medium",
      "tags": ["CDN", "Performance Optimization"]
    },
    {
      "question": "Explain how you would implement a fault-tolerant system for Netflix's streaming service.",
      "year": 2023,
      "round": "System Design",
      "difficulty": "Hard",
      "tags": ["Fault Tolerance", "Distributed Systems"]
    },
    {
      "question": "How do you handle scaling issues related to real-time user interactions, such as comments and ratings on Netflix?",
      "year": 2024,
      "round": "Technical",
      "difficulty": "Medium",
      "tags": ["Real-Time Systems", "Scalability"]
    },
    {
      "question": "How would you manage content rights and licensing information in a large-scale video platform like Netflix?",
      "year": 2023,
      "round": "Technical",
      "difficulty": "Medium",
      "tags": ["Data Management", "Content Delivery"]
    }
  ]
};

return new Response(JSON.stringify(questions), {
  headers: { "Content-Type": "application/json" },
});
  }
