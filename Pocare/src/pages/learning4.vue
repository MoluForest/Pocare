<template>
  <div class="lesson4-page">
    <!-- STEP 1：由來說明 -->
    <section v-if="currentStep === 1" class="section">
      <h1 class="section-title">Lesson 4：認識大老二</h1>

      <div class="text-block">
        <p>
          大老二是一款具有悠久歷史的撲克牌遊戲，其起源較為模糊，但在多年來演變成不同地方版本。無論是作為一種娛樂方式，還是作為增進交流與合作的工具，大老二遊戲都深受玩家喜愛，並且將繼續在世界各地的聚會和家庭中傳承與發展。
          <br>遊戲也有變體規則，根據地區的不同，可能會有不同的特殊牌型或出牌順序的要求。總體來說，大老二不僅是一款考驗反應速度的遊戲，更需要策略性思維，玩家需隨時調整自己的出牌策略，以在激烈的牌局中獲得勝利。</br>
        </p>
      </div>

      <div class="btn-row">
        <button class="btn" @click="speak('origin')">語音說明由來</button>
        <button class="btn primary" @click="goToStep(2)">進入規則說明</button>
      </div>
    </section>

    <!-- STEP 2：玩法與基本規則說明 -->
    <section v-else-if="currentStep === 2" class="section">
      <h1 class="section-title">大老二的玩法與基本規則</h1>

      <div class="text-block">
        <p>
          大老二通常由 2-4 名玩家參與，使用一副 52 張的撲克牌，四位玩家時每位玩家會收到 13 張牌。遊戲的目的是通過出牌比大小或牌型來最快將手中的牌出完。出牌規則要求玩家依照順序輪流出牌，由持有最小的梅花3玩家開始出牌，每位玩家出牌時必須比上一位玩家出的更大，否則就必須選擇過牌。在這個遊戲中，牌型的大小是依照數字和花色來決定的，黑桃 2 最大，梅花 3 最小，並且以黑桃、紅心、梅花、方塊作為大小順序。當一個玩家成功出完所有牌時，該玩家獲勝，遊戲結束。
        </p>
      </div>
      <h1 class="section-title">常見牌型介紹</h1>
      <div class="text-block">
        <p>
          單張：一張牌。
          <br>對子：兩張點數相同的牌。</br>
          <br>順子：五張連續數字的牌，不限花色。</br>
          <br>葫蘆：三張相同數字的牌，加對子。</br>
          <br>鐵支：四張相同數字的牌，加單張。</br>
          <br>同花順：五張相同花色的連續牌。</br>
        </p>
      </div>
      <div class="btn-row">
        <button class="btn" @click="speak('rules')">語音說明規則</button>
        <button class="btn primary" @click="goToStep(3)">進入練習</button>
      </div>
    </section>

    <!-- STEP 3：練習一：規則選擇題 -->
    <section v-else-if="currentStep === 3" class="section">
      <h1 class="section-title">練習一：大老二規則小測驗</h1>

      <div class="text-block">
        <p>
          以下是關於大老二規則的單選題。 需要連續答對 5 題才能通過，答錯將重新計算。
        </p>
      </div>

      <div class="quiz-box">
        <p class="question-title">
          題目：{{ currentRuleQuestion.question }}
        </p>

        <div class="options">
          <button
            v-for="(opt, idx) in currentRuleQuestion.options"
            :key="idx"
            class="option-btn"
            :class="{ selected: ruleSelected === idx }"
            @click="ruleSelected = idx"
          >
            {{ String.fromCharCode(65 + idx) }}. {{ opt }}
          </button>
        </div>

        <div class="btn-row">
          <button class="btn primary" @click="submitRuleQuiz">
            送出答案
          </button>
        </div>

        <p class="progress-text">
          目前連續答對：{{ ruleCorrectCount }}/{{ ruleRequiredCorrect }}
        </p>
      </div>
    </section>

    <!-- STEP 4：練習二：牌型與排序 -->
    <section v-else-if="currentStep === 4" class="section">
      <h1 class="section-title">練習二：牌型與排序</h1>

      <div class="text-block">
        <p>
          這一關會考大老二常見牌型與概念，例如：順子、鐵支、同花順等。
          需要五題全部答對才算通過，只要有一題錯誤就會回到第一題重新開始。
        </p>
      </div>

      <!-- 子題 1：輸入題 -->
      <div v-if="rankSubStep === 1" class="quiz-box">
        <p class="question-title">
          題目 1（輸入題）：<br />
          在大老二中，五張連續數字、不限花色的牌型，一般稱作什麼？
          <br>例如：紅心9-黑桃10-黑桃J-方塊Q-梅花K。</br>
        </p>

        <div class="input-area">
          <label>請輸入牌型名稱：</label>
          <input
            v-model="rankInput1"
            type="text"
            class="input"
            @keyup.enter="submitRankStep1"
          />
        </div>

        <div class="btn-row">
          <button class="btn primary" @click="submitRankStep1">送出答案</button>
        </div>
      </div>

      <!-- 子題 2：配對題 1 -->
      <div v-else-if="rankSubStep === 2" class="quiz-box">
        <p class="question-title">
          題目 2（配對題）：請把左邊的牌型名稱，配對到右邊正確的說明。
        </p>

        <div class="match-area">
          <div class="match-column">
            <h2>牌型</h2>
            <button
              v-for="item in matchLeft1"
              :key="item.id"
              class="match-item"
              :class="{ selected: selectedLeft1 && selectedLeft1.id === item.id, matched: isMatched1(item.id, true) }"
              @click="clickLeft1(item)"
            >
              {{ item.text }}
            </button>
          </div>

          <div class="match-column">
            <h2>說明</h2>
            <button
              v-for="item in matchRight1"
              :key="item.id"
              class="match-item"
              :class="{ selected: selectedRight1 && selectedRight1.id === item.id, matched: isMatched1(item.id, false) }"
              @click="clickRight1(item)"
            >
              {{ item.text }}
            </button>
          </div>
        </div>
      </div>

      <!-- 子題 3：配對題 2 -->
      <div v-else-if="rankSubStep === 3" class="quiz-box">
        <p class="question-title">
          題目 3（配對題）：請把左邊的「牌型名稱」，配對到右邊「例子」。
        </p>

        <div class="match-area">
          <div class="match-column">
            <h2>牌型</h2>
            <button
              v-for="item in matchLeft2"
              :key="item.id"
              class="match-item"
              :class="{ selected: selectedLeft2 && selectedLeft2.id === item.id, matched: isMatched2(item.id, true) }"
              @click="clickLeft2(item)"
            >
              {{ item.text }}
            </button>
          </div>
        </div>
      </div>

      <!-- 子題 4：填空題 1 -->
      <div v-else-if="rankSubStep === 4" class="quiz-box">
        <p class="question-title">
          題目 4（填空題）：<br />
          在大老二中，四張相同點數的牌，加上一張其他牌，一般稱作什麼?
          <br>例如:黑桃3-梅花3-紅心3-方塊3-梅花K。</br>
        </p>

        <div class="input-area">
          <label>請填入答案：</label>
          <input
            v-model="rankInput2"
            type="text"
            class="input"
            @keyup.enter="submitRankStep4"
          />
        </div>

        <div class="btn-row">
          <button class="btn primary" @click="submitRankStep4">送出答案</button>
        </div>
      </div>

      <!-- 子題 5：填空題 2 -->
      <div v-else-if="rankSubStep === 5" class="quiz-box">
        <p class="question-title">
          題目 5（填空題）：<br />
          在大老二中，五張同一花色，點數又是連續的牌型，一般稱作什麼?
          <br>例如:梅花7-梅花8-梅花9-梅花10-梅花J</br>
        </p>

        <div class="input-area">
          <label>請填入答案：</label>
          <input
            v-model="rankInput3"
            type="text"
            class="input"
            @keyup.enter="submitRankStep5"
          />
        </div>

        <div class="btn-row">
          <button class="btn primary" @click="submitRankStep5">送出答案</button>
        </div>
      </div>
    </section>

    <!-- STEP 5：練習三：情境選擇題 -->
    <section v-else-if="currentStep === 5" class="section">
      <h1 class="section-title">練習三：情境判斷題</h1>

      <div class="text-block">
        <p>
          最後一關會給你一些實際出牌情境，考你在大老二裡應該怎麼選擇出牌。
          題目同樣是四選一，需要連續答對 {{ scenarioRequiredCorrect }} 題才算通過。
        </p>
      </div>

      <div class="quiz-box">
        <p class="question-title">
          題目：{{ currentScenarioQuestion.question }}
        </p>

        <div class="options">
          <button
            v-for="(opt, idx) in currentScenarioQuestion.options"
            :key="idx"
            class="option-btn"
            :class="{ selected: scenarioSelected === idx }"
            @click="scenarioSelected = idx"
          >
            {{ String.fromCharCode(65 + idx) }}. {{ opt }}
          </button>
        </div>

        <div class="btn-row">
          <button class="btn primary" @click="submitScenarioQuiz">送出答案</button>
        </div>

        <p class="progress-text">
          目前連續答對：{{ scenarioCorrectCount }}/{{ scenarioRequiredCorrect }}
        </p>
      </div>
    </section>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()

/* ---------- Step 控制 ---------- */

const currentStep = ref(1)

const goToStep = (step) => {
  currentStep.value = step
  if (step === 4) resetRankQuiz()
  if (step === 5) resetScenarioQuiz()
}

/* ---------- 語音教學 ---------- */

const speak = (type) => {
  if (typeof window === 'undefined' || !('speechSynthesis' in window)) {
    alert('此瀏覽器不支援語音朗讀功能。')
    return
  }

  let text = ''

  if (type === 'origin') {
    text =
      '大老二是一款具有悠久歷史的撲克牌遊戲，其起源充滿神秘與趣味，並在多年來演變成不同地方版本。無論是作為一種娛樂方式，還是作為增進交流與合作的工具，大老二遊戲都深受玩家喜愛，並且將繼續在世界各地的聚會和家庭中傳承與發展。遊戲的核心玩法圍繞著出牌的大小比較，並且對牌型的了解與策略選擇非常關鍵。它不僅是考驗玩家的反應速度與專注力，還需要一定的策略規劃與判斷力。'
  } else if (type === 'rules') {
    text =
      '大老二通常由 2-4 名玩家參與，使用一副 52 張的撲克牌，四位玩家時每位玩家會收到 13 張牌。遊戲的目的是通過出牌比大小或牌型來最快將手中的牌出完。出牌規則要求玩家依照順序輪流出牌，由持有最小的梅花3玩家開始出牌，每位玩家出牌時必須比上一位玩家出的更大，否則就必須選擇過牌。在這個遊戲中，牌型的大小是依照數字和花色來決定的，黑桃 2 最大，梅花 3 最小，並且以黑桃、紅心、梅花、方塊作為大小順序。當一個玩家成功出完所有牌時，該玩家獲勝，遊戲結束。'
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
    question: '在大老二遊戲中，玩家的主要目標是什麼？',
    options: [
      '蒐集越多紅心越好',
      '讓自己手上的牌最快出完',
      '盡量保留最大牌在手上',
      '把所有牌都丟進棄牌堆'
    ],
    correctIndex: 1
  },
  {
    question: '輪到自己時，下列哪一個行為符合大老二規則？',
    options: [
      '就算有能出的牌，還是可以依策略過牌',
      '站起來看其他玩家的牌',
      '偷偷把牌丟掉',
      '把出過的牌從牌堆中放回自己的手牌'
    ],
    correctIndex: 0
  },
  {
    question: '下列哪一種敘述最接近大老二？',
    options: [
      '只有拿到黑桃2就獲勝',
      '具有全球偶像經營策略的遊戲',
      '兼具出牌策略與牌型大小比較',
      '完全不需要思考，隨便出牌就能獲勝'
    ],
    correctIndex: 2
  },
  {
    question: '下列哪一個行為符合大老二規則？',
    options: [
      '亮牌讓所有玩家看手牌',
      '藉由手勢或暗號偷偷告訴其他玩家手牌',
      '拿到對自己不利的牌就棄牌不玩',
      '在出牌前稍微想一下策略'
    ],
    correctIndex: 3
  },
  {
    question: '在大老二遊戲中，若玩家無法或選擇不出牌，通常會選擇什麼行為？',
    options: [
      '跳國民健康操',
      '告訴大家自己這回合過牌',
      '丟一張牌到棄牌區',
      '大罵發牌者'
    ],
    correctIndex: 1
  }
]

const ruleRequiredCorrect = 5
const ruleCorrectCount = ref(0)

const currentRuleQuestion = ref(ruleQuestions[0])
const ruleSelected = ref(null)

// 題目序列：隨機洗牌後依序出題（本輪不重複）
const questionOrder = ref([])  // 儲存洗牌後的題目索引
const questionCursor = ref(0)  // 當前題目的位置

// 初始化題目順序
const initQuizRound = () => {
  // 產生 0..n-1 的索引並洗牌
  questionOrder.value = [...Array(ruleQuestions.length).keys()].sort(() => Math.random() - 0.5)
  questionCursor.value = 0
  currentRuleQuestion.value = ruleQuestions[questionOrder.value[0]]
  ruleSelected.value = null
}

// 進入下一題（同一輪不重複）
const nextRuleQuestionNoRepeat = () => {
  questionCursor.value++

  // 正常情況：你需要答對 5 題，而題庫也是 5 題，所以不會用到「超出題庫」這段
  // 但保險起見：如果真的超出，就再洗一次
  if (questionCursor.value >= questionOrder.value.length) {
    initQuizRound()
    return
  }

  currentRuleQuestion.value = ruleQuestions[questionOrder.value[questionCursor.value]]
  ruleSelected.value = null
}

const submitRuleQuiz = () => {
  if (ruleSelected.value === null) {
    alert('請先選擇一個答案。')
    return
  }

  const isCorrect = ruleSelected.value === currentRuleQuestion.value.correctIndex

  if (isCorrect) {
    ruleCorrectCount.value++

    if (ruleCorrectCount.value >= ruleRequiredCorrect) {
      alert('太棒了！規則練習通過，接下來進入牌型與排序練習。')
      goToStep(4)
      return
    }

    alert('答對了！繼續下一題。')
    nextRuleQuestionNoRepeat()
  } else {
    alert('這題答錯了，連續答對次數會重置，再試試看。')
    ruleCorrectCount.value = 0
    initQuizRound()
  }
}

// 啟動時初始化
initQuizRound()

/* ---------- 練習二：牌型與排序（5 小題） ---------- */

const rankSubStep = ref(1) // 1~5

// 題 1：輸入題
const rankInput1 = ref('')
const submitRankStep1 = () => {
  const ans = rankInput1.value.trim()
  if (!ans) {
    alert('請先輸入答案。')
    return
  }
  if (ans === '順子') {
    rankSubStep.value = 2
    rankInput1.value = ''
  } else {
    alert('答案不正確，將從第一題重新開始。')
    resetRankQuiz()
  }
}

// 題 2：配對題 1（名稱 ↔ 說明）
const matchLeft1Base = [
  { id: 'pair', text: '對子' },
  { id: 'straight', text: '順子' },
  { id: 'fullhouse', text: '葫蘆' },
  { id: 'straightflush', text: '同花順' },
  { id: 'fourkind', text: '鐵支' }
]

const matchRight1Base = [
  { id: 'pair', text: '兩張相同點數的牌' },
  { id: 'straight', text: '五張不同花色連續點數' },
  { id: 'fullhouse', text: '三張同點數加上一對' },
  { id: 'fourkind', text: '四張點數花色相同加任一張牌' },
  { id: 'straightflush', text: '同一花色且五張連續點數' }
]

const matchLeft1 = ref([])
const matchRight1 = ref([])
const matched1 = ref([]) // { leftId, rightId }

const selectedLeft1 = ref(null)
const selectedRight1 = ref(null)

const shuffle = (arr) => [...arr].sort(() => Math.random() - 0.5)

const resetMatch1 = () => {
  matchLeft1.value = shuffle(matchLeft1Base)
  matchRight1.value = shuffle(matchRight1Base)
  matched1.value = []
  selectedLeft1.value = null
  selectedRight1.value = null
}
resetMatch1()

const isMatched1 = (id, isLeft) => {
  if (isLeft) return matched1.value.some((m) => m.leftId === id)
  return matched1.value.some((m) => m.rightId === id)
}

const clickLeft1 = (item) => {
  if (isMatched1(item.id, true)) return
  selectedLeft1.value = item
  tryMatch1()
}

const clickRight1 = (item) => {
  if (isMatched1(item.id, false)) return
  selectedRight1.value = item
  tryMatch1()
}

const tryMatch1 = () => {
  if (!selectedLeft1.value || !selectedRight1.value) return

  if (selectedLeft1.value.id === selectedRight1.value.id) {
    matched1.value.push({
      leftId: selectedLeft1.value.id,
      rightId: selectedRight1.value.id
    })

    if (matched1.value.length === matchLeft1Base.length) {
      alert('配對題 2 完成，進入下一題。')
      rankSubStep.value = 4
      resetMatch2()
    }
  } else {
    alert('配對錯誤，這一題會重新開始。')
    resetMatch1()
  }

  selectedLeft1.value = null
  selectedRight1.value = null
}
// 題 4、5：填空
const rankInput2 = ref('')
const rankInput3 = ref('')

const submitRankStep4 = () => {
  const ans = rankInput2.value.trim()
  if (!ans) {
    alert('請先輸入答案。')
    return
  }
  if (ans === '鐵支') {
    rankSubStep.value = 5
    rankInput2.value = ''
  } else {
    alert('答案不正確，將從第一題重新開始。')
    resetRankQuiz()
  }
}

const submitRankStep5 = () => {
  const ans = rankInput3.value.trim()
  if (!ans) {
    alert('請先輸入答案。')
    return
  }
  if (ans === '同花順') {
    alert('恭喜你完成牌型與排序練習，進入最後一關情境選擇題。')
    goToStep(5)
  } else {
    alert('答案不正確，將從第一題重新開始。')
    resetRankQuiz()
  }
}

const resetRankQuiz = () => {
  rankSubStep.value = 1
  rankInput1.value = ''
  rankInput2.value = ''
  rankInput3.value = ''
  resetMatch1()
  resetMatch2()
}

/* ---------- 練習三：情境選擇題 ---------- */

const scenarioQuestions = [
  {
    question:
      '上一位玩家出了「單張 Q」，你手上有K、A、2可以出牌。若你想保留大牌到後面使用，一般較合理的選擇是？',
    options: ['出 A', '出 2', '出 K', '直接翻桌'],
    correctIndex: 2
  },
  {
    question:
      '你因為想保留大牌型，導致你已經很久沒出牌了，再繼續下去可會輸，一般較合理的選擇是?',
    options: ['繼續過牌觀察情況', '求其他玩家放水', '故意出錯牌拖時間', '把牌型拆成單張'],
    correctIndex: 3
  },
  {
    question:
      '你手上有一組鐵支，但目前遊戲剛開始出牌的牌型都不大。通常較好的做法是？',
    options: [
      '一開始就把鐵支亮出來',
      '先用小牌牽制，等關鍵時刻再用鐵支翻盤',
      '完全不要出鐵支',
      '把鐵支拆開分次出'
    ],
    correctIndex: 1
  }
]

const scenarioRequiredCorrect = 3  // 調整為3題答對即可通關
const scenarioCorrectCount = ref(0)
const scenarioSelected = ref(null)
const currentScenarioQuestion = ref(scenarioQuestions[0])

// 題目序列：依序出題（本輪不重複）
const scenarioquestionCursor = ref(0)  // 用來追蹤目前顯示的題目

// 初始化題目順序（不隨機，依序出題）
const initScenarioQuizRound = () => {
  scenarioquestionCursor.value = 0
  currentScenarioQuestion.value = scenarioQuestions[scenarioquestionCursor.value]
  scenarioSelected.value = null
}

// 進入下一題
const nextScenarioQuestion = () => {
  scenarioquestionCursor.value++

  // 若所有題目都已經出完，則完成
  if (scenarioquestionCursor.value >= scenarioQuestions.length) {
    alert('恭喜你完成 Pocare 所有課程！')
    localStorage.setItem('pocare-completed', '1')
    router.push('/Award')  // 或你要回 /learning 也行
    return
  }

  currentScenarioQuestion.value = scenarioQuestions[scenarioquestionCursor.value]
  scenarioSelected.value = null
}

// 提交答案
const submitScenarioQuiz = () => {
  if (scenarioSelected.value === null) {
    alert('請先選擇一個答案。')
    return
  }

  const isCorrect =
    scenarioSelected.value === currentScenarioQuestion.value.correctIndex

  if (isCorrect) {
    scenarioCorrectCount.value++
    if (scenarioCorrectCount.value >= scenarioRequiredCorrect) {
      alert('恭喜你完成 Pocare 所有課程！')
      localStorage.setItem('pocare-completed', '1')
      router.push('/Award')  // 或你要回 /learning 也行
    } else {
      alert('答對了！繼續下一題。')
      nextScenarioQuestion()  // 進入下一題
    }
  } else {
    alert('這題答錯了，連續答對次數會重置，再試一次！')
    scenarioCorrectCount.value = 0
    initScenarioQuizRound()  // 重新洗題目
  }
}

// 初始化題目
initScenarioQuizRound()
</script>

<style scoped>
.lesson4-page {
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

.btn:hover {
  filter: brightness(0.95);
}

/* 選擇題區塊共用樣式 */
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

/* 輸入題 / 填空 */
.input-area {
  margin-bottom: 16px;
}

.input {
  padding: 8px 12px;
  font-size: 18px;
  margin-top: 8px;
  min-width: 220px;
}

/* 配對題共用樣式 */
.match-area {
  display: flex;
  justify-content: center;
  gap: 60px;
  margin-top: 16px;
}

.match-column h2 {
  font-size: 18px;
  margin-bottom: 10px;
}

.match-item {
  display: block;
  width: 250px;
  padding: 10px 0;
  margin-bottom: 8px;
  font-size: 16px;
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

.hint {
  font-size: 14px;
  color: #555;
  margin-top: 8px;
}
</style>
