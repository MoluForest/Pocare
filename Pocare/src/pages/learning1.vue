<template>
  <div class="lesson1-page">
    <!-- STEP 1：前言 -->
    <section v-if="currentStep === 1" class="section">
      <h1 class="section-title">Lesson 1：撲克牌起源介紹</h1>
      <div class="text-block">
        <!-- 這裡是前言，之後你自己換文字 -->
        <p>
          標準撲克牌總共有52張，撲克牌中的52張數字牌代表一年中的52個星期，四個花色象徵四季，每季13張牌對應13個星期。
          紅色代表白天，黑色代表夜晚。
          法國版本的撲克牌有四個花色，分別是紅心（heart）、方塊（diamond）、梅花（club）和黑桃（spade），是目前最流行的版本。
          每個花色都具有意義：
          紅心代表智慧與愛情，方塊代表財富，梅花象徵幸運，而黑桃則象徵和平。
        </p>
      </div>
      <div class="btn-row">
        <button class="btn" @click="speak('intro')">語音閱讀</button>
        <button class="btn primary" @click="goToStep(2)">繼續課程</button>
      </div>
    </section>

    <!-- STEP 2：認識花色 -->
    <section v-else-if="currentStep === 2" class="section">
      <h1 class="section-title">認識花色</h1>

      <div class="text-block">
        <p>
          撲克牌一共有四種花色，分別是黑桃、紅心、方塊與梅花。花色本身不代表牌的大小，而是用來區分牌的種類，在不同的撲克牌遊戲中，花色有時會影響出牌順序或勝負判定。黑桃與梅花屬於黑色花色，紅心與方塊則屬於紅色花色。認識並能快速分辨這四種花色，有助於理解遊戲規則，也能在實際遊戲中更快做出正確判斷，為後續的練習與遊戲打下良好的基礎。
        </p>
      </div>

      <div class="btn-row">
        <button class="btn" @click="speak('suits')">語音閱讀</button>
      </div>

      <!-- 四種花色圖片位置 -->
      <div class="suits-row">
        <div class="suit-card" v-for="suit in suits" :key="suit.id">
          <!-- 這裡只是圖片位子，你之後把 src 換成自己的圖 -->
          <div 
            class="suit-img-placeholder"
            :class="{
                red: suit.id === 'hearts' || suit.id === 'diamonds',
                black: suit.id === 'spades' || suit.id === 'clubs'
            }"
            >
            {{ suit.label }}
            </div>
          <p class="suit-name">{{ suit.name }}</p>
        </div>
      </div>

      <div class="btn-row">
        <button class="btn primary" @click="goToStep(3)">開始練習</button>
      </div>
    </section>

    <!-- STEP 3：配對小遊戲 -->
    <section v-else-if="currentStep === 3" class="section">
      <h1 class="section-title">練習一：花色配對</h1>
      <p class="hint">
        規則：點選兩張牌配對相同花色。<br />
        全部配對成功後，會自動進入下一關。<br />
      </p>

      <div class="cards-grid">
        <button
          v-for="(card, index) in cards"
          :key="card.id"
          class="card"
          :class="{
            flipped: isCardFlipped(index),
            matched: matchedIndices.includes(index)
          }"
          @click="handleCardClick(index)"
        >
          <span
            v-if="isCardFlipped(index) || matchedIndices.includes(index)"
            :class="getSuitColorClass(card.suitId)"
            >
            {{ card.symbol }}
            </span>
        </button>
      </div>
    </section>

    <!-- STEP 4：輸入花色名稱 -->
    <section v-else-if="currentStep === 4" class="section">
      <h1 class="section-title">練習二：輸入花色名稱</h1>
      <p class="hint">
        規則：依序會出現四種花色，請在輸入框中輸入正確名稱：黑桃、紅心、方塊、梅花。<br />
        任一題答錯，就會從頭重新開始。
      </p>

      <div class="quiz-box" v-if="currentQuizSuit">
        <div class="quiz-suit-display">
          <!-- 你可以改成用圖片顯示 -->
          <div
            class="quiz-symbol"
            v-if="currentQuizSuit"
            :class="getSuitColorClass(currentQuizSuit.id)"
            >
            {{ currentQuizSuit.label }}
            </div>
        </div>

        <div class="quiz-input-area">
          <label>請輸入花色名稱：</label>
          <input
            v-model="userAnswer"
            type="text"
            class="input"
            placeholder="例如：紅心"
            @keyup.enter="submitAnswer"
          />
        </div>

        <div class="btn-row">
          <button class="btn primary" @click="submitAnswer">送出答案</button>
        </div>

        <p class="progress-text">
          目前進度：{{ quizIndex + 1 }} / {{ quizOrder.length }}
        </p>
      </div>
    </section>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { watch } from 'vue'

const router = useRouter()

const getSuitColorClass = (suitId) => {
  if (suitId === 'hearts' || suitId === 'diamonds') return 'red'
  if (suitId === 'spades' || suitId === 'clubs') return 'black'
  return ''
}

// 1 = 前言, 2 = 認識花色, 3 = 配對遊戲, 4 = 輸入花色名稱
const currentStep = ref(1)
const goToStep = (step) => {
  currentStep.value = step
}

/* ---------- 語音閱讀 ---------- */

const speak = (type) => {
  if (typeof window === 'undefined' || !('speechSynthesis' in window)) {
    alert('此瀏覽器不支援語音朗讀功能。')
    return
  }

  let text = ''
  if (type === 'intro') {
    text = '標準撲克牌總共有52張，撲克牌中的52張數字牌代表一年中的52個星期，四個花色象徵四季，每季13張牌對應13個星期。紅色代表白天，黑色代表夜晚。法國版本的撲克牌有四個花色，分別是紅心、方塊、梅花和黑桃，是目前最流行的版本。每個花色都具有意義：紅心代表智慧與愛情，方塊代表財富，梅花象徵幸運，而黑桃則象徵和平。'
  } else if (type === 'suits') {
    text = '撲克牌一共有四種花色，分別是黑桃、紅心、方塊與梅花。花色本身不代表牌的大小，而是用來區分牌的種類，在不同的撲克牌遊戲中，花色有時會影響出牌順序或勝負判定。黑桃與梅花屬於黑色花色，紅心與方塊則屬於紅色花色。認識並能快速分辨這四種花色，有助於理解遊戲規則，也能在實際遊戲中更快做出正確判斷，為後續的練習與遊戲打下良好的基礎。'
  }

  if (!text) return

  const utter = new SpeechSynthesisUtterance(text)
  utter.lang = 'zh-TW'
  window.speechSynthesis.cancel()
  window.speechSynthesis.speak(utter)
}

/* ---------- 認識花色顯示區 ---------- */

const suits = [
  { id: 'spades', name: '黑桃', label: '♠'},
  { id: 'hearts', name: '紅心', label: '♥'},
  { id: 'diamonds', name: '方塊', label: '♦'},
  { id: 'clubs', name: '梅花', label: '♣'}
]

/* ---------- 配對小遊戲（STEP 3） ---------- */

const cards = ref([]) // 8 張牌（每個花色 2 張）
const selectedIndices = ref([]) // 目前翻開中的 index（最多 2）
const matchedIndices = ref([]) // 已成功配對的 index

const initCards = () => {
  const temp = []
  let idCounter = 1
  for (const s of suits) {
    // 每個花色 2 張牌
    temp.push({ id: idCounter++, suitId: s.id, symbol: s.label })
    temp.push({ id: idCounter++, suitId: s.id, symbol: s.label })
  }
  // 洗牌
  cards.value = temp.sort(() => Math.random() - 0.5)
  selectedIndices.value = []
  matchedIndices.value = []
}

// 一開始先初始化一次
onMounted(() => {
  initCards()
})

// 判斷該卡片是否被翻開
const isCardFlipped = (index) => {
  return selectedIndices.value.includes(index)
}

const handleCardClick = (index) => {
  // 已經配對成功或已翻開中的卡片就不能再點
  if (matchedIndices.value.includes(index) || selectedIndices.value.includes(index)) return

  // 最多同時翻兩張
  if (selectedIndices.value.length < 2) {
    selectedIndices.value.push(index)
  }

  // 當翻到兩張時，檢查是否配對
  if (selectedIndices.value.length === 2) {
    const [i1, i2] = selectedIndices.value
    const c1 = cards.value[i1]
    const c2 = cards.value[i2]

    if (c1.suitId === c2.suitId) {
      // ✅ 配對成功：把這兩張加入 matched，保持翻開
      matchedIndices.value.push(i1, i2)
      selectedIndices.value = []

      // 全部配對成功 → 進入下一關
      if (matchedIndices.value.length === cards.value.length) {
        setTimeout(() => {
          goToStep(4)
        }, 500)
      }
    } else {
      // ❌ 配對錯誤：稍微停一下，然後把這兩張翻回背面
      setTimeout(() => {
        //alert('配對錯誤，請再試一次。')
        selectedIndices.value = []   // 只清除目前翻錯的兩張
      }, 600)
    }
  }
}


/* ---------- 花色名稱輸入題（STEP 4） ---------- */

const quizOrder = ref([]) // 花色出題順序（裝的是 suit 的 id）
const quizIndex = ref(0) // 現在出到第幾題
const userAnswer = ref('')

const initQuiz = () => {
  // 取 suits 的 id，打亂順序，確保不重複
  const ids = suits.map((s) => s.id).sort(() => Math.random() - 0.5)
  quizOrder.value = ids
  quizIndex.value = 0
  userAnswer.value = ''
}

// currentQuizSuit：計算當前要顯示的花色
const currentQuizSuit = computed(() => {
  const id = quizOrder.value[quizIndex.value]
  return suits.find((s) => s.id === id) || null
})

// 提交答案
const submitAnswer = () => {
  if (!currentQuizSuit.value) return

  const correctName = currentQuizSuit.value.name.trim()
  const input = userAnswer.value.trim()

  if (input === correctName) {
    // 答對 → 換下一題
    if (quizIndex.value < quizOrder.value.length - 1) {
      quizIndex.value++
      userAnswer.value = ''
    } else {
      // 全部答對 → 解鎖第二關並回到 /learning
      alert('恭喜完成 Lesson 1！將為你解鎖下一關。')
      localStorage.setItem('pocare-unlocked-level', '2')
      router.push('/learning')
    }
  } else {
    // 答錯 → 全部重來
    alert('答案錯誤，將從第一題重新開始。')
    initQuiz()
  }
}

// 進入 STEP 4 時要初始化題目
watchStepToInitQuiz()

function watchStepToInitQuiz() {
  // 監看 currentStep，當變成 4 時初始化 quiz
  // 在 <script setup> 中，可以用 watch
  const step = currentStep
  
  watch(
    step,
    (newVal) => {
      if (newVal === 4) {
        initQuiz()
      }
    },
    { immediate: false }
  )
}
</script>

<style scoped>
.lesson1-page {
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
}

.text-block p {
  font-size: 18px;
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

/* 認識花色區塊 */
.suits-row {
  display: flex;
  gap: 24px;
  margin-top: 24px;
  margin-bottom: 24px;
}

.suit-card {
  flex: 1;
  text-align: center;
}

.suit-img-placeholder {
  width: 100%;
  height: 160px;
  background: #dcdcdc;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 32px;
}

.suit-name {
  margin-top: 8px;
  font-size: 18px;
}

/* 配對小遊戲 */
.hint {
  margin-bottom: 24px;
  font-size: 16px;
  line-height: 1.5;
}

.cards-grid {
  display: grid;
  grid-template-columns: repeat(4, 120px);
  gap: 16px;
  justify-content: center;
}

.card {
  width: 120px;
  height: 160px;
  background: #dcdcdc;
  border: none;
  cursor: pointer;
  font-size: 32px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.card.flipped,
.card.matched {
  background: white;
}

/* 花色輸入練習 */
.quiz-box {
  margin-top: 24px;
}

.quiz-suit-display {
  margin-bottom: 16px;
}

.quiz-symbol {
  width: 120px;
  height: 120px;
  background: #dcdcdc;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 48px;
}

.quiz-input-area {
  margin-bottom: 16px;
}

.input {
  padding: 8px 12px;
  font-size: 18px;
  margin-top: 8px;
  width: 260px;
}

.progress-text {
  margin-top: 8px;
  font-size: 14px;
  color: #555;
}

.red {
  color: #e53935;  /* 紅心、方塊 */
}

.black {
  color: #000000;  /* 黑桃、梅花 */
}
</style>
