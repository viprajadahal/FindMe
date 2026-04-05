import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const questions = [
  { id: 1, icon: '🌙', title: 'Night owl or early bird?', q: 'What time do you feel most like yourself?', opts: ['Night owl — I come alive at night', 'Early bird — mornings are my thing', 'Somewhere in between'] },
  { id: 2, icon: '🏙️', title: 'City or countryside?', q: 'Where would you rather spend your life?', opts: ['Big city energy', 'Quiet countryside', 'A small town feels right'] },
  { id: 3, icon: '🎭', title: 'Introvert or extrovert?', q: 'How do you recharge after a long week?', opts: ['Alone time — I need it', 'Hanging with people energises me', 'Depends on my mood'] },
  { id: 4, icon: '📱', title: 'Phone or face to face?', q: 'How do you prefer to talk to people?', opts: ['Texting — no pressure', 'Voice or video call', 'In person, always'] },
  { id: 5, icon: '🌍', title: 'Travel style?', q: 'When you go somewhere new, what drives you?', opts: ['Planned itinerary, no surprises', 'Spontaneous — figure it out there', 'Mix of both'] },
  { id: 6, icon: '🍕', title: 'Food adventurer?', q: 'How do you feel about trying new cuisines?', opts: ['I eat the same things I know', 'Love trying new foods', 'Depends on how adventurous it is'] },
  { id: 7, icon: '💬', title: 'Conflict style?', q: 'When something bothers you, what do you do?', opts: ['Speak up immediately', 'Let it go and move on', 'Sit with it, then address it'] },
  { id: 8, icon: '📚', title: 'Learning style?', q: 'How do you best absorb new things?', opts: ['Reading and researching', 'Doing it hands-on', 'Watching or listening'] },
  { id: 9, icon: '🎯', title: 'Goals person?', q: 'How do you approach the future?', opts: ['I have a detailed plan', 'I go with the flow', 'Loose goals, flexible path'] },
  { id: 10, icon: '🤝', title: 'Friendship depth?', q: 'What kind of friendships do you value?', opts: ['A few very deep ones', 'A wide social circle', 'Quality and quantity both matter'] },
  { id: 11, icon: '🎵', title: 'Music mood?', q: 'What does music mean to you?', opts: ['Background noise mostly', 'It shapes my whole mood', 'I only listen when I really feel like it'] },
  { id: 12, icon: '😤', title: 'Stress response?', q: 'When life gets overwhelming, you...', opts: ['Shut down and go quiet', 'Talk it out with someone', 'Stay busy to cope'] },
  { id: 13, icon: '🧠', title: 'Heart or head?', q: 'How do you make big decisions?', opts: ['Logic and data all the way', 'Follow my gut feeling', 'Both — I weigh it out'] },
  { id: 14, icon: '🌱', title: 'Growth mindset?', q: 'How do you feel about personal change?', opts: ['I actively push myself to grow', 'Change happens, I adapt', 'I like who I am as I am'] },
  { id: 15, icon: '🏠', title: 'Home vibe?', q: 'What does your ideal home feel like?', opts: ['Minimal and clean', 'Cosy and lived-in', 'Organised chaos'] },
  { id: 16, icon: '⏰', title: 'Punctuality?', q: 'How do you feel about being on time?', opts: ['Always early — lateness stresses me', 'Right on time is fine', 'A little late, honestly'] },
  { id: 17, icon: '🔋', title: 'Social battery?', q: 'After a big social event, you feel...', opts: ['Drained — I need recovery time', 'Energised and want more', 'It really depends on the crowd'] },
  { id: 18, icon: '💸', title: 'Money mindset?', q: 'How do you relate to spending?', opts: ['Save as much as possible', 'Spend on experiences not things', 'Balance saving and enjoying'] },
  { id: 19, icon: '📺', title: 'Downtime style?', q: 'A perfect lazy day looks like...', opts: ['TV shows or movies', 'Outside — walk, park, nature', 'Creative hobbies or projects'] },
  { id: 20, icon: '🌙', title: 'Deep talk or small talk?', q: 'What kind of conversation energises you?', opts: ['Deep meaningful talks only', 'Light fun banter', 'Both depending on who I\'m with'] },
];

export default function Dashboard() {
  const navigate = useNavigate();
  const [answered, setAnswered] = useState({});
  const [matchCount, setMatchCount] = useState(0);
  const [matchShown, setMatchShown] = useState(false);
  const [currentQ, setCurrentQ] = useState(null);
  const [selectedOpt, setSelectedOpt] = useState(null);
  const [activeModal, setActiveModal] = useState(null); // 'question' | 'match' | 'notifs'
  const [hasNotif, setHasNotif] = useState(false);
  const [latestMatch, setLatestMatch] = useState(null);
  const avatarNumber = 42; // would come from auth/profile context

  useEffect(() => {
    const total = Object.keys(answered).length;
    if (total >= 3 && !matchShown) {
      setMatchShown(true);
      setMatchCount(1);
      setHasNotif(true);
      const sharedQs = Object.keys(answered).slice(0, 3).map(id =>
        questions.find(q => q.id === parseInt(id))
      );
      setLatestMatch({ avatarNum: 77, sharedCount: 3, sharedQs });
    }
  }, [answered, matchShown]);

  const openQuestion = (q) => {
    setCurrentQ(q);
    setSelectedOpt(null);
    setActiveModal('question');
  };

  const submitAnswer = () => {
    if (selectedOpt === null) return;
    setAnswered(prev => ({ ...prev, [currentQ.id]: selectedOpt }));
    setActiveModal(null);
    setCurrentQ(null);
    setSelectedOpt(null);
  };

  const closeModal = () => {
    setActiveModal(null);
    setCurrentQ(null);
    setSelectedOpt(null);
  };

  const answeredCount = Object.keys(answered).length;

  return (
    <div className="min-h-screen" style={{ background: '#FFF1CF' }}>

      {/* Top Bar */}
      <div className="flex items-center justify-between px-5 py-3" style={{ background: '#410200' }}>
        <div className="flex items-center gap-3">
          <div
            className="w-9 h-9 rounded-full flex items-center justify-center text-xs font-medium"
            style={{ background: 'rgba(255,255,255,0.15)', color: 'white' }}
          >
            #{avatarNumber}
          </div>
          <span className="text-base font-medium text-white">anonmatch</span>
        </div>
        <button
          onClick={() => { setActiveModal('notifs'); setHasNotif(false); }}
          className="relative p-1"
        >
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2">
            <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9" />
            <path d="M13.73 21a2 2 0 0 1-3.46 0" />
          </svg>
          {hasNotif && (
            <span className="absolute top-0 right-0 w-2 h-2 rounded-full" style={{ background: '#FAC775' }} />
          )}
        </button>
      </div>

      <div className="px-5 py-5 max-w-2xl mx-auto">

        {/* Stats Row */}
        <p className="text-xs font-medium mb-2" style={{ color: '#7B3A00', letterSpacing: '0.08em', textTransform: 'uppercase' }}>
          your stats
        </p>
        <div className="grid grid-cols-2 gap-3 mb-6">
          <div className="bg-white rounded-xl p-4" style={{ border: '0.5px solid #e0d5c0' }}>
            <div className="text-2xl font-medium" style={{ color: '#410200' }}>{answeredCount}</div>
            <div className="text-xs mt-1" style={{ color: '#7B3A00' }}>answered</div>
          </div>
          <div
            className="rounded-xl p-4 cursor-pointer hover:opacity-90 transition-opacity"
            style={{ background: '#410200' }}
            onClick={() => navigate('/choose-specifics')}
          >
            <div className="text-2xl font-medium text-white">{matchCount}</div>
            <div className="text-xs mt-1" style={{ color: '#FAC775' }}>
              matched · choose specifics →
            </div>
          </div>
        </div>

        {/* Match Banner */}
        {matchShown && latestMatch && (
          <>
            <p className="text-xs font-medium mb-2" style={{ color: '#7B3A00', letterSpacing: '0.08em', textTransform: 'uppercase' }}>
              new match
            </p>
            <div
              className="rounded-xl p-4 flex items-center gap-4 mb-6 cursor-pointer"
              style={{ background: '#410200' }}
              onClick={() => setActiveModal('match')}
            >
              <div
                className="w-11 h-11 rounded-full flex items-center justify-center text-sm font-medium flex-shrink-0"
                style={{ background: '#7B2D00', color: '#FAC775' }}
              >
                #{latestMatch.avatarNum}
              </div>
              <div className="flex-1">
                <p className="text-sm font-medium text-white">you matched with #{latestMatch.avatarNum}</p>
                <span className="text-xs" style={{ color: '#FAC775' }}>{latestMatch.sharedCount} shared answers in common</span>
              </div>
              <span style={{ color: '#FAC775', fontSize: 20 }}>›</span>
            </div>
          </>
        )}

        {/* Questions Grid */}
        <p className="text-xs font-medium mb-2" style={{ color: '#7B3A00', letterSpacing: '0.08em', textTransform: 'uppercase' }}>
          today's questions
        </p>
        <div className="grid grid-cols-2 gap-3">
          {questions.map(q => {
            const isAnswered = !!answered[q.id];
            return (
              <div
                key={q.id}
                onClick={() => !isAnswered && openQuestion(q)}
                className="rounded-2xl p-4 transition-all"
                style={{
                  background: isAnswered ? '#fff8ee' : 'white',
                  border: `0.5px solid ${isAnswered ? '#c9a87c' : '#e0d5c0'}`,
                  cursor: isAnswered ? 'default' : 'pointer',
                }}
              >
                <div className="text-2xl mb-2">{q.icon}</div>
                <div className="text-sm font-medium mb-1" style={{ color: '#2d1810', lineHeight: 1.3 }}>{q.title}</div>
                <div className="text-xs mb-2" style={{ color: '#7B3A00' }}>
                  {q.q.length > 48 ? q.q.slice(0, 46) + '…' : q.q}
                </div>
                <span
                  className="text-xs font-medium px-2 py-1 rounded-full"
                  style={{
                    background: isAnswered ? '#410200' : '#f3ebe0',
                    color: isAnswered ? 'white' : '#7B3A00',
                  }}
                >
                  {isAnswered ? '✓ answered' : 'tap to answer'}
                </span>
              </div>
            );
          })}
        </div>
      </div>

      {/* Question Modal */}
      {activeModal === 'question' && currentQ && (
        <div
          className="fixed inset-0 flex items-center justify-center p-5"
          style={{ background: 'rgba(65,2,0,0.55)', zIndex: 50 }}
          onClick={(e) => e.target === e.currentTarget && closeModal()}
        >
          <div className="bg-white rounded-2xl p-6 w-full max-w-sm">
            <h3 className="text-lg font-medium mb-1" style={{ color: '#410200' }}>{currentQ.title}</h3>
            <p className="text-sm mb-4" style={{ color: '#5c5c5c', lineHeight: 1.6 }}>{currentQ.q}</p>
            <div className="flex flex-col gap-2">
              {currentQ.opts.map((opt, i) => (
                <button
                  key={i}
                  onClick={() => setSelectedOpt(i)}
                  className="px-4 py-3 rounded-xl text-sm text-left transition-all"
                  style={{
                    border: `1.5px solid ${selectedOpt === i ? '#410200' : '#d4c5a9'}`,
                    background: selectedOpt === i ? '#410200' : 'white',
                    color: selectedOpt === i ? 'white' : '#2d1810',
                  }}
                >
                  {opt}
                </button>
              ))}
            </div>
            <div className="flex gap-2 mt-5">
              <button
                onClick={closeModal}
                className="px-4 py-2.5 rounded-xl text-sm"
                style={{ border: '1.5px solid #410200', color: '#410200', background: 'white' }}
              >
                cancel
              </button>
              <button
                onClick={submitAnswer}
                className="flex-1 py-2.5 rounded-xl text-sm font-medium text-white"
                style={{ background: selectedOpt !== null ? '#410200' : '#c9a87c' }}
                disabled={selectedOpt === null}
              >
                submit answer
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Match Modal */}
      {activeModal === 'match' && latestMatch && (
        <div
          className="fixed inset-0 flex items-center justify-center p-5"
          style={{ background: 'rgba(65,2,0,0.55)', zIndex: 50 }}
          onClick={(e) => e.target === e.currentTarget && closeModal()}
        >
          <div className="bg-white rounded-2xl p-6 w-full max-w-sm">
            <h3 className="text-lg font-medium mb-1" style={{ color: '#410200' }}>matched with #{latestMatch.avatarNum}</h3>
            <p className="text-sm mb-4" style={{ color: '#5c5c5c', lineHeight: 1.6 }}>
              You both answered {latestMatch.sharedCount} questions the same way. Want to start an anonymous chat?
            </p>
            <div className="rounded-xl p-3 mb-4" style={{ background: '#fff8ee' }}>
              <p className="text-xs font-medium mb-2" style={{ color: '#7B3A00' }}>shared answers</p>
              {latestMatch.sharedQs.map(q => (
                <p key={q.id} className="text-xs py-1" style={{ color: '#410200' }}>• {q.title}</p>
              ))}
            </div>
            <div className="flex gap-2">
              <button
                onClick={closeModal}
                className="px-4 py-2.5 rounded-xl text-sm"
                style={{ border: '1.5px solid #410200', color: '#410200', background: 'white' }}
              >
                skip
              </button>
              <button
                onClick={() => { closeModal(); navigate('/chat'); }}
                className="flex-1 py-2.5 rounded-xl text-sm font-medium text-white"
                style={{ background: '#410200' }}
              >
                start chat
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Notifications Modal */}
      {activeModal === 'notifs' && (
        <div
          className="fixed inset-0 flex items-center justify-center p-5"
          style={{ background: 'rgba(65,2,0,0.55)', zIndex: 50 }}
          onClick={(e) => e.target === e.currentTarget && closeModal()}
        >
          <div className="bg-white rounded-2xl p-6 w-full max-w-sm">
            <p className="text-base font-medium mb-4" style={{ color: '#410200' }}>notifications</p>
            {matchShown ? (
              <>
                <div className="flex items-start gap-3 py-3" style={{ borderBottom: '0.5px solid #f0e8d8' }}>
                  <div className="w-2 h-2 rounded-full mt-1.5 flex-shrink-0" style={{ background: '#410200' }} />
                  <div>
                    <p className="text-sm" style={{ color: '#2d1810' }}>you matched with <strong>#77</strong> — 3 shared answers</p>
                    <span className="text-xs" style={{ color: '#7B3A00' }}>just now</span>
                  </div>
                </div>
                <div className="flex items-start gap-3 py-3" style={{ borderBottom: '0.5px solid #f0e8d8' }}>
                  <div className="w-2 h-2 rounded-full mt-1.5 flex-shrink-0" style={{ background: '#c9a87c' }} />
                  <div>
                    <p className="text-sm" style={{ color: '#2d1810' }}>20 new questions available today</p>
                    <span className="text-xs" style={{ color: '#7B3A00' }}>1 hour ago</span>
                  </div>
                </div>
              </>
            ) : (
              <div className="flex items-start gap-3 py-3">
                <div className="w-2 h-2 rounded-full mt-1.5 flex-shrink-0" style={{ background: '#c9a87c' }} />
                <div>
                  <p className="text-sm" style={{ color: '#2d1810' }}>20 new questions available today</p>
                  <span className="text-xs" style={{ color: '#7B3A00' }}>1 hour ago</span>
                </div>
              </div>
            )}
            <button
              onClick={closeModal}
              className="w-full mt-4 py-2.5 rounded-xl text-sm font-medium text-white"
              style={{ background: '#410200' }}
            >
              close
            </button>
          </div>
        </div>
      )}

    </div>
  );
}