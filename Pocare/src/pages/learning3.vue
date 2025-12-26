<template>
  <div class="lesson3-page">
    <!-- STEP 1：由來說明 -->
    <section v-if="currentStep === 1" class="section">
      <h1 class="section-title">Lesson 3：認識撲克牌遊戲「心臟病」</h1>

      <div class="text-block">
        <p>
          心臟病是一種源自西方的撲克牌遊戲，英文常被稱為 Slap Jack 或 Egyptian Ratscrew，後來在不同地區流傳並發展出多種玩法。在華語圈中，因為遊戲過程節奏快速、容易讓人緊張、心跳加速，逐漸被稱為「心臟病」。這個遊戲常出現在朋友聚會或家庭活動中，不需要複雜的計分方式，也不需要高深的策略，新手只要理解基本概念就能參與。正因如此，心臟病成為許多人接觸撲克牌遊戲的起點之一。
        </p>
      </div>

      <div class="btn-row">
        <button class="btn" @click="speak('origin')">語音說明由來</button>
        <button class="btn primary" @click="goToStep(2)">進入規則說明</button>
      </div>
    </section>

    <!-- STEP 2：規則說明 -->
    <section v-else-if="currentStep === 2" class="section">
      <h1 class="section-title">心臟病的玩法與規則</h1>

      <div class="text-block">
        <p>
          心臟病是一種以反應速度與專注力為核心的撲克牌遊戲。
          <br>遊戲開始前，將撲克牌平均發給所有玩家，每位玩家將自己的牌蓋著放在面前，不可以偷看。</br>
          <br>遊戲進行時，玩家依照順序輪流翻開一張牌，並同時從1開始依序喊出數字，一路數到 13，再重新從 1 開始循環。</br>
          <br>當「喊出的數字」與「翻開的牌面數字」相同時，所有玩家都必須立刻做出反應，通常是拍桌面或牌堆。</br>
          <br>如果有玩家誤拍或是反應最慢時，依照遊戲約定接受懲罰，例如拿走牌堆或增加手牌數量。</br>
          <br>遊戲會持續進行，直到有玩家將手中的牌全部出完，或達到事先約定的結束條件為止。</br>
        </p>
      </div>

      <div class="btn-row">
        <button class="btn" @click="speak('rules')">語音說明規則</button>
        <button class="btn primary" @click="goToStep(3)">進入練習</button>
      </div>
    </section>

    <!-- STEP 3：規則選擇題練習 -->
    <section v-else-if="currentStep === 3" class="section">
      <h1 class="section-title">練習一：心臟病規則小測驗</h1>

      <div class="text-block">
        <p>
          以下是關於心臟病規則的單選題。
          需要連續答對 {{ requiredCorrect }} 題才能通過，答錯將重新計算。
        </p>
      </div>

      <div class="quiz-box">
        <p class="question-title">題目：{{ currentQuestion.question }}</p>

        <div class="options">
          <button
            v-for="(opt, idx) in currentQuestion.options"
            :key="idx"
            class="option-btn"
            :class="{ selected: selectedOption === idx }"
            @click="selectedOption = idx"
          >
            {{ String.fromCharCode(65 + idx) }}. {{ opt }}
          </button>
        </div>

        <div class="btn-row">
          <button class="btn primary" @click="submitRuleAnswer">送出答案</button>
        </div>

        <p class="progress-text">目前連續答對：{{ correctCount }}/{{ requiredCorrect }}</p>
      </div>
    </section>

    <!-- STEP 4：心臟病模擬 -->
    <section v-else-if="currentStep === 4" class="section">
      <h1 class="section-title">練習二：心臟病模擬練習</h1>

      <div class="text-block">
        <p>
          系統會依序喊出 1 到 13，同時翻出一張牌面。
          當喊出的數字與牌面相同時，你必須在下一次換牌前按下空白鍵。
          <br>連續按對 {{ requiredHits }} 次才算通關，只要按錯或漏按一次，就會重新開始。</br>
        </p>
      </div>

      <div class="simulate-box">
        <div class="status-row">
          <div>已成功次數：<strong>{{ hitCount }}/{{ requiredHits }}</strong></div>
        </div>

        <div class="card-area">
          <div class="card-display">
            <!-- ✅ 牌面改圖片 -->
            <img
              v-if="currentCard"
              :src="currentCard.img"
              :alt="`${currentCard.rankLabel}${currentCard.suit}`"
              class="card-img"
              @error="onCardImgError"
            />
            <div v-else class="card-fallback">-</div>
          </div>
        </div>
        <div class="btn-row">
          <button class="btn primary" @click="startGame" :disabled="gameRunning">
            {{ gameRunning ? '遊戲進行中...' : '開始模擬練習' }}
          </button>
          <button class="btn" @click="resetGame">重新開始</button>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()

/* ---------- 共用 Step 流程 ---------- */
const currentStep = ref(1)
const goToStep = (step) => {
  currentStep.value = step

  if (step === 3) {
    correctCount.value = 0
    initQuizRound()
  }

  if (step === 4) {
    resetGame()
  }
}

/* ---------- 語音說明（由來 / 規則） ---------- */
const speak = (type) => {
  if (typeof window === 'undefined' || !('speechSynthesis' in window)) {
    alert('此瀏覽器不支援語音朗讀功能。')
    return
  }

  let text = ''
  if (type === 'origin') {
    text =
      '心臟病是一種源自西方的撲克牌遊戲，英文常被稱為 Slap Jack 或 Egyptian Ratscrew，後來在不同地區流傳並發展出多種玩法。在華語圈中，因為遊戲過程節奏快速、容易讓人緊張、心跳加速，逐漸被稱為「心臟病」。這個遊戲常出現在朋友聚會或家庭活動中，不需要複雜的計分方式，也不需要高深的策略，新手只要理解基本概念就能參與。正因如此，心臟病成為許多人接觸撲克牌遊戲的起點之一。'
  } else if (type === 'rules') {
    text =
      '心臟病是一種以反應速度與專注力為核心的撲克牌遊戲。遊戲開始前，將撲克牌平均發給所有玩家，每位玩家將自己的牌蓋著放在面前，不可以偷看。遊戲進行時，玩家依照順序輪流翻開一張牌，並同時從一開始依序喊出數字，一路數到十三，再重新從一開始循環。當「喊出的數字」與「翻開的牌面數字」相同時，所有玩家都必須立刻做出反應，通常是拍桌面或牌堆。如果有玩家誤拍或是反應最慢時，依照遊戲約定接受懲罰，例如拿走牌堆或增加手牌數量。遊戲會持續進行，直到有玩家將手中的牌全部出完，或達到事先約定的結束條件為止。'
  }

  if (!text) return
  const utter = new SpeechSynthesisUtterance(text)
  utter.lang = 'zh-TW'
  window.speechSynthesis.cancel()
  window.speechSynthesis.speak(utter)
}

/* ---------- 練習一：規則選擇題 ---------- */
const ruleQuestions = [
  {
    question: '在心臟病遊戲中，在什麼情況下，所有玩家需要立刻做出反應？',
    options: [
      '喊出的數字與翻開的牌面數字相同時',
      '每翻三張牌時',
      '有玩家心臟病發時',
      '出完手牌時'
    ],
    correctIndex: 0
  },
  {
    question: '如果在心臟病遊戲中，若玩家在不正確的時機拍牌，或反應最慢，通常會發生什麼事？',
    options: [
      '現場心臟病發',
      '依照約定接受懲罰，例如拿走牌堆或增加手牌',
      '遊戲結束，該玩家勝利',
      '得到糖尿病'
    ],
    correctIndex: 1
  },
  {
    question: '心臟病這個遊戲名稱最常被解釋的原因是什麼？',
    options: [
      '需要用到很多紅心牌',
      '玩法起源和醫學生之間流傳的笑話有關',
      '遊戲發明者，因心臟病離世',
      '遊戲節奏緊張，會讓人心跳加速'
    ],
    correctIndex: 3
  },
  {
    question: '以下哪一項「最接近」心臟病遊戲的特性？',
    options: [
      '遊戲流程非常緩慢，每回合要計算牌面、推理很多策略',
      '考驗大家的舞蹈技巧',
      '考驗反應速度與專注力，需要在正確時機拍牌',
      '大家輪流利用抽到的牌面講與醫學相關的故事'
    ],
    correctIndex: 2
  },
  {
    question: '在心臟病遊戲開始前，玩家對自己的手牌應該怎麼做？',
    options: [
      '將牌攤開放在桌上，讓所有玩家過目',
      '堆成金字塔',
      '依照花色、數字排序後開始',
      '將牌面朝下蓋著，不可以偷看'
    ],
    correctIndex: 3
  },
  {
    question: '遊戲進行時，玩家在翻牌時應該如何喊數字？',
    options: [
      '從 1 開始喊到 13，再重新從 1 開始',
      '按照翻開的牌面喊',
      '不喊數字，大家自己在心中默數',
      '隨意選一個數字開始喊'
    ],
    correctIndex: 0
  }
]

const requiredCorrect = 5
const correctCount = ref(0)

const currentQuestion = ref(ruleQuestions[0])
const selectedOption = ref(null)

// 題目序列：隨機洗牌後依序出題（本輪不重複）
const questionOrder = ref([])
const questionCursor = ref(0)

const initQuizRound = () => {
  // 產生 0..n-1 的索引並洗牌
  questionOrder.value = [...Array(ruleQuestions.length).keys()].sort(() => Math.random() - 0.5)
  questionCursor.value = 0
  currentQuestion.value = ruleQuestions[questionOrder.value[0]]
  selectedOption.value = null
}

// 進下一題（同一輪不重複）
const nextQuestionNoRepeat = () => {
  questionCursor.value++

  // 正常情況：你需要答對 5 題，而題庫也是 5 題，所以不會用到「超出題庫」這段
  // 但保險起見：如果真的超出，就再洗一次
  if (questionCursor.value >= questionOrder.value.length) {
    initQuizRound()
    return
  }

  currentQuestion.value = ruleQuestions[questionOrder.value[questionCursor.value]]
  selectedOption.value = null
}


const submitRuleAnswer = () => {
  if (selectedOption.value === null) {
    alert('請先選擇一個答案。')
    return
  }

  const isCorrect = selectedOption.value === currentQuestion.value.correctIndex

  if (isCorrect) {
    correctCount.value++

    if (correctCount.value >= requiredCorrect) {
      alert('你已連續答對五題，可進入心臟病模擬練習。')
      goToStep(4)
      return
    }

    alert('答對了！繼續下一題。')
    nextQuestionNoRepeat()
  } else {
    alert('這題答錯了，答對題數將重新計算。再試一次！')
    correctCount.value = 0
    initQuizRound()
  }
}

/* ---------- 練習二：心臟病模擬（52張牌 + 圖片牌面 + 隨機快慢） ---------- */

// 牌花色代碼：S 黑桃、H 紅心、D 方塊、C 梅花
const suits = ['S', 'H', 'D', 'C']

// 點數標籤（用於圖片檔名）
const toRankLabel = (n) => {
  if (n === 1) return 'A'
  if (n === 11) return 'J'
  if (n === 12) return 'Q'
  if (n === 13) return 'K'
  return String(n)
}

// ✅ 語音喊牌：固定只喊 1~13（不要 A/J/Q/K）
const speakRank = (n) => {
  if (typeof window === 'undefined' || !('speechSynthesis' in window)) return
  const utter = new SpeechSynthesisUtterance(String(n))
  utter.lang = 'zh-TW'
  window.speechSynthesis.cancel()
  window.speechSynthesis.speak(utter)
}

// 52張牌（物件：rank 1~13 + suit + img 路徑）
const deck = ref([])
const deckIndex = ref(0)

const buildDeck = () => {
  const arr = []
  for (let rank = 1; rank <= 13; rank++) {
    const rankLabel = toRankLabel(rank)
    for (const suit of suits) {
      arr.push({
        rank,
        rankLabel,
        suit,
        img: `/cards/${rankLabel}_${suit}.png`
      })
    }
  }
  return arr
}

const shuffleDeck = (arr) => {
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[arr[i], arr[j]] = [arr[j], arr[i]]
  }
  return arr
}

const initDeck = () => {
  deck.value = shuffleDeck(buildDeck())
  deckIndex.value = 0
}

const drawCard = () => {
  if (deckIndex.value >= deck.value.length) initDeck()
  return deck.value[deckIndex.value++]
}

// 隨機快慢
const minDelay = 900
const maxDelay = 2200
const randomDelay = () =>
  Math.floor(Math.random() * (maxDelay - minDelay + 1)) + minDelay

const requiredHits = 5
const currentCall = ref(1)
const currentCard = ref(null)
const hitCount = ref(0)
const gameRunning = ref(false)

const shouldPress = ref(false)
const pressedThisTurn = ref(false)

let timerId = null

const stopGame = () => {
  gameRunning.value = false
  if (timerId) {
    clearTimeout(timerId)
    timerId = null
  }
}

const resetGame = () => {
  stopGame()
  hitCount.value = 0
  currentCall.value = 0
  currentCard.value = null
  shouldPress.value = false
  pressedThisTurn.value = false
  initDeck()
}

const failGame = (msg) => {
  alert(msg)
  resetGame()
}

const nextTurn = () => {
  // 上一輪該按沒按 → 失敗
  if (shouldPress.value && !pressedThisTurn.value) {
    failGame('剛剛那輪應該按空白鍵但沒有按到，遊戲重新開始。')
    return
  }

  // 進到下一輪喊牌（1~13循環）
  let next = currentCall.value + 1
  if (next > 13) next = 1
  currentCall.value = next

  // 牌面：抽一張（52張不放回）
  currentCard.value = drawCard()

  // 判斷本輪是否要按空白鍵：喊號 == 牌面點數
  shouldPress.value = currentCard.value && currentCall.value === currentCard.value.rank
  pressedThisTurn.value = false

  // 語音喊數字（1~13）
  speakRank(currentCall.value)
}

const scheduleNextTurn = () => {
  if (!gameRunning.value) return
  const delay = randomDelay()

  timerId = setTimeout(() => {
    if (!gameRunning.value) return
    nextTurn()
    scheduleNextTurn()
  }, delay)
}

const startGame = () => {
  if (gameRunning.value) return
  resetGame()
  gameRunning.value = true
  nextTurn()
  scheduleNextTurn()
}

// 圖片載入失敗時給你提示（避免你找不到原因）
const onCardImgError = (e) => {
  // 只在開發時提示用，避免你沒發現圖片路徑錯
  // 你也可以改成顯示 fallback 圖
  e.target.style.display = 'none'
}

const handleKeydown = (e) => {
  if (!gameRunning.value) return
  if (e.code !== 'Space') return

  e.preventDefault()

  if (shouldPress.value) {
    if (!pressedThisTurn.value) {
      hitCount.value++
      pressedThisTurn.value = true

      if (hitCount.value >= requiredHits) {
        alert('恭喜你順利完成心臟病模擬練習！')
        stopGame()

        // ✅ Lesson3 完成 -> 解鎖 Lesson4
        localStorage.setItem('pocare-unlocked-level', '4')
        router.push('/learning')
      }
    }
  } else {
    failGame('這一輪不需要按空白鍵，你卻按了，遊戲重新開始。')
  }
}

onMounted(() => {
  window.addEventListener('keydown', handleKeydown)
})

onBeforeUnmount(() => {
  window.removeEventListener('keydown', handleKeydown)
  stopGame()
})
</script>

<style scoped>
.lesson3-page {
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
  flex-wrap: wrap;
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

.btn:disabled {
  opacity: 0.6;
  cursor: default;
}

.btn:hover:not(:disabled) {
  filter: brightness(0.95);
}

/* 規則選擇題 */
.quiz-box {
  margin-top: 16px;
}

.question-title {
  font-size: 20px;
  margin-bottom: 16px;
}

.options {
  display: flex;
  flex-direction: column;
  gap: 10px;
  margin-bottom: 16px;
}

.option-btn {
  text-align: left;
  padding: 10px 12px;
  font-size: 16px;
  border: 1px solid #555;
  background: #ffffff;
  cursor: pointer;
}

.option-btn.selected {
  background: #ffe082;
}

.progress-text {
  font-size: 14px;
  color: #555;
}

/* 模擬區 */
.simulate-box {
  margin-top: 16px;
}

.status-row {
  display: flex;
  gap: 24px;
  flex-wrap: wrap;
  margin-bottom: 16px;
  font-size: 16px;
}

.card-area {
  display: flex;
  justify-content: center;
  margin: 20px 0;
}

.card-display {
  width: 180px;
  height: 260px;
  border-radius: 14px;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
}

.card-img {
  width: 100%;
  height: 100%;
  object-fit: contain;
}

.card-fallback {
  font-size: 48px;
  font-weight: 700;
}

.small-hint {
  font-size: 14px;
  color: #555;
  margin-bottom: 16px;
}
</style>
