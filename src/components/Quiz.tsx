import { useEffect, useState, useRef } from "react";
import Nav from './nav-bar';
import Navlogin from './nav-bar(login)';
import './css/Selfdiscoveryquiz.css';

// ============================================================
// TYPES
// ============================================================
interface Question {
  id: number;
  text: string;
  hint?: string;
  emoji: string;
  category: string;
  options: { label: string; emoji: string; value: string }[];
}

interface Answer {
  questionId: number;
  value: string;
  category: string;
}

interface Recommendation {
  university: string;
  faculty: string;
  major: string;
  reason: string;
  matchScore: number;
  careers?: string[];
}

// ============================================================
// QUIZ DATA  — เหมาะสำหรับเด็กที่ยังไม่รู้ว่าตัวเองชอบอะไร
// คำถามอิงจากพฤติกรรมและสถานการณ์จริง ไม่ถามตรงๆ ว่า "ชอบอะไร"
// ============================================================
const QUESTIONS: Question[] = [
  {
    id: 1,
    category: "activity",
    emoji: "🎮",
    text: "ถ้าวันหยุดไม่มีอะไรต้องทำเลย หนูมักจะทำอะไร?",
    hint: "ไม่ต้องคิดมาก แค่นึกถึงสิ่งที่ทำโดยอัตโนมัติ",
    options: [
      { emoji: "🎨", label: "วาดรูป ระบาย ปั้น หรือทำงานฝีมือ", value: "creative" },
      { emoji: "🔧", label: "ถอดชิ้นส่วนของหรือประกอบสิ่งต่างๆ เล่น", value: "maker" },
      { emoji: "📱", label: "เล่นเกม ดูคลิป หรือหาข้อมูลในอินเทอร์เน็ต", value: "digital" },
      { emoji: "🤸", label: "ออกไปข้างนอก เล่นกีฬา หรือพบเพื่อน", value: "active" },
      { emoji: "📚", label: "อ่านหนังสือ เขียนไดอารี่ หรือเล่าเรื่อง", value: "literary" },
    ],
  },
  {
    id: 2,
    category: "reaction",
    emoji: "🌍",
    text: "เวลาดูข่าวหรือเห็นเรื่องราวในโลก หนูรู้สึกอยากทำอะไรมากที่สุด?",
    hint: "ลองนึกถึงครั้งที่รู้สึกว่า 'อยากทำอะไรสักอย่าง'",
    options: [
      { emoji: "💡", label: "คิดหาวิธีแก้ปัญหาหรือสิ่งประดิษฐ์ใหม่ๆ", value: "problem_solver" },
      { emoji: "🩺", label: "อยากช่วยเหลือคนที่เจ็บป่วยหรือเดือดร้อน", value: "helper" },
      { emoji: "🎤", label: "อยากพูดหรือบอกให้คนอื่นรับรู้เรื่องนี้", value: "communicator" },
      { emoji: "🌱", label: "อยากดูแลสิ่งแวดล้อมหรือสัตว์", value: "nature" },
      { emoji: "📊", label: "อยากวิเคราะห์ว่าทำไมถึงเกิดขึ้นและจะเป็นยังไงต่อ", value: "analyst" },
    ],
  },
  {
    id: 3,
    category: "school",
    emoji: "🏫",
    text: "ชั่วโมงไหนในโรงเรียนที่หนูรอคอยมากที่สุด?",
    hint: "ไม่จำเป็นต้องเป็นวิชาที่เก่งที่สุด แค่ชอบที่สุดพอ",
    options: [
      { emoji: "🔬", label: "วิทยาศาสตร์ — ชอบทดลองและดูปรากฏการณ์", value: "science" },
      { emoji: "➕", label: "คณิตศาสตร์ — ชอบโจทย์ที่มีคำตอบชัดเจน", value: "math" },
      { emoji: "🗣️", label: "ภาษา (ไทย/อังกฤษ) — ชอบอ่านและเขียน", value: "language" },
      { emoji: "🖌️", label: "ศิลปะหรือดนตรี — ชอบสร้างสรรค์สิ่งสวยงาม", value: "arts" },
      { emoji: "⚽", label: "พลศึกษาหรือกิจกรรม — ชอบเคลื่อนไหวและทำงานทีม", value: "physical" },
    ],
  },
  {
    id: 4,
    category: "superpower",
    emoji: "🦸",
    text: "ถ้าหนูมีพลังพิเศษ 1 อย่าง หนูอยากได้อะไร?",
    hint: "ตอบตามความรู้สึกแรก ไม่ต้องคิดนาน!",
    options: [
      { emoji: "🧠", label: "เรียนรู้ทุกอย่างได้ภายในวินาที", value: "intellect" },
      { emoji: "💊", label: "รักษาโรคและบาดแผลให้หายได้ทันที", value: "healing" },
      { emoji: "🏗️", label: "สร้างสิ่งก่อสร้างหรือเครื่องจักรได้ทันที", value: "building" },
      { emoji: "🎨", label: "สร้างงานศิลปะที่สวยงามและซาบซึ้งใจได้", value: "artistry" },
      { emoji: "🤝", label: "เข้าใจความรู้สึกและช่วยเหลือทุกคนได้", value: "empathy" },
    ],
  },
  {
    id: 5,
    category: "problem",
    emoji: "🧩",
    text: "เพื่อนมีปัญหา หนูมักจะตอบสนองแบบไหน?",
    hint: "ลองนึกถึงครั้งที่เพื่อนมาปรึกษาจริงๆ",
    options: [
      { emoji: "🗺️", label: "ช่วยวางแผนและคิดหาทางออกเป็นขั้นตอน", value: "planner" },
      { emoji: "🫂", label: "นั่งฟังและให้กำลังใจ ไม่รีบแก้ปัญหา", value: "supporter" },
      { emoji: "🔍", label: "ช่วยค้นหาข้อมูลหรือหาคนที่รู้เรื่องนั้นมาช่วย", value: "researcher" },
      { emoji: "😄", label: "พาทำอะไรสนุกๆ เพื่อเปลี่ยนบรรยากาศก่อน", value: "uplifter" },
      { emoji: "🛠️", label: "ลงมือช่วยทำสิ่งที่เป็นรูปธรรม เช่น ช่วยทำงาน", value: "doer" },
    ],
  },
  {
    id: 6,
    category: "dream",
    emoji: "✨",
    text: "ภาพที่หนูอยากให้เกิดขึ้นในอีก 10 ปีข้างหน้า คืออะไร?",
    hint: "ไม่ต้องเป็นจริงได้ทั้งหมด แค่ภาพที่ใจอยากเห็น",
    options: [
      { emoji: "🏥", label: "ทำงานช่วยเหลือและดูแลชีวิตผู้คน", value: "care" },
      { emoji: "💻", label: "สร้างเทคโนโลยีหรือนวัตกรรมที่เปลี่ยนโลก", value: "tech" },
      { emoji: "🎭", label: "สร้างงานที่ทำให้คนประทับใจและมีความสุข", value: "art_life" },
      { emoji: "🏢", label: "บริหารองค์กรหรือธุรกิจของตัวเอง", value: "business" },
      { emoji: "🌏", label: "ช่วยสังคม สิ่งแวดล้อม หรือนโยบายสาธารณะ", value: "society" },
    ],
  },
  {
    id: 7,
    category: "energy",
    emoji: "⚡",
    text: "หนูรู้สึก 'อิน' หรือมีพลังมากที่สุดเมื่อไหร่?",
    hint: "นึกถึงครั้งที่ทำแล้วลืมเวลา ไม่รู้สึกเหนื่อยเลย",
    options: [
      { emoji: "🧪", label: "ตอนทดลองหรือค้นพบสิ่งใหม่ที่ไม่เคยรู้มาก่อน", value: "discovery" },
      { emoji: "👥", label: "ตอนอยู่กับคนเยอะๆ ทำงานร่วมกัน หรือพูดต่อหน้าคน", value: "group" },
      { emoji: "🎯", label: "ตอนที่ทำงานคนเดียวได้อย่างมีสมาธิและผลออกมาดี", value: "solo" },
      { emoji: "🌿", label: "ตอนอยู่ในธรรมชาติหรือดูแลสิ่งมีชีวิต", value: "nature_e" },
      { emoji: "🎬", label: "ตอนสร้าง นำเสนอ หรือแสดงให้คนอื่นดู", value: "performance" },
    ],
  },
  {
    id: 8,
    category: "worry",
    emoji: "💭",
    text: "เรื่องอะไรที่หนูคิดว่าสำคัญสำหรับโลกมากที่สุด?",
    hint: "เรื่องที่คิดแล้วรู้สึกว่า 'อยากทำอะไรสักอย่าง'",
    options: [
      { emoji: "🏥", label: "สุขภาพและการรักษาโรค", value: "health" },
      { emoji: "🌍", label: "สิ่งแวดล้อมและการเปลี่ยนแปลงสภาพภูมิอากาศ", value: "environment" },
      { emoji: "📚", label: "การศึกษาและความเท่าเทียมในสังคม", value: "education" },
      { emoji: "💻", label: "เทคโนโลยีและนวัตกรรมเพื่อชีวิตที่ดีขึ้น", value: "innovation" },
      { emoji: "🎨", label: "วัฒนธรรม ศิลปะ และความเป็นอยู่ที่ดีของจิตใจ", value: "culture" },
    ],
  },
];

// ============================================================
// OLLAMA CONFIG
// ============================================================
const OLLAMA_BASE_URL = "http://localhost:11434";
const DEFAULT_MODEL = "llama3.2";

// ============================================================
// MAIN COMPONENT
// ============================================================
const SelfDiscoveryQuiz = () => {
  const [mode, setMode] = useState<"login" | "no-login">("no-login");
  const [step, setStep] = useState<"intro" | "quiz" | "loading" | "result">("intro");
  const [currentQ, setCurrentQ] = useState(0);
  const [answers, setAnswers] = useState<Answer[]>([]);
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [recommendations, setRecommendations] = useState<Recommendation[]>([]);
  const [streamText, setStreamText] = useState("");
  const [ollamaModel, setOllamaModel] = useState(DEFAULT_MODEL);
  const [ollamaUrl, setOllamaUrl] = useState(OLLAMA_BASE_URL);
  const [error, setError] = useState<string | null>(null);
  const abortRef = useRef<AbortController | null>(null);

  useEffect(() => {
    const token = localStorage.getItem("token");
    setMode(token ? "login" : "no-login");
  }, []);

  const handleSelect = (value: string) => setSelectedOption(value);

  const handleNext = () => {
    if (!selectedOption) return;
    const q = QUESTIONS[currentQ];
    const newAnswers = [
      ...answers,
      { questionId: q.id, value: selectedOption, category: q.category },
    ];
    setAnswers(newAnswers);
    setSelectedOption(null);
    if (currentQ + 1 < QUESTIONS.length) {
      setCurrentQ(currentQ + 1);
    } else {
      analyzeWithOllama(newAnswers);
    }
  };

  const handleBack = () => {
    if (currentQ === 0) { setStep("intro"); return; }
    setAnswers((prev) => prev.slice(0, -1));
    setCurrentQ((q) => q - 1);
    setSelectedOption(null);
  };

  // ── Build prompt ──
  const buildPrompt = (ans: Answer[]) => {
    const summary = ans
      .map((a) => {
        const q = QUESTIONS.find((q) => q.id === a.questionId);
        const opt = q?.options.find((o) => o.value === a.value);
        return `[${q?.category}] ${q?.text} → ${opt?.label}`;
      })
      .join("\n");

    return `คุณคือที่ปรึกษาการศึกษาของไทยสำหรับเด็กมัธยมปลายที่ยังไม่แน่ใจว่าตัวเองชอบอะไร

ผลการตอบแบบทดสอบค้นหาตัวเอง:
${summary}

วิเคราะห์รูปแบบความสนใจ ทักษะ และบุคลิกภาพจากคำตอบ แล้วแนะนำเส้นทางการศึกษา 3 ตัวเลือกที่เหมาะสมที่สุด

ตอบเป็น JSON array เท่านั้น ห้ามมีคำอธิบายนอก array:
[
  {
    "university": "ชื่อมหาวิทยาลัยในไทย",
    "faculty": "ชื่อคณะ",
    "major": "ชื่อสาขาวิชา",
    "reason": "อธิบายในภาษาที่เข้าใจง่าย ว่าทำไมเส้นทางนี้เหมาะกับเขา 2-3 ประโยค",
    "matchScore": 92,
    "careers": ["อาชีพที่ 1", "อาชีพที่ 2", "อาชีพที่ 3"]
  }
]

มหาวิทยาลัยที่ใช้: จุฬาลงกรณ์มหาวิทยาลัย, มหาวิทยาลัยธรรมศาสตร์, มหาวิทยาลัยมหิดล, KMUTT, มหาวิทยาลัยเกษตรศาสตร์, มหาวิทยาลัยศิลปากร, มหาวิทยาลัยเชียงใหม่, มหาวิทยาลัยขอนแก่น, มหาวิทยาลัยสงขลานครินทร์ ฯลฯ`;
  };

  // ── Call Ollama ──
  const analyzeWithOllama = async (ans: Answer[]) => {
    setStep("loading");
    setStreamText("");
    setError(null);
    abortRef.current = new AbortController();

    try {
      const response = await fetch(`${ollamaUrl}/api/generate`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        signal: abortRef.current.signal,
        body: JSON.stringify({
          model: ollamaModel,
          prompt: buildPrompt(ans),
          stream: true,
          options: { temperature: 0.3, num_predict: 1500 },
        }),
      });

      if (!response.ok) throw new Error(`Ollama ตอบกลับ: ${response.status}`);

      const reader = response.body!.getReader();
      const decoder = new TextDecoder();
      let full = "";

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;
        const lines = decoder.decode(value).split("\n").filter(Boolean);
        for (const line of lines) {
          try {
            const parsed = JSON.parse(line);
            if (parsed.response) {
              full += parsed.response;
              setStreamText(full);
            }
          } catch {}
        }
      }

      const jsonMatch = full.match(/\[[\s\S]*\]/);
      if (!jsonMatch) throw new Error("ไม่พบ JSON ในคำตอบ กรุณาลองอีกครั้ง");
      const parsed: Recommendation[] = JSON.parse(jsonMatch[0]);
      setRecommendations(parsed);
      setStep("result");
    } catch (err: any) {
      if (err.name === "AbortError") return;
      setError(
        err.message.includes("fetch")
          ? `เชื่อมต่อ Ollama ที่ ${ollamaUrl} ไม่ได้ — กรุณาตรวจสอบว่า Ollama กำลังรันอยู่และเปิด CORS แล้ว`
          : err.message
      );
      setStep("quiz");
    }
  };

  const restart = () => {
    setStep("intro");
    setCurrentQ(0);
    setAnswers([]);
    setSelectedOption(null);
    setRecommendations([]);
    setStreamText("");
    setError(null);
  };

  const NavComponent = mode === "login" ? Navlogin : Nav;

  return (
    <>
      <NavComponent />
      <div className="sdq-page">
        {mode === "no-login" ? (
          <NoLoginPrompt />
        ) : (
          <div className="sdq-container">
            {/* Settings */}
            <div className="sdq-settings-bar">
              <span className="sdq-settings-label">🦙 Ollama</span>
              <input
                className="sdq-settings-input"
                value={ollamaUrl}
                onChange={(e) => setOllamaUrl(e.target.value)}
                placeholder="http://localhost:11434"
              />
              <input
                className="sdq-settings-input sdq-settings-input--short"
                value={ollamaModel}
                onChange={(e) => setOllamaModel(e.target.value)}
                placeholder="llama3.2"
              />
            </div>

            {error && <div className="sdq-error">⚠️ {error}</div>}

            {step === "intro"   && <Intro onStart={() => setStep("quiz")} />}
            {step === "quiz"    && (
              <QuizStep
                question={QUESTIONS[currentQ]}
                questionIndex={currentQ}
                total={QUESTIONS.length}
                selected={selectedOption}
                onSelect={handleSelect}
                onNext={handleNext}
                onBack={handleBack}
              />
            )}
            {step === "loading" && <LoadingScreen streamText={streamText} model={ollamaModel} />}
            {step === "result"  && (
              <ResultScreen recommendations={recommendations} onRestart={restart} />
            )}
          </div>
        )}
      </div>
    </>
  );
};

// ============================================================
// SUB-COMPONENTS
// ============================================================

const NoLoginPrompt = () => (
  <div className="sdq-no-login">
    <div className="sdq-no-login__icon">🔒</div>
    <h2 className="sdq-no-login__title">กรุณาลงชื่อเข้าใช้</h2>
    <p className="sdq-no-login__sub">เพื่อเริ่มทำแบบทดสอบค้นหาตัวเองและรับคำแนะนำ</p>
  </div>
);

const Intro = ({ onStart }: { onStart: () => void }) => (
  <div className="sdq-card">
    <div className="sdq-intro__emoji">🌟</div>
    <h1 className="sdq-intro__title">ค้นพบตัวเอง<br />เลือกเส้นทางที่ใช่</h1>
    <p className="sdq-intro__sub">
      ไม่รู้ว่าตัวเองชอบอะไร? ไม่เป็นไรเลย!<br />
      ตอบคำถาม <strong>{QUESTIONS.length} ข้อ</strong> แล้วให้ AI ช่วยวิเคราะห์<br />
      มหาวิทยาลัยและสาขาที่เหมาะกับ<strong>ตัวหนู</strong>
    </p>
    <div className="sdq-intro__note">
      💡 <strong>เคล็ดลับ:</strong> ไม่มีคำตอบถูกหรือผิด ตอบตามความรู้สึกแรกที่สุด
      ไม่ต้องคิดว่าควรจะตอบอะไร แค่ตอบว่า "ตอนนี้เป็นยังไง"
    </div>
    <div className="sdq-feature-row">
      {["🧠 วิเคราะห์ด้วย AI", "🏛️ มหาวิทยาลัยไทย", "🎯 เส้นทางอาชีพ", "⚡ ผลทันที"].map((f) => (
        <span key={f} className="sdq-feature-pill">{f}</span>
      ))}
    </div>
    <button className="sdq-btn-primary" onClick={onStart}>
      เริ่มค้นหาตัวเอง →
    </button>
  </div>
);

const QuizStep = ({
  question, questionIndex, total, selected, onSelect, onNext, onBack,
}: {
  question: Question;
  questionIndex: number;
  total: number;
  selected: string | null;
  onSelect: (v: string) => void;
  onNext: () => void;
  onBack: () => void;
}) => {
  const progress = ((questionIndex + 1) / total) * 100;

  return (
    <div className="sdq-quiz-card">
      <button className="sdq-btn-back" onClick={onBack}>
        ← ย้อนกลับ
      </button>

      <div className="sdq-progress-row">
        <span className="sdq-progress-text">{questionIndex + 1} / {total}</span>
        <div className="sdq-progress-bar">
          <div className="sdq-progress-fill" style={{ width: `${progress}%` }} />
        </div>
      </div>

      <p className="sdq-category-badge">{getCategoryLabel(question.category)}</p>
      <div className="sdq-question-emoji">{question.emoji}</div>
      <h2 className="sdq-question-text">{question.text}</h2>
      {question.hint && <p className="sdq-hint">💭 {question.hint}</p>}

      <div className="sdq-option-grid">
        {question.options.map((opt) => (
          <button
            key={opt.value}
            className={`sdq-option-btn${selected === opt.value ? " sdq-option-btn--selected" : ""}`}
            onClick={() => onSelect(opt.value)}
          >
            <span className="sdq-option-emoji">{opt.emoji}</span>
            <span className={`sdq-option-dot${selected === opt.value ? " sdq-option-dot--selected" : ""}`} />
            {opt.label}
          </button>
        ))}
      </div>

      <button className="sdq-btn-primary" onClick={onNext} disabled={!selected}>
        {questionIndex + 1 === total ? "✨ วิเคราะห์ผลของหนู" : "ข้อถัดไป →"}
      </button>
    </div>
  );
};

const LoadingScreen = ({ streamText, model }: { streamText: string; model: string }) => {
  const steps = [
    "วิเคราะห์บุคลิกภาพและความถนัด...",
    "จับคู่กับเส้นทางการศึกษา...",
    "เลือกมหาวิทยาลัยที่เหมาะสม...",
    "เตรียมคำแนะนำสำหรับหนู...",
  ];
  const [activeStep, setActiveStep] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveStep((s) => (s + 1) % steps.length);
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="sdq-loading-card">
      <div className="sdq-spinner" />
      <h2 className="sdq-loading-title">AI กำลังวิเคราะห์ผลของหนู...</h2>
      <span className="sdq-loading-model">โมเดล: {model}</span>
      <div className="sdq-loading-steps">
        {steps.map((s, i) => (
          <div key={i} className="sdq-loading-step" style={{ opacity: i === activeStep ? 1 : 0.35 }}>
            <div className="sdq-loading-step__dot" />
            {s}
          </div>
        ))}
      </div>
      {streamText && (
        <div className="sdq-stream-box">
          <pre className="sdq-stream-pre">{streamText}</pre>
        </div>
      )}
    </div>
  );
};

const ResultScreen = ({
  recommendations,
  onRestart,
}: {
  recommendations: Recommendation[];
  onRestart: () => void;
}) => (
  <div className="sdq-result-wrapper">
    <div className="sdq-result-header">
      <h2 className="sdq-result-title">🎓 ผลการวิเคราะห์ของหนู</h2>
      <p className="sdq-result-sub">AI แนะนำเส้นทางที่เหมาะสมกับบุคลิกและความสนใจของหนู</p>
    </div>

    {recommendations.map((rec, i) => (
      <div key={i} className={`sdq-rec-card${i === 0 ? " sdq-rec-card--top" : ""}`}>
        {i === 0 && <div className="sdq-rec-card__badge">⭐ เหมาะสมที่สุด</div>}
        <div className="sdq-rec-header">
          <div className="sdq-rank-circle">{i + 1}</div>
          <div style={{ flex: 1 }}>
            <h3 className="sdq-rec-university">{rec.university}</h3>
            <p className="sdq-rec-faculty">{rec.faculty} · {rec.major}</p>
          </div>
          <div className="sdq-score-chip">{rec.matchScore}%</div>
        </div>
        <div className="sdq-match-bar-bg">
          <div className="sdq-match-bar-fill" style={{ width: `${rec.matchScore}%` }} />
        </div>
        <p className="sdq-rec-reason">{rec.reason}</p>
        {rec.careers && rec.careers.length > 0 && (
          <div className="sdq-rec-tags">
            <span className="sdq-tag" style={{ fontWeight: 700, color: "#6366f1" }}>อาชีพ:</span>
            {rec.careers.map((c, ci) => (
              <span key={ci} className="sdq-tag">{c}</span>
            ))}
          </div>
        )}
      </div>
    ))}

    <button className="sdq-btn-secondary" onClick={onRestart}>
      ↺ ทำแบบทดสอบใหม่อีกครั้ง
    </button>
  </div>
);

// ============================================================
// HELPERS
// ============================================================
const getCategoryLabel = (cat: string): string => {
  const map: Record<string, string> = {
    activity:   "กิจกรรมในชีวิตประจำวัน",
    reaction:   "ปฏิกิริยาต่อโลก",
    school:     "ชั่วโมงที่ชอบ",
    superpower: "พลังในฝัน",
    problem:    "วิธีช่วยเพื่อน",
    dream:      "ภาพอนาคต",
    energy:     "สิ่งที่ให้พลังงาน",
    worry:      "เรื่องที่ใส่ใจ",
  };
  return map[cat] ?? cat;
};

export default SelfDiscoveryQuiz;