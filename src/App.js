import React, { useState, useEffect } from 'react';
import './App.css';

const QUESTIONS = [
  {
    id: 1,
    text: 'How long have you been trying to build an online income?',
    answers: [
      { text: "I'm just getting started.", scores: { carla: 2 } },
      { text: '6–12 months, nothing launched yet.', scores: { denise: 2 } },
      { text: 'More than a year, some attempts.', scores: { angela: 2 } },
    ],
  },
  {
    id: 2,
    text: 'Have you ever sold a digital product or service online?',
    answers: [
      { text: 'No, not yet.', scores: { carla: 2 } },
      { text: "No, but I've built things I never launched.", scores: { denise: 2 } },
      { text: 'Yes, a little — but nothing consistent.', scores: { angela: 2 } },
    ],
  },
  {
    id: 3,
    text: 'How would you describe your relationship with AI tools right now?',
    answers: [
      { text: "I've tried a few times and got nothing useful.", scores: { carla: 2 } },
      { text: 'I use them randomly and get inconsistent results.', scores: { denise: 2 } },
      { text: "I use AI for basic tasks but haven't built it into a real system.", scores: { angela: 2 } },
    ],
  },
  {
    id: 4,
    text: "What's your biggest obstacle right now?",
    answers: [
      { text: "I don't even know where to start.", scores: { carla: 2 } },
      { text: 'I start things but never finish or launch them.', scores: { denise: 2 } },
      { text: "I have products but can't get consistent sales.", scores: { angela: 2 } },
    ],
  },
  {
    id: 5,
    text: 'How much time do you realistically have for this each week?',
    answers: [
      { text: 'A few hours, evenings and weekends.', scores: { carla: 2 } },
      { text: "I have time — that's not the problem.", scores: { denise: 2 } },
      { text: "I have more bandwidth now and I'm ready to commit.", scores: { angela: 2 } },
    ],
  },
  {
    id: 6,
    text: 'What do you need most right now?',
    answers: [
      { text: 'Proof that this is actually possible for someone like me.', scores: { carla: 2 } },
      { text: 'A forcing function that makes me actually finish something.', scores: { denise: 2 } },
      { text: 'A system I can run consistently that compounds over time.', scores: { angela: 2 } },
    ],
  },
  {
    id: 7,
    text: 'How do you feel about the word "techy"?',
    answers: [
      { text: "That's me — I don't consider myself tech-savvy.", scores: { carla: 2 } },
      { text: "I'm fine with tech, I just can't stick to one thing.", scores: { denise: 2 } },
      { text: 'Tech isn\'t the issue. Execution and traction are.', scores: { angela: 2 } },
    ],
  },
  {
    id: 8,
    text: 'How much have you spent on courses or tools in the last 12 months?',
    answers: [
      { text: "A little — I'm cautious because I haven't finished what I bought.", scores: { carla: 2 } },
      { text: "$300 or more, and I've made nothing back yet.", scores: { denise: 2 } },
      { text: "I've invested in my business — the results just haven't matched the effort.", scores: { angela: 2 } },
    ],
  },
  {
    id: 9,
    text: 'What does success look like to you right now?',
    answers: [
      { text: 'An extra $500–$1,000/month to reduce financial stress.', scores: { carla: 2 } },
      { text: 'One completed launch — I just need to prove I can do it.', scores: { denise: 2 } },
      { text: 'Consistent revenue and a real path to replacing my income.', scores: { angela: 2 } },
    ],
  },
  {
    id: 10,
    text: 'Finish this sentence: "What I really need is..."',
    answers: [
      { text: 'Someone to show me the first step and keep it simple.', scores: { carla: 2 } },
      { text: "Something that won't let me quit before I finish.", scores: { denise: 2 } },
      { text: "The architecture underneath the work I've already done.", scores: { angela: 2 } },
    ],
  },
];

// Tie-breaker: Carla beats Denise, Denise beats Angela
const getTrack = (scores) => {
  const { carla, denise, angela } = scores;
  const max = Math.max(carla, denise, angela);
  if (carla === max) return 'carla';
  if (denise === max) return 'denise';
  return 'angela';
};

const RESULTS = {
  carla: {
    label: "You're a Curious Carla",
    headline: "You're a Builder Who Hasn't Started Yet.",
    body: [
      "You're not behind. You're not incapable. You're at the beginning — and the beginning is exactly where we built something for you.",
      "The reason AI hasn't worked yet isn't you. It's that you've never had a clear starting point. You've been handed tools when what you needed was a path.",
    ],
    callout: "You need one small, completable win that proves AI can actually work for you — before you invest more time, money, or energy into figuring this out on your own.",
  },
  denise: {
    label: "You're a Dabbling Denise",
    headline: "You're a Builder Who Keeps Getting Stuck at the Finish Line.",
    body: [
      "You're not lazy. You're not undisciplined. You have more ideas and half-built things than most people — and zero launches to show for it.",
      "The problem isn't starting. It's finishing. And finishing requires a different kind of system than the ones you've been trying.",
    ],
    callout: 'You need a forcing function — something with a real finish line built in that makes "almost done" impossible to live in.',
  },
  angela: {
    label: "You're an Almost There Angela",
    headline: "You're a Builder Who's Almost There — and You Know It.",
    body: [
      "You've done the work. You have products. You've made some sales. But the revenue is inconsistent, the systems aren't connected, and you can't figure out if the problem is the product, the pricing, or the marketing.",
      "It's none of those. It's the absence of an operating system underneath everything you've already built.",
    ],
    callout: "You don't need to start over. You need the architecture that connects what you already have into something that compounds.",
  },
};

const THANK_YOU = {
  carla: {
    headline: "Your action plan is on its way.",
    body: "Check your inbox in the next few minutes. Your first step is simpler than you think — and it fits in a lunch break.",
    label: "RECOMMENDED FOR YOU",
    product: "5-Day Business Proof Kit™",
    oneliner: "One task. One prompt. One real result. Every day for 5 days.",
    cta: "Get the 5-Day Business Proof Kit™ →",
    url: "https://theaitoolstack.com/product-details/product/business-proof-kit",
  },
  denise: {
    headline: "Your action plan is on its way.",
    body: "Check your inbox in the next few minutes. What you'll find isn't more information — it's a clear next move.",
    label: "RECOMMENDED FOR YOU",
    product: "From Folder to Listed™",
    oneliner: "The complete system to go from idea to live product — with a real finish line.",
    cta: "Get From Folder to Listed™ →",
    url: "https://theaitoolstack.com/product-details/product/from-folder-to-listed",
  },
  angela: {
    headline: "Your action plan is on its way.",
    body: "Check your inbox in the next few minutes. You're closer than you think — the next step is about connecting what you already have.",
    label: "RECOMMENDED FOR YOU",
    product: "The Operator's Prompt Kit™",
    oneliner: "Built for women who already have pieces in motion and need the system underneath.",
    cta: "Get The Operator's Prompt Kit™ →",
    url: "https://theaitoolstack.com/product-details/product/the-operators-prompt-kit",
  },
};

// Screens: intro | question | calculating | result | thankyou
export default function App() {
  const [screen, setScreen] = useState('intro');
  const [questionIndex, setQuestionIndex] = useState(0);
  const [scores, setScores] = useState({ carla: 0, denise: 0, angela: 0 });
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [track, setTrack] = useState(null);
  const [email, setEmail] = useState('');
  const [submitState, setSubmitState] = useState('idle'); // idle | sending | error
  const [errorMsg, setErrorMsg] = useState('');

  useEffect(() => {
    if (screen === 'calculating') {
      const t = setTimeout(() => setScreen('result'), 2000);
      return () => clearTimeout(t);
    }
  }, [screen]);

  const handleAnswer = (answer) => {
    if (selectedAnswer !== null) return;
    setSelectedAnswer(answer.text);

    const newScores = { ...scores };
    Object.entries(answer.scores).forEach(([key, val]) => {
      newScores[key] = (newScores[key] || 0) + val;
    });

    setTimeout(() => {
      if (questionIndex < QUESTIONS.length - 1) {
        setScores(newScores);
        setQuestionIndex(questionIndex + 1);
        setSelectedAnswer(null);
      } else {
        const finalTrack = getTrack(newScores);
        setScores(newScores);
        setTrack(finalTrack);
        setScreen('calculating');
        setSelectedAnswer(null);
      }
    }, 300);
  };

  const handleEmailSubmit = async (e) => {
    e.preventDefault();
    if (!email || submitState === 'sending') return;
    setSubmitState('sending');
    setErrorMsg('');

    try {
      const res = await fetch('/api/submit-email', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, track, source: 'ai-business-audit' }),
      });

      if (!res.ok) throw new Error('Request failed');
      setScreen('thankyou');
    } catch {
      setSubmitState('error');
      setErrorMsg('Something went wrong. Please try again.');
    }
  };

  // ── INTRO ──
  if (screen === 'intro') {
    return (
      <div className="screen">
        <div className="inner">
          <p className="intro-pre">Free Assessment</p>
          <h1 className="intro-headline">Find Out Exactly Where to Start.</h1>
          <p className="intro-sub">
            10 questions. 2 minutes. A clear starting point built for where you actually are — not where you think you should be.
          </p>
          <button className="btn-primary" onClick={() => setScreen('question')}>
            Start the Audit →
          </button>
          <p className="intro-footer">Free. No credit card. No guessing.</p>
        </div>
      </div>
    );
  }

  // ── QUESTION ──
  if (screen === 'question') {
    const q = QUESTIONS[questionIndex];
    const progress = ((questionIndex + 1) / QUESTIONS.length) * 100;

    return (
      <div className="screen" style={{ justifyContent: 'flex-start', paddingTop: 40 }}>
        <div className="inner">
          <div className="progress-wrapper">
            <p className="progress-label">Question {questionIndex + 1} of {QUESTIONS.length}</p>
            <div className="progress-track">
              <div className="progress-fill" style={{ width: `${progress}%` }} />
            </div>
          </div>
          <h2 className="question-text">{q.text}</h2>
          <div className="answers-list">
            {q.answers.map((a) => (
              <button
                key={a.text}
                className={`answer-card${selectedAnswer === a.text ? ' selected' : ''}`}
                onClick={() => handleAnswer(a)}
                disabled={selectedAnswer !== null}
              >
                <span>{a.text}</span>
                {selectedAnswer === a.text && <span className="checkmark">✓</span>}
              </button>
            ))}
          </div>
        </div>
      </div>
    );
  }

  // ── CALCULATING ──
  if (screen === 'calculating') {
    return (
      <div className="calculating-screen">
        <div className="spinner" />
        <p className="calculating-headline">Identifying your starting point...</p>
        <p className="calculating-sub">This takes just a moment.</p>
      </div>
    );
  }

  // ── RESULT ──
  if (screen === 'result' && track) {
    const result = RESULTS[track];

    return (
      <div className="screen" style={{ justifyContent: 'flex-start', paddingTop: 48 }}>
        <div className="inner">
          <div style={{ textAlign: 'center' }}>
            <span className="result-badge">{result.label}</span>
          </div>
          <h2 className="result-headline">{result.headline}</h2>
          {result.body.map((para, i) => (
            <p className="result-body" key={i}>{para}</p>
          ))}
          <blockquote className="result-callout">{result.callout}</blockquote>

          <div className="divider" />

          <h3 className="email-headline">Where should we send your personalized action plan?</h3>
          <p className="email-sub">
            We'll send your next steps — matched to exactly where you are — straight to your inbox.
          </p>
          <form onSubmit={handleEmailSubmit}>
            <input
              className="email-input"
              type="email"
              placeholder="Your email address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <button
              type="submit"
              className={`btn-submit${submitState === 'sending' ? ' sending' : ''}`}
              disabled={submitState === 'sending'}
            >
              {submitState === 'sending' ? 'Sending...' : 'Send My Action Plan →'}
            </button>
            {submitState === 'error' && (
              <p className="email-error">{errorMsg}</p>
            )}
          </form>
          <p className="email-footer-note">No spam. Just your next step.</p>
        </div>
      </div>
    );
  }

  // ── THANK YOU ──
  if (screen === 'thankyou' && track) {
    const ty = THANK_YOU[track];

    return (
      <div className="screen" style={{ justifyContent: 'flex-start', paddingTop: 48 }}>
        <div className="inner">
          <h2 className="ty-headline">{ty.headline}</h2>
          <p className="ty-body">{ty.body}</p>
          <div className="product-card">
            <p className="product-card-label">{ty.label}</p>
            <p className="product-card-name">{ty.product}</p>
            <p className="product-card-oneliner">{ty.oneliner}</p>
            <a className="btn-cta" href={ty.url} target="_blank" rel="noopener noreferrer">
              {ty.cta}
            </a>
          </div>
        </div>
      </div>
    );
  }

  return null;
}
