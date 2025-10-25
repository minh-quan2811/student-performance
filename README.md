# student-performance

A data-driven system that analyzes student performance and recommends personalized learning content using machine learning and LLM. It predicts performance levels, identifies areas for improvement, and suggests suitable coding courses based on similarity and relevance to each student's learning profile.

## Overview

This application predicts student academic performance and provides personalized course recommendations using:
- **Random Forest Classification** - Predicts performance level (Beginner, Intermediate, Advanced)
- **Semantic Similarity Matching** - Recommends relevant courses based on student profile
- **AI-Powered Insights** - Generates personalized explanations using Google Gemini AI

## Project Structure

```
.
├── be/                                  # Backend (FastAPI)
│   ├── app/
│   │   ├── api/
│   │   │   └── predict.py               # Prediction endpoint
│   │   ├── core/
│   │   │   └── config.py                # Configuration
│   │   ├── ml/
│   │   │   ├── loader.py                # Load ML models
│   │   │   ├── ml_models/               # Trained models
│   │   │   │   ├── rf_model.pkl
│   │   │   │   └── scaler.pkl
│   │   │   └── courses/                 # Course data
│   │   │       ├── course_embeddings.npy
│   │   │       └── course_descriptions.csv
│   │   ├── schemas/
│   │   │   └── predict.py               # Request/response schemas
│   │   ├── services/
│   │   │   └── recommender.py           # Core logic
│   │   └── utils.py                     # Helper functions
│   ├── main.py                          # FastAPI app
│   └── requirements.txt
│
└── fe/                                  # Frontend (Next.js)
    ├── app/
    │   ├── globals.css
    │   ├── layout.tsx
    │   ├── page.tsx                     # Home page
    │   └── result/
    │       └── page.tsx                 # Results page
    ├── components/
    │   ├── Form.tsx                     # Assessment form
    │   ├── Loader.tsx
    │   └── ResultCard.tsx
    ├── lib/
    │   └── api.ts                       # API client
    └── types/
        └── index.ts
```

## Tech Stack

### Backend
- **FastAPI** - Web framework
- **scikit-learn 1.6.1** - Machine learning (Random Forest, StandardScaler)
- **sentence-transformers** - Text embeddings (`all-mpnet-base-v2` model)
- **google-generativeai** - Gemini AI API (`gemini-2.0-flash`)
- **NumPy & Pandas** - Data processing
- **Pydantic** - Data validation

### Frontend
- **Next.js** - React framework
- **React** - UI components
- **TypeScript** - Type safety
- **Tailwind CSS** - Styling

### Key Techniques
- **Random Forest Classification** - Ensemble learning for performance prediction
- **Feature Scaling** - StandardScaler for normalization
- **Semantic Embeddings** - Transform text to 768-dimensional vectors
- **Cosine Similarity** - Match student profiles with courses

## Dataset Structure

### Input Features

**Student Assessment (q1-q9)**
- `q1`: Weekly study hours (1-5 scale)
- `q2`: Non-scientific reading frequency (1-3)
- `q3`: Scientific reading frequency (1-3)
- `q4`: Seminar/conference attendance (1=Yes, 2=No)
- `q5`: Class attendance (1=Always, 2=Sometimes, 3=Never)
- `q6-q7`: Midterm exam preparation (1-3)
- `q8`: Note-taking in classes (1-3)
- `q9`: Listening in classes (1-3)

**Academic Metrics**
- `gpa_last`: Last semester GPA (0.0-4.0)
- `gpa_expect`: Expected graduation GPA (0.0-4.0)

**Profile**
- `category`: Student's major
- `student_description`: Interests and goals

### GPA Scaling
- 1: < 2.00
- 2: 2.00-2.49
- 3: 2.50-2.99
- 4: 3.00-3.49
- 5: ≥ 3.50

### Output
- **Performance Levels**: Beginner, Intermediate, Advanced
- **Courses**: Top 10 recommended courses
- **AI Recommendation**: Personalized explanation

### Course Database
- `course_descriptions.csv`: Course descriptions
- `course_embeddings.npy`: Pre-computed 768-dim embeddings

## Quick Start

### Backend Setup
```bash
cd be
pip install -r requirements.txt

# Create .env file
echo "GOOGLE_API_KEY=your_api_key_here" > .env

# Run server
uvicorn main:app --reload
```

### Frontend Setup
```bash
cd fe
npm install

# Create .env.local
echo "NEXT_PUBLIC_API_URL=http://localhost:8000" > .env.local

# Run development server
npm run dev
```

## Usage

1. Open `http://localhost:3000`
2. Fill out the student assessment form
3. Submit to get performance prediction and course recommendations
4. View AI-powered insights and recommended courses

## Key Features

- Performance level prediction based on study habits
- Personalized course recommendations using semantic matching
- AI-generated explanations from Gemini
- Clean, responsive UI with print support
- Real-time prediction without data persistence
