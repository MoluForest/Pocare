<template>
  <div class="about-page">

    <section class="section">
      <img src="/about1.png" class="img-block" />

      <div class="text-block">
        <h2>教學目的:</h2>
        <p>
          本課程以撲克牌為學習媒介，透過遊戲化教學與語音引導，協助學習者在輕鬆、有節奏的互動中，
          <br>逐步建立對撲克牌基本知識與常見玩法的理解，並培養專注力、反應能力與基礎邏輯思考能力，</br>
          <br>降低對牌類遊戲的學習門檻，提升學習動機與成就感。</br>
        </p>
      </div>
    </section>

    <section class="section">
      <img src="/about2.png" class="img-block" />

      <div class="text-block">
        <h2>學習方式:</h2>
        <p>
          本課程設計以精熟學習為核心，透過關卡式通關機制確保學習者在進入下一階段前已達到理解標準；
          <br>並結合建構主義與情境認知理論，讓學習者在實際操作與模擬情境中主動建構知識。</br>
          <br>同時，系統具備基礎適性學習概念，能依個人進度進行學習控制，並透過遊戲化設計提升學習動機與投入度。</br>
        </p>
      </div>
    </section>

  </div>
</template>

<script setup></script>

<style scoped>
.about-page {
  width: 90%;
  margin: 0 auto;
  padding: 40px 0;
  font-family: system-ui, sans-serif;
}

/* 每個區塊左右排列 */
.section {
  display: flex;
  align-items: flex-start;
  gap: 40px;
  margin-bottom: 80px;
}

/* 左邊圖片 */
.img-block {
  width: 250px;
  height: 250px;
  object-fit: cover;
}

/* 右邊文字區 */
.text-block {
  flex: 1;
}

h2 {
  margin-bottom: 10px;
  font-size: 24px;
}

p {
  font-size: 18px;
  line-height: 1.6;
}
</style>
