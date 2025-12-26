<template>
  <div class="learning-page">
    <div class="grid">
      <div
        v-for="lesson in lessons"
        :key="lesson.id"
        class="box"
        :class="{ locked: lesson.id > unlockedLevel }"
        @click="handleLessonClick(lesson)"
      >
        <img :src="lesson.image" :alt="lesson.title" class="box-img" />

        <!-- 鎖住的狀態：加上遮罩與 ? -->
        <div v-if="lesson.id > unlockedLevel" class="lock-overlay">
          <span class="lock-icon">🔒</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
const router = useRouter()

// 四個學習單元的圖片與編號
const lessons = [
  { id: 1, title: 'Lesson 1', image: '/learning1.png' },
  { id: 2, title: 'Lesson 2', image: '/learning2.png' },
  { id: 3, title: 'Lesson 3', image: '/learning3.png' },
  { id: 4, title: 'Lesson 4', image: '/learning4.png' }
]

// 解鎖到第幾關（預設只有 Lesson1 可點）
const unlockedLevel = ref(1)

// 進入頁面時，從 localStorage 讀取之前解鎖到哪一關
onMounted(() => {
  const saved = localStorage.getItem('pocare-unlocked-level')
  if (saved) {
    const n = Number(saved)
    if (!Number.isNaN(n) && n >= 1 && n <= lessons.length) {
      unlockedLevel.value = n
    }
  }
})

// 點圖片時的行為
const handleLessonClick = (lesson) => {
  // 還沒解鎖 → 不能點
  if (lesson.id > unlockedLevel.value) {
    alert('請先完成前一個階段，才能解鎖下一個單元。')
    return
  }

  if (lesson.id === 1) {
    router.push('/learning1')
    return
  }

  if (lesson.id === 2) {
    router.push('/learning2')
    return
  }

  if (lesson.id === 3) {
    router.push('/learning3')
    return
  }

  if (lesson.id === 4) {
    router.push('/learning4')
    return
  }

  console.log('開啟 Lesson', lesson.id)
}
</script>

<style scoped>
.learning-page {
  width: 100%;
  min-height: 100vh;
  font-family: system-ui, sans-serif;
  display: flex;
  justify-content: center;
  padding: 50px 0;
}

.grid {
  width: 80%;
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 50px;
}

/* 單一圖片框 */
.box {
  position: relative;
  width: 100%;
  cursor: pointer;
  transition: transform 0.2s ease, box-shadow 0.2s ease, opacity 0.2s ease;
}

.box:hover:not(.locked) {
  transform: translateY(-4px);
  box-shadow: 0 6px 14px rgba(0, 0, 0, 0.15);
}

.box-img {
  width: 100%;
  display: block;
  object-fit: cover;
}

/* 鎖住：變淡、不可點 */
.box.locked {
  opacity: 0.4;
  cursor: not-allowed;
}

/* 鎖住的遮罩與 ? */
.lock-overlay {
  position: absolute;
  inset: 0;
  background: rgba(255, 255, 255, 0.4);
  display: flex;
  justify-content: center;
  align-items: center;
}

.lock-icon {
  font-size: 72px;
  font-weight: bold;
  color: #555;
}
</style>
