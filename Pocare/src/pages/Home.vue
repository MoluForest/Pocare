<template>
  <div class="home-content">
    <div class="main-area">
      <div class="big-block">
        <img src="/home-main.png" class="big-img" />
      </div>

      <router-link to="/learning">
        <button class="start-btn">開始學習</button>
      </router-link>
    </div>
  </div>
</template>

<script setup></script>

<style scoped>
.main-area {
  padding: 80px 0;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 80px;
}

.big-block {
  width: 500px;
  height: 400px;
}

.big-img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.start-btn {
  width: 180px;
  height: 80px;
  font-size: 20px;
  background: #d6d6d6;
  border: none;
  cursor: pointer;
}

.start-btn:hover {
  background: #c8c8c8;
}
</style>
