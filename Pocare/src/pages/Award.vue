<template>
  <div class="award-page">
    <!-- 左上文字 -->
    <div class="title-area">
      <h1>恭喜你完成 Pocare 所有課程。</h1>
    </div>

    <!-- 中央獎狀 -->
    <div class="certificate-area">
      <div class="certificate-placeholder">
        <img src="/certificate.png" /></img>
      </div>
    </div>

    <!-- 右下成就 -->
    <div class="achievement-area">
      <h2>成就達成：</h2>
      <ul>
        <li>Poker Master</li>
      </ul>
    </div>
  </div>
</template>

<script setup>
// 純展示頁，暫時不需要 JS
</script>

<style scoped>
.award-page {
  position: relative;
  font-family: system-ui, sans-serif;
}

/* 左上 */
.title-area {
  position: absolute;
  left: 40px;
}

.title-area h1 {
  font-size: 28px;
  font-weight: bold;
}

/* 中央獎狀 */
.certificate-area {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
}

.certificate-placeholder {
  width: 420px;
  height: 600px;
  display: flex;
}

/* 右下成就 */
.achievement-area {
  position: absolute;
  right: 60px;
  bottom: 0px;
  text-align: left;
}

.achievement-area h2 {
  font-size: 20px;
  margin-bottom: 12px;
}

.achievement-area ul {
  list-style: none;
  padding: 0;
  margin: 0;
}

.achievement-area li {
  font-size: 18px;
  margin-bottom: 6px;
}
</style>
