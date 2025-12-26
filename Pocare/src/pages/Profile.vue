<template>
  <div class="profile-page">
    
    <!-- 左側：使用者資訊 -->
    <div class="left-area">
      <div class="avatar">
  <img v-if="userPhoto" :src="userPhoto" alt="User Photo">
  <img v-else src="/avatar.png" alt="Default Avatar" class="avatar-img">
    </div>
      <div class="username-box">
        <p class="username">撲克貓</p>
      </div>
    </div>

    <!-- 右側：學習進度 + 獎狀 -->
    <div class="right-area">
      <p class="progress-text">目前學習進度：{{ progressLabel }}</p>

      <div class="award-row">
        <span class="award-label">獎狀：</span>

        <!-- ✅ 未完成：灰色 ? -->
        <div v-if="!hasAward" class="award-placeholder">?</div>

        <!-- ✅ 已完成：顯示獎狀圖片 -->
        <img v-else class="award-img" src="/certificate.png" alt="獎狀" />
      </div>
    </div>

  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'

const unlockedLevel = ref(1)
const completed = ref(false)

// ✅ 依你的 Lesson 對應名稱可改
const progressLabel = computed(() => {
  if (completed.value) return '完成所有課程'
  if (unlockedLevel.value >= 4) return 'Lesson4'
  if (unlockedLevel.value >= 3) return 'Lesson3'
  if (unlockedLevel.value >= 2) return 'Lesson2'
  return 'Lesson1'
})

const hasAward = computed(() => completed.value)

const loadProgress = () => {
  const saved = localStorage.getItem('pocare-unlocked-level')
  const n = Number(saved)
  unlockedLevel.value = Number.isFinite(n) && n >= 1 ? n : 1

  completed.value = localStorage.getItem('pocare-completed') === '1'
}

onMounted(() => {
  loadProgress()

  // ✅ 如果你是同一個分頁跳轉，通常 onMounted 夠用
  // ✅ 若你想更保險（同頁面內狀態更新），可以加這個監聽：
  window.addEventListener('storage', loadProgress)
})

</script>

<style scoped>
.profile-page {
  width: 90%;
  margin: 0 auto;
  padding: 60px 0;
  display: flex;
  justify-content: center;
  gap: 120px;
  font-family: system-ui, sans-serif;
}

/* 左側：照片 + 名稱 */
.left-area {
  display: flex;
  flex-direction: column;
  align-items: center;
}

/* 圓形頭像 */
.placeholder-circle {
  width: 260px;
  height: 260px;
  background: #dcdcdc;
  border-radius: 50%;
}

.avatar img {
  width: 260px;
  height: 260px;
  border-radius: 50%;
  object-fit: cover;
}

/* 名稱 */
.username-box {
  margin-top: 20px;
  background: #dcdcdc;
  width: 200px;
  height: 60px;
  display: flex;
  justify-content: center;
  align-items: center;
}

.username {
  font-size: 22px;
}

/* 右側內容 */
.right-area {
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  padding-top: 20px;
  font-size: 22px;
}

.award-row {
  display: flex;
  align-items: center;
  gap: 20px;
  margin-top: 40px;
}

/* 灰色獎狀區塊 */
.award-box {
  width: 240px;
  height: 300px;
  background: #dcdcdc;
  display: flex;
  justify-content: center;
  align-items: center;
}

.award-placeholder {
  font-size: 90px;
  font-weight: bold;
  color: #555;
}

/* 已解鎖獎狀圖片 */
.award-img {
  width: 100%;
  height: 100%;
  object-fit: contain;
}

.award-placeholder{
  width: 180px;
  height: 260px;
  background:#dcdcdc;
  display:flex;
  align-items:center;
  justify-content:center;
  font-size:64px;
  font-weight:700;
}

.award-img{
  width: 180px;
  height: 260px;
  object-fit: contain;
  background:#dcdcdc;
}

</style>
