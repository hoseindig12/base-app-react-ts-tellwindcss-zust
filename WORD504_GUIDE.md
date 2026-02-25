# 504 Words English Learning System - Quick Start Guide

## 🎯 Overview

A complete English vocabulary learning system featuring:
- **📚 Learn Mode**: Interactive flashcards with 5 daily words
- **✏️ Quiz Mode**: Multiple-choice questions to test knowledge
- **📊 Statistics**: Track progress, streaks, and proficiency levels

## 🚀 Getting Started

### 1. Access the Page
Navigate to: `http://localhost:5173/Word504`

Or click **"504 Words"** in the navigation menu.

### 2. Daily Workflow

#### Learn (15 min)
1. Click **📚 Learn** tab
2. Study the flashcard:
   - **Front**: Word + pronunciation
   - **Click** to flip and see definition
   - **Back**: Definition + example sentence
3. Click **"Mark as Learned"** when you understand
4. Navigate through all 5 daily words
5. Words you learned are highlighted at the bottom

#### Quiz (10 min)
1. Click **✏️ Quiz** tab
2. Answer 5 questions covering:
   - Definition matching
   - Example usage
   - Part of speech
3. Immediate feedback after answering
4. Click **"See Results"** after completing
5. View correct answers with explanations

#### Statistics
1. Click **📊 Statistics** tab
2. View your metrics:
   - **Words Learned**: Total vocabulary mastered
   - **Average Score**: Your quiz performance
   - **Day Streak**: Consecutive days practiced
3. Check proficiency breakdown by level
4. Review past week's performance

## 📊 Statistics Explained

### Proficiency Levels
- 🏆 **Mastered**: 100% correct answers
- 📖 **In Review**: 80-99% correct answers
- 📚 **Learning**: 50-79% correct answers
- ✨ **New**: 0-49% correct answers

### Day Streak
- Increases when you complete daily quiz with 70%+ accuracy
- Resets if you skip a day
- Shows consistent study habit

## 💡 Tips for Success

1. **Daily Practice**: 25 minutes (15 min learn + 10 min quiz)
2. **Consistency**: Same time each day builds habit
3. **Focus**: Start with Beginner level words
4. **Review**: Practice same words until mastered
5. **Variety**: Use examples to understand context

## 🔧 Customization

### Change Daily Word Count
The number of daily words is controlled by an environment variable.  Add
or adjust the value in a `.env`/`.env.local` file at the project root and
restart the dev server:

```dotenv
REACT_APP_WORD504_DAILY_WORD_COUNT=10
```

(If you prefer, you can still override the count directly by modifying
`getDailyWords` in code, but environment variables are easier for
configuration.)

### Filter by Difficulty
Edit `src/components/Word504/Word504LearnMode.tsx`:
```typescript
const filtered = words.filter(w => w.difficulty === 'intermediate');
```

### Adjust Quiz Questions
Edit `src/components/Word504/Word504QuizMode.tsx`:
```typescript
const questionTypes = ["definition", "example"]; // Skip partOfSpeech
```

## 🗂️ Data Storage

All progress is saved locally in your browser:
- **localStorage key**: `word-504-store`
- **Daily words key**: `daily-words-504-YYYY-MM-DD`

### Clear Your Progress
```javascript
// Open browser console (F12)
localStorage.removeItem('word-504-store');
// Refresh page
```

## 🎓 Learning Path

### Week 1-2: Foundation
- Focus: Beginner level words
- Daily: Learn mode thoroughly
- Goal: Build vocabulary base

### Week 3-4: Building
- Focus: Mix of Beginner & Intermediate
- Daily: Learn + Quiz mode
- Goal: Reinforce learning

### Week 5+: Mastery
- Focus: All difficulty levels
- Daily: Quiz mode for review
- Goal: Achieve high scores consistently

## ⚡ Performance Tips

1. **Browser Optimization**
   - Use modern browser (Chrome, Firefox, Safari, Edge)
   - Clear cache if experiencing issues
   - Allow localStorage access

2. **Study Optimization**
   - Review words when tired (retention boost)
   - Take breaks between sessions
   - Speak words aloud while learning

3. **Progress Tracking**
   - Check statistics weekly
   - Review "Learning" level words
   - Try to maintain day streak

## 🐛 Troubleshooting

### Problem: Page not loading
- Clear browser cache
- Hard refresh (Ctrl+Shift+R)
- Check console for errors (F12)

### Problem: Progress not saving
- Ensure localStorage is enabled
- Check browser privacy settings
- Try different browser if issue persists

### Problem: Same words every day
- Check your system date/time
- Clear `daily-words-504-*` keys from localStorage
- Refresh page

## 📱 Features Detail

### Flashcard Design
- 3D flip animation for engagement
- Color-coded difficulty levels
- Example sentences for context
- Pronunciation guide included

### Quiz Interface
- Randomized multiple choice options
- Immediate visual feedback
- Score tracking per session
- Option to review and redo

### Dashboard Metrics
- Visual progress bars
- 7-day performance history
- Proficiency breakdown chart
- Streak achievement display

## 🎯 Goals & Motivation

### Daily Goals
- ✅ Complete 15 min learning session
- ✅ Achieve 70%+ on daily quiz
- ✅ Mark 3+ new words learned
- ✅ Maintain study streak

### Weekly Goals
- ✅ Learn 35+ new words
- ✅ Review 20+ words
- ✅ Average 80%+ on quizzes
- ✅ Maintain 7-day streak

### Monthly Goals
- ✅ Master 150+ words
- ✅ Reach 85% average score
- ✅ 30-day learning streak
- ✅ Complete one full category

## 🔗 Related Pages

- [Irregular Verb Quiz](/IrregularVerbQuiz) - Grammar practice
- [Irregular Verb List](/IrregularVerbList) - Verb reference
- [About](/about) - App information

## 📞 Support

If you encounter issues:
1. Check browser console (F12)
2. Verify localStorage is enabled
3. Try clearing cache
4. Check browser compatibility
5. Contact support if problem persists

---

**Happy Learning!** 🌟 Master 504 essential English words step by step.
