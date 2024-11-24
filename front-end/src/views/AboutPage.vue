<script setup lang="ts">
</script>
<template>
  <div class="page-container">
    <h1>About Simple Text Editor</h1>
    <div class="content">
      <section>
        <h2>Our Mission</h2>
        <p>Simple Text Editor is designed to provide a clean, distraction-free writing environment for everyone. Whether you're a student, professional writer, or just someone who needs to jot down thoughts, our editor is here to help.</p>
      </section>
      
      <section>
        <h2>Features</h2>
        <ul>
          <li>Clean, minimalist interface</li>
          <li>Real-time character count</li>
          <li>Auto-save functionality</li>
          <li>Cross-platform compatibility</li>
          <li>Free to use</li>
        </ul>
      </section>

      <section>
        <h2>Contact Us</h2>
        <p>Have questions or suggestions? Reach out to us at: <a href="mailto:support@simpletexteditor.com">support@simpletexteditor.com</a></p>
      </section>
    </div>
  </div>
</template>


<style scoped>
.page-container {
  max-width: 800px;
  margin: 0 auto;
  padding: 2rem;
}

.content {
  line-height: 1.6;
}

section {
  margin-bottom: 2rem;
}

.config-container {
  background: white;
  padding: 2rem;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.config-section {
  margin-bottom: 2rem;
}

.config-section h2 {
  margin-bottom: 1rem;
  color: #333;
}

.config-item {
  margin-bottom: 1rem;
  display: flex;
  align-items: center;
  gap: 1rem;
}

.config-item label {
  min-width: 120px;
  color: #666;
}

select, input[type="range"] {
  padding: 0.5rem;
  border: 1px solid #ddd;
  border-radius: 4px;
  width: 200px;
}

.config-actions {
  display: flex;
  gap: 1rem;
  margin-top: 2rem;
}

.save-button, .reset-button {
  padding: 0.75rem 1.5rem;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 1rem;
}

.save-button {
  background-color: #4CAF50;
  color: white;
}

.reset-button {
  background-color: #f5f5f5;
  color: #333;
}

.save-button:hover {
  background-color: #45a049;
}

.reset-button:hover {
  background-color: #e0e0e0;
}
</style>