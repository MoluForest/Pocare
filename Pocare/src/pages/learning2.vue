<template>
  <div class="lesson2-page">
    <!-- STEP 1：前言 -->
    <section v-if="currentStep === 1" class="section">
      <h1 class="section-title">Lesson 2：認識撲克牌數字</h1>

      <div class="text-block">
        <p>
          撲克牌的每一張牌，除了花色之外，還包含數字或字母，用來表示牌的點數。一般撲克牌的點數從 1 到 13，其中 1 通常以 A（Ace）表示，而 11、12、13
          則分別以 J、Q、K 表示。其餘的數字牌則直接以 2 到 10 顯示。在不同的撲克牌遊戲中，數字的大小可能代表出牌的順序、比較勝負的依據，或用來判斷是否符合特定規則。了解數字與字母之間的對應關係，有助於學習者快速辨認牌面，也能在遊戲進行中更快做出正確判斷。
        </p>
      </div>

      <div class="btn-row">
        <button class="btn" @click="speak('intro')">語音閱讀</button>
        <button class="btn primary" @click="goToStep(2)">進入練習</button>
      </div>
    </section>

    <!-- STEP 2：練習一說明 + 連連看 -->
    <section v-else-if="currentStep === 2" class="section">
      <h1 class="section-title">練習一：A J Q K 分別代表的數字？</h1>

      <div class="text-block">
        <p>
          A 代表 1、J 代表 11、Q 代表 12、K 代表 13。
          <br />接下來的連連看練習，請你觀察左側的英文字母牌，並將它與右側正確的數字配對。
          <br />透過配對操作，你可以更快建立字母與數字之間的連結。
        </p>
      </div>

      <div class="btn-row">
        <button class="btn" @click="speak('match')">語音閱讀</button>
      </div>

      <div class="match-area">
        <!-- 左邊：牌面 A / J / Q / K -->
        <div class="match-column">
          <h2>牌面</h2>
          <button
            v-for="rank in ranks"
            :key="rank.id"
            class="match-item"
            :class="{
              selected: selectedRank && selectedRank.id === rank.id,
              matched: isRankMatched(rank.id)
            }"
            @click="selectRank(rank)"
          >
            {{ rank.label }}
          </button>
        </div>

        <!-- 右邊：數字 1 / 11 / 12 / 13（隨機排列） -->
        <div class="match-column">
          <h2>數字</h2>
          <button
            v-for="num in numbersRight"
            :key="num"
            class="match-item"
            :class="{
              selected: selectedNumber === num,
              matched: isNumberMatched(num)
            }"
            @click="selectNumber(num)"
          >
            {{ num }}
          </button>
        </div>
      </div>
    </section>

    <!-- STEP 3：練習二：卡牌加減 -->
    <section v-else-if="currentStep === 3" class="section">
      <h1 class="section-title">練習二：卡牌加減</h1>

      <div class="text-block">
        <p>
          撲克牌的臉牌也可以當作數字來計算：A 代表 1、J 代表 11、Q 代表 12、K 代表 13。<br/>
          本關題目會像「Q + 3」或「K - A」等，請把它們換成數字後，輸入最後計算的結果。<br/>
        </p>
      </div>

      <div class="btn-row">
        <button class="btn" @click="speak('calc')">語音閱讀</button>
      </div>

      <div class="quiz-calc-box">
        <p class="question-text">
          題目：<strong>{{ currentQuestion.text }}</strong>
        </p>

        <div class="quiz-input-area">
          <label>請輸入答案：</label>
          <input
            v-model="userAnswer"
            type="number"
            class="input"
            @keyup.enter="submitCalcAnswer"
          />
        </div>

        <div class="btn-row">
          <button class="btn primary" @click="submitCalcAnswer">送出答案</button>
        </div>

        <p class="progress-text">
          目前進度：{{ correctCount }} / {{ totalQuestions }}
        </p>
      </div>
    </section>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()

const currentStep = ref(1)
const goToStep = (step) => {
  currentStep.value = step

  // 進入「練習二：卡牌加減」時，初始化題目
  if (step === 3) {
    correctCount.value = 0
    generateQuestion()
  }
}

/* ---------- 語音閱讀 ---------- */

const speak = (type) => {
  if (typeof window === 'undefined' || !('speechSynthesis' in window)) {
    alert('此瀏覽器不支援語音朗讀功能。')
    return
  }

  let text = ''
  if (type === 'intro') {
    text =
      '撲克牌的每一張牌，除了花色之外，還包含數字或字母，用來表示牌的點數。一般撲克牌的點數從一到十三，其中一通常以 A 表示，而十一、十二、十三則分別以 J、Q、K 表示。其餘的數字牌則直接以二到十顯示。了解數字與字母之間的對應關係，有助於快速辨認牌面，也能在遊戲中更快做出判斷。'
  } else if (type === 'match') {
    text =
      'A 代表 1、J 代表 11、Q 代表 12、K 代表 13。請把左邊的英文字母牌，和右邊正確的數字配對。'
  } else if (type === 'calc') {
    text =
      '撲克牌的臉牌也可以當作數字來計算：A 代表 1、J 代表 11、Q 代表 12、K 代表 13。本關題目會像「Q 加 3」或「K 減 A」等，請把它們換成數字後，輸入最後計算的結果。'
  }

  if (!text) return

  const utter = new SpeechSynthesisUtterance(text)
  utter.lang = 'zh-TW'
  window.speechSynthesis.cancel()
  window.speechSynthesis.speak(utter)
}

/* ---------- 資料：AJQK 與數字 ---------- */

const ranks = [
  { id: 'A', label: 'A', value: 1 },
  { id: 'J', label: 'J', value: 11 },
  { id: 'Q', label: 'Q', value: 12 },
  { id: 'K', label: 'K', value: 13 }
]

const numberValues = [1, 11, 12, 13]

/* ---------- 練習一：連連看 AJQK = 幾 ---------- */

const numbersRight = ref([...numberValues].sort(() => Math.random() - 0.5)) // 右邊數字隨機排序

const selectedRank = ref(null)
const selectedNumber = ref(null)
const matchedPairs = ref([]) // { rankId, number }

/** 左邊是否已配對成功 */
const isRankMatched = (rankId) => matchedPairs.value.some((p) => p.rankId === rankId)

/** 右邊數字是否已配對成功 */
const isNumberMatched = (num) => matchedPairs.value.some((p) => p.number === num)

const selectRank = (rank) => {
  if (isRankMatched(rank.id)) return
  selectedRank.value = rank
  tryMatch()
}

const selectNumber = (num) => {
  if (isNumberMatched(num)) return
  selectedNumber.value = num
  tryMatch()
}

const tryMatch = () => {
  if (!selectedRank.value || selectedNumber.value === null) return

  const correctValue = selectedRank.value.value

  if (correctValue === selectedNumber.value) {
    matchedPairs.value.push({
      rankId: selectedRank.value.id,
      number: selectedNumber.value
    })

    if (matchedPairs.value.length === ranks.length) {
      setTimeout(() => {
        alert('練習一完成！接下來進入卡牌加減練習。')
        goToStep(3)
      }, 300)
    }
  } else {
    alert('配對錯誤，請再試一次。')
  }

  selectedRank.value = null
  selectedNumber.value = null
}

/* ---------- 練習二：卡牌加減（你指定的新規則） ---------- */

const totalQuestions = 5
const correctCount = ref(0)

const currentQuestion = ref({
  text: '',
  answer: 0
})

const userAnswer = ref('')

// 左邊（被加數/被減數）一定是 AJQK
const leftPool = [...ranks]

// 右邊（加數/減數）是 AJQK 或 1~5
const rightPool = [
  ...ranks,
  { id: '1', label: '1', value: 1 },
  { id: '2', label: '2', value: 2 },
  { id: '3', label: '3', value: 3 },
  { id: '4', label: '4', value: 4 },
  { id: '5', label: '5', value: 5 }
]

const pickFrom = (pool) => pool[Math.floor(Math.random() * pool.length)]

/**
 * 產生一題新的加減題
 * 規則：
 * - 左邊：AJQK
 * - 右邊：AJQK 或 1~5
 * - 答案不可為負數（>=0）
 * - 答案可超過 13（不限制上限）
 */
const generateQuestion = () => {
  const ops = ['+', '-']

  for (let i = 0; i < 300; i++) {
    const left = pickFrom(leftPool)
    const right = pickFrom(rightPool)
    const op = ops[Math.floor(Math.random() * ops.length)]

    const answer = op === '+' ? left.value + right.value : left.value - right.value

    // 不要負數：允許 0（若你也不想要 0，把 >=0 改成 >=1）
    if (answer >= 0) {
      currentQuestion.value = {
        text: `${left.label} ${op} ${right.label}`,
        answer
      }
      userAnswer.value = ''
      return
    }
  }

  // 理論上很少會走到這裡（保底）
  currentQuestion.value = { text: 'A + 1', answer: 2 }
  userAnswer.value = ''
}

const submitCalcAnswer = () => {
  if (!currentQuestion.value) return

  const val = Number(userAnswer.value)
  if (Number.isNaN(val)) {
    alert('請輸入數字答案。')
    return
  }

  if (val === currentQuestion.value.answer) {
    correctCount.value++

    if (correctCount.value >= totalQuestions) {
      alert('恭喜你完成 Lesson 2！將為你解鎖第三關。')
      localStorage.setItem('pocare-unlocked-level', '3')
      router.push('/learning')
    } else {
      alert('答對了！繼續下一題。')
      generateQuestion()
    }
  } else {
    alert('答案不正確，本關將從第一題重新開始。')
    correctCount.value = 0
    generateQuestion()
  }
}
</script>

<style scoped>
.lesson2-page {
  width: 90%;
  margin: 0 auto;
  padding: 40px 0 80px;
  font-family: system-ui, sans-serif;
}

.section {
  max-width: 900px;
  margin: 0 auto;
}

.section-title {
  font-size: 28px;
  margin-bottom: 20px;
}

.text-block {
  padding: 16px;
  border-radius: 8px;
  background: rgba(255, 255, 255, 0.6);
  margin-bottom: 24px;
  line-height: 1.6;
}

.btn-row {
  display: flex;
  gap: 16px;
  margin-top: 8px;
  margin-bottom: 24px;
}

.btn {
  padding: 10px 20px;
  font-size: 16px;
  border: 1px solid #333;
  background: #f0f0f0;
  cursor: pointer;
}

.btn.primary {
  background: #ffd54f;
}

.btn:hover {
  filter: brightness(0.95);
}

.hint {
  margin-top: 12px;
  font-size: 14px;
  color: #555;
}

/* 連連看區塊 */
.match-area {
  display: flex;
  justify-content: center;
  gap: 60px;
  margin-top: 24px;
}

.match-column h2 {
  font-size: 20px;
  margin-bottom: 12px;
}

.match-item {
  display: block;
  width: 120px;
  padding: 10px 0;
  margin-bottom: 10px;
  font-size: 20px;
  text-align: center;
  border: 1px solid #333;
  background: #ffffff;
  cursor: pointer;
  transition: 0.15s ease;
}

.match-item.selected {
  background: #ffe082;
}

.match-item.matched {
  background: #c8e6c9;
  cursor: default;
}

/* 加減題區塊 */
.quiz-calc-box {
  margin-top: 24px;
}

.question-text {
  font-size: 20px;
  margin-bottom: 16px;
}

.quiz-input-area {
  margin-bottom: 16px;
}

.input {
  padding: 8px 12px;
  font-size: 18px;
  margin-top: 8px;
  width: 160px;
}

.progress-text {
  font-size: 14px;
  color: #555;
}
</style>
