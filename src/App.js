import React, { useState, useEffect } from 'react';
import './App.css';

const QUESTIONS = [
  {
    id: 1,
    text: 'When you think about building an AI-powered business, what\'s your honest first reaction?',
    answers: [
      { text: 'I have no idea where to even start.', scores: { carla: 2 } },
      { text: 'I have ideas but I can\'t seem to finish anything.', scores: { denise: 2 } },
      { text: 'I\'ve started — I just can\'t get traction.', scores: { angela: 2 } },
      { text: 'I\'m excited but overwhelmed by the options.', scores: { carla: 1, denise: 1 } },
    ],
  },
  {
    id: 2,
    text: 'How would you describe your experience with AI tools so far?',
    answers: [
      { text: 'I\'ve tried a few things, got generic results, and quietly gave up.', scores: { carla: 2 } },
      { text: 'I use them sometimes but I\'m inconsistent — no real system.', scores: { denise: 2 } },
      { text: 'I use AI regularly but it\'s not connected to my business results yet.', scores: { angela: 2 } },
      { text: 'I\'m just getting started — haven\'t really tried anything yet.', scores: { carla: 2 } },
    ],
  },
  {
    id: 3,
    text: 'What does your current digital product situation look like?',
    answers: [
      { text: 'I don\'t have one yet — I\'m not sure what I\'d even sell.', scores: { carla: 2 } },
      { text: 'I have ideas and maybe a half-built thing — nothing live yet.', scores: { denise: 2 } },
      { text: 'I have something live but it\'s not selling consistently.', scores: { angela: 2 } },
      { text: 'I\'ve sold a little — maybe $0–$200 total lifetime.', scores: { angela: 1, denise: 1 } },
    ],
  },
  {
    id: 4,
    text: 'What\'s the biggest thing that has stopped you from making progress?',
    answers: [
      { text: 'I don\'t know what to build or where to start.', scores: { carla: 2 } },
      { text: 'I start things but never finish or launch them.', scores: { denise: 2 } },
      { text: 'I finish things but can\'t figure out how to get consistent sales.', scores: { angela: 2 } },
      { text: 'I feel like I need more information before I can begin.', scores: { carla: 1, denise: 1 } },
    ],
  },
  {
    id: 5,
    text: 'How much time can you realistically dedicate to building your business right now?',
    answers: [
      { text: 'Honestly, not much — maybe a few hours a week.', scores: { carla: 2 } },
      { text: 'I have time but I end up using it on the wrong things.', scores: { denise: 2 } },
      { text: 'I have more bandwidth than I\'ve had in years — I\'m ready to move.', scores: { angela: 2 } },
      { text: 'I have evenings and weekends if I stay focused.', scores: { carla: 1, denise: 1 } },
    ],
  },
  {
    id: 6,
    text: 'When you imagine having a digital product business that actually works, what does that look like?',
    answers: [
      { text: 'An extra $500–$1,000/month that reduces financial stress.', scores: { carla: 2 } },
      { text: 'Proof that I actually launched and sold something — validation first.', scores: { denise: 2 } },
      { text: 'Consistent, predictable revenue — a real path to replacing my income.', scores: { angela: 2 } },
      { text: 'Something I built myself that I\'m proud of and can grow.', scores: { carla: 1, denise: 1 } },
    ],
  },
  {
    id: 7,
    text: 'What\'s the most honest thing you could say about where you are right now?',
    answers: [
      { text: 'I\'m curious but I need to see proof this can work for someone like me.', scores: { carla: 2 } },
      { text: 'I\'m done dabbling — I need something that forces me to finish.', scores: { denise: 2 } },
      { text: 'I\'m almost there. I just need the system that pulls it all together.', scores: { angela: 2 } },
      { text: 'I\'ve been collecting tools and courses for too long without results.', scores: { carla: 1, denise: 1 } },
    ],
  },
];

const getTrack = (scores) => {
  const { carla, denise, angela } = scores;
  const max = Math.max(carla, denise, angela);
  if (angela === max) return 'angela';
  if (denise === max) return 'denise';
  return 'carla';
};

const RESULTS = {
  carla: {
    headline: "You're a Builder Who Hasn't Started Yet.",
    body: [
      "You're not behind. You're not incapable. You're at the beginning — and the beginning is exactly where we built something for you.",
      "The reason AI hasn't worked yet isn't you. It's that you've never had a clear starting point. You've been handed tools when what you needed was a path.",
    ],
    callout: "You need one small, completable win that proves AI can actually work for you — before you invest more time, money, or energy into figuring this out on your own.",
  },
  denise: {
    headline: "You're a Builder Who Keeps Getting Stuck at the Finish Line.",
    body: [
      "You're not lazy. You're not undisciplined. You have more ideas and half-built things than most people — and zero launches to show for it.",
      "The problem isn't starting. It's finishing. And finishing requires a different kind of system than the ones you've been trying.",
    ],
    callout: "You need a forcing function — something with a real finish line built in that makes \"almost done\" impossible to live in.",
  },
  angela: {
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
    price: "$17",
    cta: "Get Started for $17 →",
    url: "[BPK-PRODUCT-URL]",
  },
  denise: {
    headline: "Your action plan is on its way.",
    body: "Check your inbox in the next few minutes. What you'll find isn't more information — it's a clear next move.",
    label: "RECOMMENDED FOR YOU",
    product: "The First Launch™",
    oneliner: "The complete system to go from idea to live product — with a real finish line.",
    price: "$47",
    cta: "See The First Launch™ →",
    url: "[TFL-PRODUCT-URL]",
  },
  angela: {
    headline: "Your action plan is on its way.",
    body: "Check your inbox in the next few minutes. You're closer than you think — the next step is about connecting what you already have.",
    label: "RECOMMENDED FOR YOU",
    product: "The First Launch™",
    oneliner: "Built for women who already have pieces in motion and need the system underneath.",
    price: "$47",
    cta: "See The First Launch™ →",
    url: "[TFL-PRODUCT-URL]",
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

  // Auto-advance calculating screen
  useEffect(() => {
    if (screen === 'calculating') {
      const t = setTimeout(() => {
        setScreen('result');
      }, 2000);
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
            7 questions. 2 minutes. A clear starting point built for where you actually are — not where you think you should be.
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
            <p className="progress-label">Question {questionIndex + 1} of 7</p>
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
            <span className="result-badge">Your Result</span>
          </div>
          <h2 className="result-headline">{result.headline}</h2>
          {result.body.map((para, i) => (
            <p className="result-body" key={i}>{para}</p>
          ))}
          <blockquote className="result-callout">{result.callout}</blockquote>

          <div className="divider" />

          {/* Email capture */}
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
            <p className="product-card-price">{ty.price}</p>
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
