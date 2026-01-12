import { useState } from "react";

type Choice = {
  text: string;
  value: number;
};

type Question = {
  id: number;
  question: string;
  choices: Choice[];
};

const questions: Question[] = [
  {
    id: 1,
    question: "เมื่อมีเวลาว่าง คุณมักจะเลือกทำอะไร?",
    choices: [
      { text: "อ่านหนังสือ / เรียนรู้อะไรใหม่", value: 3 },
      { text: "พักผ่อน ดูหนัง ฟังเพลง", value: 2 },
      { text: "ออกไปพบเพื่อน หรือทำกิจกรรม", value: 1 },
    ],
  },
  {
    id: 2,
    question: "คุณมองอนาคตของตัวเองแบบไหน?",
    choices: [
      { text: "อยากมีอาชีพที่มั่นคง", value: 1 },
      { text: "อยากทำสิ่งที่รัก แม้จะเสี่ยง", value: 3 },
      { text: "อยากสร้างสมดุลระหว่างงานและชีวิต", value: 2 },
    ],
  },
  {
    id: 3,
    question: "เมื่อเจอปัญหายาก ๆ คุณมักจะ...",
    choices: [
      { text: "วิเคราะห์อย่างเป็นเหตุเป็นผล", value: 3 },
      { text: "ปรึกษาคนรอบข้าง", value: 2 },
      { text: "เชื่อสัญชาตญาณของตัวเอง", value: 1 },
    ],
  },
];

const SelfDiscoveryQuiz = () => {
  const [answers, setAnswers] = useState<Record<number, number>>({});
  const [showResult, setShowResult] = useState(false);

  const handleSelect = (questionId: number, value: number) => {
    setAnswers((prev) => ({ ...prev, [questionId]: value }));
  };

  const totalScore = Object.values(answers).reduce(
    (sum, val) => sum + val,
    0
  );

  const getResultText = () => {
    if (totalScore >= 8) {
      return "คุณเป็นคนที่รักการเรียนรู้และการพัฒนาตัวเอง เหมาะกับเส้นทางที่ต้องใช้ความคิดสร้างสรรค์และอิสระ";
    }
    if (totalScore >= 5) {
      return "คุณให้ความสำคัญกับความสมดุล เหมาะกับงานที่ยืดหยุ่นและเติบโตได้ในระยะยาว";
    }
    return "คุณให้ความสำคัญกับความมั่นคง เหมาะกับเส้นทางที่มีโครงสร้างชัดเจน";
  };

  return (
    <div style={styles.container}>
      <h1 style={styles.title}>แบบทดสอบค้นหาตัวตน</h1>
      <p style={styles.subtitle}>
        สำรวจตัวเองเพื่อค้นหาแนวทางอนาคตที่เหมาะกับคุณ
      </p>

      {!showResult && (
        <div style={styles.quizBox}>
          {questions.map((q) => (
            <div key={q.id} style={styles.questionBox}>
              <h3>{q.question}</h3>
              {q.choices.map((c, i) => (
                <label key={i} style={styles.choice}>
                  <input
                    type="radio"
                    name={`question-${q.id}`}
                    checked={answers[q.id] === c.value}
                    onChange={() => handleSelect(q.id, c.value)}
                  />
                  {c.text}
                </label>
              ))}
            </div>
          ))}

          <button
            style={styles.button}
            disabled={Object.keys(answers).length !== questions.length}
            onClick={() => setShowResult(true)}
          >
            ดูผลลัพธ์
          </button>
        </div>
      )}

      {showResult && (
        <div style={styles.resultBox}>
          <h2>ผลลัพธ์ของคุณ</h2>
          <p>{getResultText()}</p>
          <button
            style={styles.secondaryButton}
            onClick={() => {
              setAnswers({});
              setShowResult(false);
            }}
          >
            ทำแบบทดสอบอีกครั้ง
          </button>
        </div>
      )}
    </div>
  );
};

export default SelfDiscoveryQuiz;

const styles: Record<string, React.CSSProperties> = {
  container: {
    maxWidth: 700,
    margin: "0 auto",
    padding: "40px 20px",
    fontFamily: "sans-serif",
  },
  title: { textAlign: "center" },
  subtitle: {
    textAlign: "center",
    color: "#555",
    marginBottom: 30,
  },
  quizBox: {
    background: "#f9f9f9",
    padding: 20,
    borderRadius: 12,
  },
  questionBox: { marginBottom: 25 },
  choice: {
    display: "block",
    marginTop: 8,
    cursor: "pointer",
  },
  button: {
    width: "100%",
    padding: 12,
    borderRadius: 8,
    border: "none",
    background: "#4f46e5",
    color: "#fff",
    fontSize: 16,
    cursor: "pointer",
  },
  secondaryButton: {
    marginTop: 20,
    padding: "10px 16px",
    borderRadius: 8,
    border: "1px solid #ccc",
    background: "#fff",
    cursor: "pointer",
  },
  resultBox: {
    background: "#eef2ff",
    padding: 30,
    borderRadius: 12,
    textAlign: "center",
  },
};
