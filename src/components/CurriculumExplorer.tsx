"use client";

import React, { useState } from "react";
import { PillarIcons, GradeIcons } from "./icons";

type GradeLevel = 9 | 10 | 11 | 12;
type Pillar = "all" | "ai-mastery" | "human-edge" | "ethics-leadership" | "interdisciplinary";

interface Lab {
  name: string;
  type: string;
  tools: string[];
}

interface Course {
  id: string;
  title: string;
  pillar: Pillar;
  description: string;
  level: "Foundation" | "Intermediate" | "Advanced" | "Capstone";
  duration: string;
  labs: Lab[];
  outcomes: string[];
}

interface GradeData {
  grade: number;
  theme: string;
  courses: Course[];
}

const gradesData: GradeData[] = [
  {
    grade: 9,
    theme: "Foundations of Intelligence",
    courses: [
      {
        id: "g9-prompt",
        title: "Foundations of Prompt Engineering",
        pillar: "ai-mastery",
        description: "Master communicating with AI systems through structured prompts, contexts, and few-shot patterns. Students experiment with multimodal prompting (text, image, audio) and learn prompt optimization loops.",
        level: "Foundation",
        duration: "8 weeks",
        labs: [
          { name: "Prompt Optimization Arena", type: "AI Lab", tools: ["LLM Playground", "Prompt Evaluation Framework"] },
          { name: "Multimodal Prompt Design", type: "Creative Lab", tools: ["Text-to-Image APIs", "Audio Transcription"] },
        ],
        outcomes: ["Design reusable prompt templates", "Evaluate prompt quality with automated metrics", "Explain tokenization and context windows"],
      },
      {
        id: "g9-logic",
        title: "Logic & Algorithmic Thinking",
        pillar: "ai-mastery",
        description: "Build computational thinking through formal logic, pseudocode, flowcharts, and basic algorithms. Students progress from Boolean logic to sorting, searching, and graph traversal basics.",
        level: "Foundation",
        duration: "10 weeks",
        labs: [
          { name: "Logic Gate Simulator", type: "CS Lab", tools: ["Python", "LogicSim"] },
          { name: "Algorithmic Visualizer", type: "Interactive Lab", tools: ["JavaScript", "D3.js"] },
        ],
        outcomes: ["Write clean pseudocode", "Trace algorithm execution", "Convert logic problems into structured steps"],
      },
      {
        id: "g9-python-ai",
        title: "Introduction to Python for AI",
        pillar: "ai-mastery",
        description: "Hands-on Python programming focused on data structures, functions, and libraries essential for AI workloads: NumPy, Pandas, and Matplotlib.",
        level: "Foundation",
        duration: "12 weeks",
        labs: [
          { name: "Data Wrangling Bootcamp", type: "Programming Lab", tools: ["Python", "Jupyter", "Pandas"] },
          { name: "Visualization Challenge", type: "Data Lab", tools: ["Matplotlib", "Plotly"] },
        ],
        outcomes: ["Write modular Python scripts", "Load, clean, and visualize datasets", "Use version control with Git"],
      },
      {
        id: "g9-data-literacy",
        title: "Data Literacy & Visualization",
        pillar: "interdisciplinary",
        description: "Understand how data shapes decisions in society. Students collect, analyze, and present real-world datasets, learning to spot misleading statistics and tell truthful data stories.",
        level: "Foundation",
        duration: "8 weeks",
        labs: [
          { name: "Dataset Detective", type: "Analytics Lab", tools: ["Google Sheets", "Tableau Public"] },
          { name: "Truth &谎话 Data Stories", type: "Journalism Lab", tools: ["Infogram", "Raw Graph"] },
        ],
        outcomes: ["Identify bias in datasets", "Create publication-quality charts", "Communicate findings to non-technical audiences"],
      },
      {
        id: "g9-critical-thinking",
        title: "Critical Thinking & Argumentation",
        pillar: "human-edge",
        description: "Develop rigorous habits of mind: identifying assumptions, evaluating evidence, and constructing sound arguments. Covers logical fallacies, cognitive biases, and structured debate formats.",
        level: "Foundation",
        duration: "8 weeks",
        labs: [
          { name: "Fallacy Hunt", type: "Debate Lab", tools: ["Argument Mapping Software"] },
          { name: "Socratic Seminar Series", type: "Discussion Lab", tools: ["Peer Review", "Video Reflection"] },
        ],
        outcomes: ["Deconstruct complex arguments", "Recognize 20+ logical fallacies", "Lead evidence-based discussions"],
      },
      {
        id: "g9-design-thinking",
        title: "Creative Expression & Design Thinking",
        pillar: "human-edge",
        description: "Apply human-centered design processes to solve real problems. Students prototype using digital tools, physical materials, and iterative feedback cycles.",
        level: "Foundation",
        duration: "8 weeks",
        labs: [
          { name: "Empathy Mapping Workshop", type: "Design Lab", tools: ["Miro", "Figma"] },
          { name: "Rapid Prototyping Sprint", type: "Maker Lab", tools: ["3D Printer", "Laser Cutter", "Figma"] },
        ],
        outcomes: ["Run user research interviews", "Create low and high-fidelity prototypes", "Facilitate design critiques"],
      },
      {
        id: "g9-digital-citizenship",
        title: "Digital Citizenship & Safety",
        pillar: "ethics-leadership",
        description: "Explore rights, responsibilities, and risks in digital spaces. Topics include privacy, cybersecurity hygiene, intellectual property, and building healthy digital habits.",
        level: "Foundation",
        duration: "6 weeks",
        labs: [
          { name: "Privacy Audit Challenge", type: "Security Lab", tools: ["Browser DevTools", "Have I Been Pwned"] },
          { name: "Cybersecurity Scenario Drill", type: "Simulation Lab", tools: ["NICE Challenges", "Cyber.org"] },
        ],
        outcomes: ["Conduct a personal privacy risk assessment", "Explain encryption basics", "Practice responsible social media use"],
      },
      {
        id: "g9-ethics-ai",
        title: "Ethics of Artificial Intelligence",
        pillar: "ethics-leadership",
        description: "Introduction to moral philosophy applied to AI. Students explore trolley problems, algorithmic fairness, and the social consequences of automated decision-making.",
        level: "Foundation",
        duration: "8 weeks",
        labs: [
          { name: "Moral Machine Audit", type: "Ethics Lab", tools: ["MIT Moral Machine", "Ethics Case Studies"] },
          { name: "Fairness Red Team", type: "AI Ethics Lab", tools: ["Fairness Indicators", "Bias Audit Toolkit"] },
        ],
        outcomes: ["Articulate positions on AI ethics dilemmas", "Audit a simple algorithm for bias", "Compare philosophical frameworks for AI morality"],
      },
      {
        id: "g9-global-studies",
        title: "Introduction to Global Studies",
        pillar: "ethics-leadership",
        description: "Understand global interdependence, cultural diversity, and the United Nations Sustainable Development Goals as a framework for future leadership.",
        level: "Foundation",
        duration: "8 weeks",
        labs: [
          { name: "SDG Mapping Project", type: "Research Lab", tools: ["UN Data Portal", "ArcGIS"] },
          { name: "Cultural Intelligence Simulation", type: "Simulation", tools: ["Cultural Intelligence Center Resources"] },
        ],
        outcomes: ["Map global development indicators", "Analyze cross-cultural communication styles", "Design a local SDG action plan"],
      },
      {
        id: "g9-ai-biology",
        title: "AI in Biology & Health",
        pillar: "interdisciplinary",
        description: "Explore how AI revolutionizes biology: protein folding, medical imaging, genomics, and personalized medicine. Students analyze real healthcare datasets.",
        level: "Foundation",
        duration: "8 weeks",
        labs: [
          { name: "Protein Fold Prediction", type: "Bio-AI Lab", tools: ["AlphaFold Colab", "PyTorch"] },
          { name: "Medical Image Analysis", type: "Healthcare Lab", tools: ["TensorFlow", "X-ray Datasets"] },
        ],
        outcomes: ["Explain how AI accelerates drug discovery", "Classify medical images with CNNs", "Discuss privacy in health data"],
      },
      {
        id: "g9-comp-art",
        title: "Computational Art & Music",
        pillar: "interdisciplinary",
        description: "Create generative art, music, and interactive installations using code. Blend creativity with algorithms, exploring randomness, noise fields, and user interaction.",
        level: "Foundation",
        duration: "8 weeks",
        labs: [
          { name: "Generative Art Gallery", type: "Creative Lab", tools: ["p5.js", "Processing", "TouchDesigner"] },
          { name: "Algorithmic Composition", type: "Music Lab", tools: ["Sonic Pi", "MuseScore", "Tone.js"] },
        ],
        outcomes: ["Produce algorithmic artwork", "Compose music using code", "Explain randomness vs. determinism in art"],
      },
    ],
  },
  {
    grade: 10,
    theme: "Intermediate Intelligence",
    courses: [
      {
        id: "g10-multi-agent",
        title: "Multi-Agent Orchestration Systems",
        pillar: "ai-mastery",
        description: "Design intelligent systems where specialized AI agents collaborate autonomously. Covers agent frameworks, tool use, memory, and coordination protocols.",
        level: "Intermediate",
        duration: "12 weeks",
        labs: [
          { name: "Autonomous Agent Swarms Lab", type: "AI Lab", tools: ["LangChain", "CrewAI", "AutoGen"] },
          { name: "RAG Knowledge Bases Lab", type: "Data Lab", tools: ["Pinecone", "LangChain", "LlamaIndex"] },
        ],
        outcomes: ["Build multi-agent workflows", "Implement retrieval-augmented generation pipelines", "Monitor and debug agent traces"],
      },
      {
        id: "g10-ml-fundamentals",
        title: "Machine Learning Fundamentals",
        pillar: "ai-mastery",
        description: "Statistical learning theory, linear regression, classification, decision trees, and ensemble methods. Students implement algorithms from scratch and with Scikit-learn.",
        level: "Intermediate",
        duration: "14 weeks",
        labs: [
          { name: "Scikit-learn Model Zoo", type: "ML Lab", tools: ["Python", "Scikit-learn", "Jupyter"] },
          { name: "Custom Algorithm Implementation", type: "Math Lab", tools: ["NumPy", "Matplotlib"] },
        ],
        outcomes: ["Train and evaluate classifiers", "Explain bias-variance tradeoff", "Use cross-validation for model selection"],
      },
      {
        id: "g10-computer-vision",
        title: "Computer Vision Fundamentals",
        pillar: "ai-mastery",
        description: "Image processing, convolutional neural networks, object detection, and image segmentation. Real-world projects include facial recognition safety audits and medical imaging.",
        level: "Intermediate",
        duration: "10 weeks",
        labs: [
          { name: "Real-Time Object Detector", type: "Vision Lab", tools: ["OpenCV", "YOLOv8", "TensorFlow Lite"] },
          { name: "Face Recognition Red Team", type: "Security Lab", tools: ["dlib", "FaceNet", "Adversarial Libraries"] },
        ],
        outcomes: ["Build a CNN from scratch", "Deploy edge vision models", "Audit CV systems for demographic bias"],
      },
      {
        id: "g10-nlp",
        title: "Natural Language Processing Basics",
        pillar: "ai-mastery",
        description: "Text preprocessing, embeddings, transformers, and sentiment analysis. Students build chatbots, text classifiers, and translation prototypes.",
        level: "Intermediate",
        duration: "10 weeks",
        labs: [
          { name: "Sentiment Analyzer Dashboard", type: "NLP Lab", tools: ["Hugging Face Transformers", "Streamlit"] },
          { name: "Multi-Persona Fact-Checking Lab", type: "Fact-Check Lab", tools: ["Claim Extraction", "Web Scraping", "LLM APIs"] },
        ],
        outcomes: ["Tokenize and embed text", "Fine-tune a transformer model", "Build an end-to-end NLP pipeline"],
      },
      {
        id: "g10-creative-comm",
        title: "Advanced Creative Communication",
        pillar: "human-edge",
        description: "Elevate storytelling, persuasive speaking, and multimodal communication. Students create TED-style talks, podcasts, and interactive presentations.",
        level: "Intermediate",
        duration: "10 weeks",
        labs: [
          { name: "TEDx-Style Talk Production", type: "Communication Lab", tools: ["OBS", "DaVinci Resolve", "Canva"] },
          { name: "Podcast Studio Launch", type: "Media Lab", tools: ["Audacity", "Spotify for Podcasters"] },
        ],
        outcomes: ["Structure a 10-minute persuasive talk", "Edit video and audio content", "Use narrative arcs in technical explanations"],
      },
      {
        id: "g10-negotiation",
        title: "Negotiation & Mediation Skills",
        pillar: "human-edge",
        description: "Principled negotiation, BATNA analysis, mediation techniques, and cross-cultural negotiation. Used in business, diplomacy, and community settings.",
        level: "Intermediate",
        duration: "8 weeks",
        labs: [
          { name: "MUN-Style Negotiation Simulation", type: "Simulation Lab", tools: ["Role-play", "Case Studies"] },
          { name: "Mediation Role-Play Series", type: "Practice Lab", tools: ["Peer Mediation Toolkit", "Video Feedback"] },
        ],
        outcomes: ["Prepare for high-stakes negotiations", "Facilitate mediation between parties", "Identify integrative vs. distributive bargaining"],
      },
      {
        id: "g10-eq",
        title: "Emotional Intelligence & Empathy Engineering",
        pillar: "human-edge",
        description: "Self-awareness, self-regulation, motivation, empathy, and social skills. Engineering empathy into AI UX by studying voice tone, facial expression, and body language datasets.",
        level: "Intermediate",
        duration: "8 weeks",
        labs: [
          { name: "Emotion Recognition Audit", type: "Psychology/AI Lab", tools: ["Affectiva", "Empathic Computing Kits"] },
          { name: "Empathy Mapping for AI Products", type: "Design Lab", tools: ["Miro", "User Interview Kits"] },
        ],
        outcomes: ["Take an EQ self-assessment and growth plan", "Design an empathetic AI interaction", "Facilitate an empathy-building workshop"],
      },
      {
        id: "g10-ai-ethics",
        title: "AI Ethics & Global Bias Auditing",
        pillar: "ethics-leadership",
        description: "Deepened ethics coursework focusing on auditing real AI systems for fairness, transparency, accountability, and bias across cultures, genders, and socioeconomic groups.",
        level: "Intermediate",
        duration: "10 weeks",
        labs: [
          { name: "Multi-Persona Fact-Checking Lab", type: "Fact-Check Lab", tools: ["ClaimReview APIs", "Browser Extensions"] },
          { name: "Fairness Metric Toolkit", type: "Audit Lab", tools: ["IBM AI Fairness 360", "Google What-If Tool"] },
        ],
        outcomes: ["Conduct a full bias audit of an AI model", "Produce an AI ethics board style report", "Recommend mitigations to a product team"],
      },
      {
        id: "g10-philosophy-mind",
        title: "Philosophy of Mind & Consciousness",
        pillar: "ethics-leadership",
        description: "What is consciousness? Can machines truly think? Students examine functionalism, integrated information theory, Chinese Room arguments, and ethical implications of sentient AI.",
        level: "Intermediate",
        duration: "10 weeks",
        labs: [
          { name: "Chinese Room Debate", type: "Philosophy Lab", tools: ["Searle Papers", "Position Paper"] },
          { name: "Consciousness Metrics Exploration", type: "Research Lab", tools: ["IIT Papers", "Neuroscience Case Studies"] },
        ],
        outcomes: ["Compare major theories of consciousness", "Arguably defend or reject machine consciousness", "Connect philosophy to AI safety"],
      },
      {
        id: "g10-social-impact",
        title: "Social Impact & Community Design",
        pillar: "ethics-leadership",
        description: "Design AI solutions for social good using human-centered design and community-based participatory research. Students partner with local organizations.",
        level: "Intermediate",
        duration: "12 weeks",
        labs: [
          { name: "Community Needs Assessment", type: "Design Lab", tools: ["Survey Tools", "Interview Kits", "Field Notes"] },
          { name: "Social Good AI Prototype", type: "Build Lab", tools: ["No-Code AI Tools", "Figma", "Arduino"] },
        ],
        outcomes: ["Conduct ethical community research", "Prototype an AI-assisted social good product", "Present to community stakeholders"],
      },
      {
        id: "g10-biomimetic",
        title: "Biomimetic Design",
        pillar: "interdisciplinary",
        description: "Nature-inspired innovation: studying biological systems to solve engineering and design challenges. Includes evolution algorithms, swarm intelligence, and structural optimization.",
        level: "Intermediate",
        duration: "10 weeks",
        labs: [
          { name: "Biomimetic Innovation Challenges", type: "Maker Lab", tools: ["3D Modeling", "Laser Cutter", "Biology Datasets"] },
          { name: "Evolutionary Algorithm Simulation", type: "CS Lab", tools: ["Python", "DEAP Framework", "Blender"] },
        ],
        outcomes: ["Identify biomimicry analogies", "Prototype a biologically-inspired product", "Simulate evolution to solve optimization problems"],
      },
      {
        id: "g10-ai-environment",
        title: "AI in Environmental Science",
        pillar: "interdisciplinary",
        description: "Apply AI to climate modeling, wildlife conservation, precision agriculture, and pollution tracking. Students work with NASA and NOAA open datasets.",
        level: "Intermediate",
        duration: "10 weeks",
        labs: [
          { name: "Satellite Image Classification", type: "Climate Lab", tools: ["Google Earth Engine", "TensorFlow"] },
          { name: "Wildlife Recognition Model", type: "Conservation Lab", tools: ["TensorFlow", "Camera Trap Datasets"] },
        ],
        outcomes: ["Train models on satellite data", "Analyze climate time-series with AI", "Propose an AI-powered conservation tool"],
      },
      {
        id: "g10-math-modeling",
        title: "Mathematical Modeling with AI",
        pillar: "interdisciplinary",
        description: "Use AI and mathematics to model complex systems: epidemiology, urban traffic, economic markets, and ecological networks. Emphasize differential equations and Monte Carlo simulation.",
        level: "Intermediate",
        duration: "10 weeks",
        labs: [
          { name: "Epidemic Spread Simulator", type: "Math Lab", tools: ["Python", "SIR Models", "Monte Carlo"] },
          { name: "Stock Market Predictor", type: "Finance Lab", tools: ["Scikit-learn", "Yahoo Finance API"] },
        ],
        outcomes: ["Formulate systems of equations for real phenomena", "Run Monte Carlo simulations", "Communicate model limitations honestly"],
      },
    ],
  },
  {
    grade: 11,
    theme: "Advanced Intelligence",
    courses: [
      {
        id: "g11-workflow",
        title: "Autonomous Workflow Automation",
        pillar: "ai-mastery",
        description: "Design, implement, and monitor fully autonomous AI workflows that integrate APIs, databases, and human-in-the-loop gates for complex operations.",
        level: "Advanced",
        duration: "12 weeks",
        labs: [
          { name: "Business Process Re-Engineering", type: "Automation Lab", tools: ["n8n", "LangChain", "Zapier"] },
          { name: "RAG Knowledge Bases Lab", type: "AI Lab", tools: ["Pinecone", "LlamaIndex", "FastAPI"] },
        ],
        outcomes: ["Map end-to-end autonomous workflows", "Integrate AI agents with enterprise APIs", "Monitor agent performance and graceful degradation"],
      },
      {
        id: "g11-deep-learning",
        title: "Deep Learning & Neural Architectures",
        pillar: "ai-mastery",
        description: "PyTorch fundamentals, backpropagation, CNN, RNN, Transformer, and GAN architectures. Students implement architectures and train on custom datasets.",
        level: "Advanced",
        duration: "16 weeks",
        labs: [
          { name: "Neural Network from Scratch", type: "DL Lab", tools: ["PyTorch", "CUDA", "Jupyter"] },
          { name: "Transformer Implementation", type: "NLP Lab", tools: ["PyTorch", "Hugging Face Tokenizers"] },
        ],
        outcomes: ["Implement backpropagation manually", "Train CNNs, RNNs, and Transformers", "Use GPU acceleration effectively"],
      },
      {
        id: "g11-rl",
        title: "Reinforcement Learning & Game AI",
        pillar: "ai-mastery",
        description: "Markov decision processes, Q-learning, policy gradients, and multi-agent RL. Students train agents to play Atari games, board games, and navigate environments.",
        level: "Advanced",
        duration: "12 weeks",
        labs: [
          { name: "Atari Game Agent Training", type: "RL Lab", tools: ["Stable-Baselines3", "Gymnasium", "ALE"] },
          { name: "Autonomous Agent Swarms Lab", type: "Multi-Agent Lab", tools: ["PettingZoo", "Ray RLLib"] },
        ],
        outcomes: ["Train agents with Q-learning and PPO", "Design reward functions", "Analyze exploration vs. exploitation"],
      },
      {
        id: "g11-ai-safety",
        title: "AI Safety & Alignment Research",
        pillar: "ai-mastery",
        description: "Alignment problem, interpretability, robustness, and scalable oversight. Students conduct small alignment experiments and review current research.",
        level: "Advanced",
        duration: "12 weeks",
        labs: [
          { name: "Mechanistic Interpretability Exploration", type: "Safety Lab", tools: ["TransformerLens", "PyTorch"] },
          { name: "Red Teaming Language Models", type: "Safety Lab", tools: ["OpenAI Evals", "Anthropic Red Team Dataset"] },
        ],
        outcomes: ["Explain the alignment problem", "Perform circuit-level interpretability", "Design guardrails for model behavior"],
      },
      {
        id: "g11-systems-thinking",
        title: "Complex Negotiation & Systems Thinking",
        pillar: "human-edge",
        description: "Leverage systems thinking frameworks to analyze complex global problems. Includes causal loop diagrams, stock-and-flow models, and multi-stakeholder negotiation.",
        level: "Advanced",
        duration: "10 weeks",
        labs: [
          { name: "Climate Policy Simulation", type: "Systems Lab", tools: ["STELLA", "Powersim"] },
          { name: "Multi-Stakeholder Negotiation", type: "Simulation Lab", tools: ["Role-play", "Structured Decision Making"] },
        ],
        outcomes: ["Build causal loop diagrams", "Facilitate complex stakeholder meetings", "Identify leverage points in systems"],
      },
      {
        id: "g11-leadership",
        title: "Leadership in Distributed Teams",
        pillar: "human-edge",
        description: "Lead remote, cross-functional AI teams. Topics: asynchronous communication, OKRs, psychological safety, conflict resolution, and scaling leadership.",
        level: "Advanced",
        duration: "10 weeks",
        labs: [
          { name: "Distributed Sprint Leadership", type: "Team Lab", tools: ["Notion", "GitHub Projects", "Miro"] },
          { name: "Post-Incident Review Facilitation", type: "Leadership Lab", tools: ["Incident Review Templates", "Retrospective Games"] },
        ],
        outcomes: ["Run effective async standups", "Lead blameless postmortems", "Scale team culture across time zones"],
      },
      {
        id: "g11-comm",
        title: "Strategic Communication & Public Speaking",
        pillar: "human-edge",
        description: "Craft strategic narratives for technical and non-technical audiences. Students deliver keynotes, investor pitches, white paper briefings, and crisis communications.",
        level: "Advanced",
        duration: "10 weeks",
        labs: [
          { name: "Investor Pitch Day", type: "Communication Lab", tools: ["Pitch Deck", "Presentation Coaching"] },
          { name: "Crisis Communication Drill", type: "Simulation Lab", tools: ["Case Studies", "Media Training"] },
        ],
        outcomes: ["Prepare a 10-slide investor deck", "Handle Q&A with hostile audiences", "Adapt messaging for executives vs. engineers"],
      },
      {
        id: "g11-corp-governance",
        title: "Corporate Governance in the Age of AI",
        pillar: "ethics-leadership",
        description: "Board-level AI strategy, fiduciary responsibility, algorithmic accountability, and regulatory compliance. Students role-play as C-suite advisors.",
        level: "Advanced",
        duration: "10 weeks",
        labs: [
          { name: "AI Risk Committee Simulation", type: "Governance Lab", tools: ["NIST AI RMF", "EU AI Act Documents"] },
          { name: "Drafting an AI Compliance Charter", type: "Policy Lab", tools: ["Legal Templates", "Risk Assessment Frameworks"] },
        ],
        outcomes: ["Map AI risks to governance controls", "Draft an AI policy recommendation", "Present to a simulated board of directors"],
      },
      {
        id: "g11-ai-policy",
        title: "AI Policy & Regulation Globally",
        pillar: "ethics-leadership",
        description: "Compare AI regulatory frameworks: EU AI Act, US Executive Orders, China AI regulations, and global south perspectives. Students draft model legislation.",
        level: "Advanced",
        duration: "10 weeks",
        labs: [
          { name: "Model AI Bill Drafting", type: "Policy Lab", tools: ["Legislative Drafting Tools", "Comparative Law Databases"] },
          { name: "EU AI Act Compliance Audit", type: "Compliance Lab", tools: ["Risk Classification Framework", "Checklist Tools"] },
        ],
        outcomes: ["Compare AI regulatory regimes", "Draft a clause for model AI law", "Conduct a compliance risk assessment"],
      },
      {
        id: "g11-tech-ethics",
        title: "Technology Ethics & Moral Philosophy",
        pillar: "ethics-leadership",
        description: "Advanced normative and applied ethics for technologists: utilitarianism, deontology, virtue ethics, care ethics, and posthumanism.",
        level: "Advanced",
        duration: "10 weeks",
        labs: [
          { name: "Ethical Dilemma Case Competition", type: "Philosophy Lab", tools: ["Case Study Repository", "Debate Platforms"] },
          { name: "Longtermism & Existential Risk Workshop", type: "Futures Lab", tools: ["Forecasting Tools", "Research Papers"] },
        ],
        outcomes: ["Apply ethical frameworks to tech dilemmas", "Lead an ethics review board meeting", "Forecast long-term AI societal impacts"],
      },
      {
        id: "g11-quant-modeling",
        title: "Quantitative Modeling",
        pillar: "interdisciplinary",
        description: "Advanced mathematical modeling using AI techniques. Stochastic processes, Monte Carlo simulation, Bayesian inference, and optimization algorithms.",
        level: "Advanced",
        duration: "12 weeks",
        labs: [
          { name: "Bayesian Inference Project", type: "Math Lab", tools: ["PyMC", "Stan", "Jupyter"] },
          { name: "Monte Carlo Simulation Series", type: "Sim Lab", tools: ["Python", "Monte Carlo Packages"] },
        ],
        outcomes: ["Build Bayesian models", "Run Monte Carlo simulations", "Critically evaluate model assumptions"],
      },
      {
        id: "g11-ai-economics",
        title: "AI in Economics & Finance",
        pillar: "interdisciplinary",
        description: "Algorithmic trading, market simulation, predictive analytics, and AI-driven economic policy modeling. Students backtest strategies and analyze market data.",
        level: "Advanced",
        duration: "10 weeks",
        labs: [
          { name: "Algorithmic Trading Backtester", type: "Finance Lab", tools: ["Backtrader", "Yahoo Finance API", "Pandas"] },
          { name: "AI Policy Simulation", type: "Policy Lab", tools: ["Agent-Based Modeling", "NetLogo"] },
        ],
        outcomes: ["Backtest a trading algorithm", "Explain market microstructure", "Simulate economic policy impacts"],
      },
      {
        id: "g11-comp-neuro",
        title: "Computational Neuroscience",
        pillar: "interdisciplinary",
        description: "Bridge neuroscience and AI: spiking neural networks, brain-computer interfaces, neural coding, and cognitive modeling.",
        level: "Advanced",
        duration: "12 weeks",
        labs: [
          { name: "Spiking Neural Network Lab", type: "Neuro-AI Lab", tools: ["Nengo", "Brian2", "Python"] },
          { name: "EEG Signal Classification", type: "BCI Lab", tools: ["MNE-Python", "Scikit-learn"] },
        ],
        outcomes: ["Convert biological neurons to ANN/SNN models", "Classify brain signals", "Explain how neuroscience informs AI"],
      },
    ],
  },
  {
    grade: 12,
    theme: "Capstone & Mastery",
    courses: [
      {
        id: "g12-capstone",
        title: "Capstone Autonomous Application Deployment",
        pillar: "ai-mastery",
        description: "Deploy a production-grade autonomous AI application from concept to launch. Covers CI/CD for AI, model serving, monitoring, A/B testing, and incident response.",
        level: "Capstone",
        duration: "16 weeks",
        labs: [
          { name: "RAG Knowledge Bases Lab", type: "Production Lab", tools: ["FastAPI", "Docker", "Kubernetes", "Pinecone"] },
          { name: "Autonomous Agent Swarms Lab", type: "Production Lab", tools: ["FastAPI", "Docker Compose", "LangSmith"] },
        ],
        outcomes: ["Deploy a production AI app", "Write a deployment playbook", "Conduct an incident response drill", "Design A/B tests for AI features"],
      },
      {
        id: "g12-advanced-ai-arch",
        title: "Advanced AI Systems Architecture",
        pillar: "ai-mastery",
        description: "Design large-scale AI infrastructure: model parallelism, memory optimization, quantization, and LoRA/QLoRA fine-tuning for LLMs.",
        level: "Capstone",
        duration: "14 weeks",
        labs: [
          { name: "LLM Fine-Tuning Pipeline", type: "Engineering Lab", tools: ["PyTorch FSDP", "Axolotl", "Hugging Face"] },
          { name: "Model Serving Benchmark", type: "Performance Lab", tools: ["vLLM", "TensorRT-LLM", "TGI"] },
        ],
        outcomes: ["Fine-tune a 7B parameter model", "Optimize inference latency", "Compare architecture tradeoffs"],
      },
      {
        id: "g12-ai-science",
        title: "AI for Scientific Discovery",
        pillar: "ai-mastery",
        description: "Use AI to accelerate scientific discovery: protein folding, drug discovery, materials science, and astrophysics. Students contribute to open-science challenges.",
        level: "Capstone",
        duration: "14 weeks",
        labs: [
          { name: "Drug Candidate Screening", type: "Bio-AI Lab", tools: ["AlphaFold", "RDKit", "PyTorch"] },
          { name: "Black Hole Classification", type: "Astro-AI Lab", tools: ["AstroML", "NASA Datasets", "CNNs"] },
        ],
        outcomes: ["Reproduce a scientific discovery paper", "Submit to an open science challenge", "Explain AI&apos;s role in the scientific method"],
      },
      {
        id: "g12-llm-eng",
        title: "Large Language Model Engineering",
        pillar: "ai-mastery",
        description: "Deep dive into LLM internals: KV-cache optimization, speculative decoding, mixture-of-experts, and safety fine-tuning with RLHF and Constitutional AI.",
        level: "Capstone",
        duration: "14 weeks",
        labs: [
          { name: "Custom LLM Training Run", type: "Engineering Lab", tools: ["LitGPT", "Apex", "Weights & Biases"] },
          { name: "Safety Fine-Tuning Workshop", type: "Safety Lab", tools: ["RLHF", "DPO", "Constitutional AI"] },
        ],
        outcomes: ["Train an open-weights LLM", "Analyze attention patterns", "Apply safety fine-tuning methods"],
      },
      {
        id: "g12-advanced-leadership",
        title: "Advanced Leadership & Public Speaking",
        pillar: "human-edge",
        description: "Executive presence, thought leadership, and high-stakes presentation. Students deliver a TED-style keynote and lead a cross-functional initiative.",
        level: "Capstone",
        duration: "12 weeks",
        labs: [
          { name: "TEDx-Style Keynote Delivery", type: "Leadership Lab", tools: ["Stagecraft", "Coaching", "Recording Studio"] },
          { name: "Executive Presence Bootcamp", type: "Development Lab", tools: ["Improv", "Feedback Coaching"] },
        ],
        outcomes: ["Deliver a 15-minute conference keynote", "Receive and act on executive coaching", "Build a personal thought-leadership brand"],
      },
      {
        id: "g12-venture",
        title: "Entrepreneurial Mindset & Venture Design",
        pillar: "human-edge",
        description: "From idea to venture: opportunity recognition, business model design, lean startup, fundraising, and legal structures for AI startups.",
        level: "Capstone",
        duration: "14 weeks",
        labs: [
          { name: "Lean Startup Sprint", type: "Venture Lab", tools: ["Figma", "Webflow", "Stripe"] },
          { name: "Investor Panel Simulation", type: "Pitch Lab", tools: ["Pitch Deck", "Financial Modeling"] },
        ],
        outcomes: ["Complete a validated learning sprint", "Build an MVP", "Lead a fundraising Q&A"],
      },
      {
        id: "g12-cross-cultural",
        title: "Cross-Cultural Communication & Global Leadership",
        pillar: "human-edge",
        description: "Lead across cultures with emotional intelligence, negotiation, and inclusive communication. Includes study of cultural dimensions and virtual team leadership.",
        level: "Capstone",
        duration: "10 weeks",
        labs: [
          { name: "Global Virtual Team Simulation", type: "Leadership Lab", tools: ["Slack", "Zoom", "Cultural Analogs"] },
          { name: "Diplomatic Reception Role-Play", type: "Simulation Lab", tools: ["Cultural Intelligence Center"] },
        ],
        outcomes: ["Adapt communication for high/low-context cultures", "Lead a virtual global team", "Navigate a cross-cultural negotiation"],
      },
      {
        id: "g12-venture-incubation",
        title: "AI-Driven Venture Incubation",
        pillar: "ethics-leadership",
        description: "Launch an AI-powered startup with ethical business model design. Covers equity, impact measurement, AI product management, and responsible innovation.",
        level: "Capstone",
        duration: "16 weeks",
        labs: [
          { name: "Venture Studio Residency", type: "Incubation Lab", tools: ["Notion", "LegalZoom", "Stripe"] },
          { name: "AI-Driven Venture Incubation", type: "Business Lab", tools: ["Business Model Canvas", "Pitch Deck", "Productboard"] },
        ],
        outcomes: ["Launch a functional AI MVP", "Draft a responsible AI policy", "Complete a seed-round pitch deck"],
      },
      {
        id: "g12-futurism",
        title: "Futurism & Scenario Planning",
        pillar: "ethics-leadership",
        description: "Use foresight methods to anticipate technological, social, and economic futures. Students build scenarios and present strategic recommendations.",
        level: "Capstone",
        duration: "12 weeks",
        labs: [
          { name: "Scenario Planning Workshop", type: "Futures Lab", tools: ["Shell Scenario Methodology", "Miro"] },
          { name: "Foresight Report Publication", type: "Research Lab", tools: ["Substack", "Canva", "Research Databases"] },
        ],
        outcomes: ["Build a scenario matrix", "Present to senior stakeholders", "Identify weak signals of change"],
      },
      {
        id: "g12-tech-policy",
        title: "AI Policy Advocacy & Civic Leadership",
        pillar: "ethics-leadership",
        description: "Transform ethical insight into public action. Students draft policy proposals, engage with lawmakers, and run mock advocacy campaigns.",
        level: "Capstone",
        duration: "12 weeks",
        labs: [
          { name: "Policy Brief Publishing", type: "Advocacy Lab", tools: ["Legislative Templates", "Press Outreach"] },
          { name: "Mock Congressional Testimony", type: "Simulation", tools: ["C-SPAN Archives", "Debate Coaching"] },
        ],
        outcomes: ["Draft a 10-page policy brief", "Deliver a mock legislative testimony", "Lead an advocacy campaign"],
      },
      {
        id: "g12-research-thesis",
        title: "Interdisciplinary Research Thesis",
        pillar: "interdisciplinary",
        description: "Year-long independent research at the intersection of AI and another discipline. Includes literature review, methodology, original analysis, and defense.",
        level: "Capstone",
        duration: "20 weeks",
        labs: [
          { name: "Multi-Persona Fact-Checking Lab", type: "Research Lab", tools: ["Zotero", "Jupyter", "LaTeX"] },
          { name: "Biomimetic Innovation Challenges", type: "Innovation Lab", tools: ["3D Printing", "ML Models", "Scientific Writing"] },
        ],
        outcomes: ["Conduct original research", "Write a 30-page thesis", "Defend before a faculty panel", "Submit to a student research journal"],
      },
      {
        id: "g12-ai-space",
        title: "AI in Space Exploration",
        pillar: "interdisciplinary",
        description: "Apply AI to space missions: autonomous navigation, satellite image analysis, exoplanet detection, and mission planning with Mars and lunar datasets.",
        level: "Capstone",
        duration: "12 weeks",
        labs: [
          { name: "Planet Classification with Neural Nets", type: "Space Lab", tools: ["TensorFlow", "NASA Exoplanet Archive"] },
          { name: "Autonomous Rover Navigation", type: "Robotics Lab", tools: ["ROS2", "Gazebo", "Reinforcement Learning"] },
        ],
        outcomes: ["Classify exoplanets with ML", "Simulate Mars rover navigation", "Propose an AI system for lunar habitats"],
      },
      {
        id: "g12-comp-social",
        title: "Computational Social Science",
        pillar: "interdisciplinary",
        description: "Use AI and large-scale data to study human behavior: social network analysis, misinformation diffusion, sentiment dynamics, and computational ethics.",
        level: "Capstone",
        duration: "12 weeks",
        labs: [
          { name: "Misinformation Diffusion Analysis", type: "Social Lab", tools: ["Twitter/X API", "Gephi", "Snapcast"] },
          { name: "Network Influence Model", type: "Network Lab", tools: ["NetworkX", "SNAP", "GNNs"] },
        ],
        outcomes: ["Analyze social network data", "Model information spread", "Propose interventions for online communities"],
      },
    ],
  },
];

const pillarMeta: Record<Pillar | "all", { id: Pillar | "all"; name: string; color: string; icon: React.ReactElement }> = {
  all: { id: "all", name: "All Pillars", color: "slate", icon: <></> },
  "ai-mastery": { id: "ai-mastery", name: "AI Mastery", color: "cyan", icon: <PillarIcons.AIMastery className="w-5 h-5" /> },
  "human-edge": { id: "human-edge", name: "Human Edge", color: "emerald", icon: <PillarIcons.HumanEdge className="w-5 h-5" /> },
  "ethics-leadership": { id: "ethics-leadership", name: "Ethics & Leadership", color: "violet", icon: <PillarIcons.EthicsLeadership className="w-5 h-5" /> },
  "interdisciplinary": { id: "interdisciplinary", name: "Interdisciplinary", color: "amber", icon: <PillarIcons.Interdisciplinary className="w-5 h-5" /> },
};

const levelStyles: Record<string, { bg: string; text: string; border: string }> = {
  Foundation: { bg: "bg-cyan-500/10", text: "text-cyan-300", border: "border-cyan-500/20" },
  Intermediate: { bg: "bg-emerald-500/10", text: "text-emerald-300", border: "border-emerald-500/20" },
  Advanced: { bg: "bg-violet-500/10", text: "text-violet-300", border: "border-violet-500/20" },
  Capstone: { bg: "bg-amber-500/10", text: "text-amber-300", border: "border-amber-500/20" },
};

const pillarFilterStyles: Record<Pillar | "all", { bg: string; text: string; border: string }> = {
  all: { bg: "bg-white/10", text: "text-white", border: "border-white/20" },
  "ai-mastery": { bg: "bg-cyan-500/10", text: "text-cyan-300", border: "border-cyan-500/30" },
  "human-edge": { bg: "bg-emerald-500/10", text: "text-emerald-300", border: "border-emerald-500/30" },
  "ethics-leadership": { bg: "bg-violet-500/10", text: "text-violet-300", border: "border-violet-500/30" },
  "interdisciplinary": { bg: "bg-amber-500/10", text: "text-amber-300", border: "border-amber-500/30" },
};

export default function CurriculumExplorer() {
  const [selectedGrade, setSelectedGrade] = useState<GradeLevel>(9);
  const [selectedPillar, setSelectedPillar] = useState<Pillar>("all");
  const [expandedCourse, setExpandedCourse] = useState<string | null>(null);

  const currentData = gradesData.find((g) => g.grade === selectedGrade)!;
  const courses = currentData.courses.filter((c) => selectedPillar === "all" || c.pillar === selectedPillar);

  return (
    <section id="curriculum" className="py-24 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold mb-4 tracking-tight">
            Interactive <span className="glow-text">Curriculum Explorer</span>
          </h2>
          <p className="text-slate-400 max-w-2xl mx-auto">
            Explore our rigorous, AI-first curriculum designed for Grades 9–12. Select a grade level and pillar to discover transformative courses, hands-on labs, and real-world outcomes.
          </p>
        </div>

        <div className="mb-8 flex flex-col items-center gap-4">
          <div className="flex flex-wrap gap-2 justify-center">
            {[9, 10, 11, 12].map((grade) => {
              const data = gradesData.find((g) => g.grade === grade)!;
              const GradeIcon = GradeIcons[`Grade${grade}` as keyof typeof GradeIcons];
              return (
                <button
                  key={grade}
                  onClick={() => { setSelectedGrade(grade as GradeLevel); setExpandedCourse(null); }}
                  className={`inline-flex items-center gap-2 px-5 py-2.5 rounded-full font-semibold text-sm transition-all duration-300 ${
                    selectedGrade === grade ? "bg-gradient-to-r from-cyan-500 to-emerald-400 text-slate-950 shadow-[0_0_20px_rgba(34,211,238,0.3)]" : "glass hover:bg-white/10 text-slate-300"
                  }`}
                >
                  <GradeIcon className="w-4 h-4" />
                  Grade {grade}
                </button>
              );
            })}
          </div>
          <span className="text-xs text-slate-500 font-medium">{currentData.theme}</span>
        </div>

        <div className="mb-10 flex flex-wrap gap-2 justify-center">
          {Object.values(pillarMeta).map((pillar) => (
            <button
              key={pillar.id}
              onClick={() => { setSelectedPillar(pillar.id as Pillar); setExpandedCourse(null); }}
              className={`inline-flex items-center gap-1.5 px-4 py-2 rounded-full font-medium text-xs uppercase tracking-wider transition-all duration-300 border ${
                selectedPillar === pillar.id ? `${pillarFilterStyles[pillar.id].bg} ${pillarFilterStyles[pillar.id].text} border-white/20` : "glass text-slate-400 border-transparent"
              }`}
            >
              {pillar.icon}
              {pillar.name}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-6xl mx-auto">
          {courses.map((course, idx) => {
            const meta = pillarMeta[course.pillar];
            const style = levelStyles[course.level];
            const isExpanded = expandedCourse === course.id;
            return (
              <div
                key={course.id}
                className="glass rounded-2xl p-6 hover:border-cyan-500/30 transition-all duration-300 cursor-pointer"
                onClick={() => setExpandedCourse(isExpanded ? null : course.id)}
              >
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1">
                    <div className="flex flex-wrap items-center gap-2 mb-3">
                      <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider ${style.bg} ${style.text} border ${style.border}`}>
                        {meta.icon}
                        {meta.name}
                      </span>
                      <span className="px-3 py-1 rounded-full text-xs font-semibold bg-slate-800 text-slate-300 border border-slate-700">
                        {course.level}
                      </span>
                      <span className="px-3 py-1 rounded-full text-xs font-medium text-slate-400 bg-slate-900/60 border border-slate-800">
                        {course.duration}
                      </span>
                    </div>
                    <h3 className="text-lg font-semibold text-white mb-2 leading-snug">{course.title}</h3>
                    <p className="text-sm text-slate-400 leading-relaxed">{course.description}</p>
                  </div>
                  <svg
                    className={`w-5 h-5 text-slate-500 shrink-0 mt-1 transition-transform duration-300 ${isExpanded ? "rotate-180 text-cyan-400" : ""}`}
                    fill="none"
                    stroke="currentColor"
                    strokeWidth={2}
                    viewBox="0 0 24 24"
                    aria-hidden="true"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
                  </svg>
                </div>
                {isExpanded && (
                  <div className="mt-5 pt-5 border-t border-white/10 animate-fade-in-up space-y-5">
                    <div>
                      <p className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-3">Hands-On Labs</p>
                      <div className="grid grid-cols-1 gap-3">
                        {course.labs.map((lab) => (
                          <div key={lab.name} className="rounded-xl border border-white/10 bg-white/5 p-4">
                            <div className="flex items-center justify-between mb-2">
                              <span className="font-semibold text-sm text-white">{lab.name}</span>
                              <span className="text-[10px] uppercase tracking-wider text-slate-400 border border-slate-700 rounded-full px-2 py-0.5">{lab.type}</span>
                            </div>
                            <div className="flex flex-wrap gap-1.5">
                              {lab.tools.map((tool) => (
                                <span key={tool} className="px-2 py-1 rounded-md bg-slate-950/40 text-cyan-300 text-[10px] font-medium border border-cyan-500/10">
                                  {tool}
                                </span>
                              ))}
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                    <div>
                      <p className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-3">Learning Outcomes</p>
                      <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                        {course.outcomes.map((outcome) => (
                          <li key={outcome} className="flex items-start gap-2 text-sm text-slate-300">
                            <svg className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" /></svg>
                            {outcome}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
