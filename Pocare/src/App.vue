<template>
  <div class="layout">
    <!-- 共用 Header -->
    <header class="header">
      <router-link to="/" class="logo-link">
  <div class="logo-box">
    <img src="/logo.png" alt="logo" class="logo-img" />
  </div>
</router-link>


      <nav class="nav">
        <router-link to="/learning" class="nav-item">開始學習</router-link>
        <router-link to="/about" class="nav-item">關於我們</router-link>
        <router-link to="/profile" class="nav-item">個人資訊</router-link>

      </nav>
    </header>

    <!-- 🔥 不同頁面會在這裡顯示 -->
    <main class="content">
      <router-view />
    </main>

    <!-- 共用 Footer -->
    <footer class="footer">
      2025 Pocare®
    </footer>
  </div>
</template>

<script setup>
</script>

<style scoped>
.layout {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  font-family: system-ui, sans-serif;
}

/* Header */
.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0px 60px 0px 20px;
  border-bottom: 3px solid #0f0f0f;
  background-color: #FFE86F;
}

.logo-box {
  width: 200px;
  height: 100px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.logo-img {
  width: 90%;
  object-fit: contain;
}

.nav {
  display: flex;
  gap: 40px;
}

.nav-item {
  text-decoration: none;
  color: #000000;
  font-size: 22px;
}

.nav-item:hover {
  opacity: 0.6;
}

/* 中央內容區（由 router-view 呈現）*/
.content {
  flex: 1;
  padding: 40px 0;
}

/* Footer */
.footer {
  text-align: center;
  padding: 20px 0;
  color: #555;
 border-top: 3px solid #0f0f0f;
  font-size: 15px;
}
</style>
