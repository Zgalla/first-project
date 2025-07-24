import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
  testDir: './tests',
  fullyParallel: true,             // запуск тестов параллельно
  forbidOnly: !!process.env.CI,    // запретить тестам с .only в CI
  retries: 3,                      // повторять упавшие тесты до 3 раз
  workers: process.env.CI ? 1 : undefined, // ограничение количества воркеров в CI для стабильности
  reporter: 'html',                // выводить html-отчёт

  timeout: 60000,                  // макс. время теста 60 секунд
  expect: {
    timeout: 15000,                // таймаут ожидания expect — 15 секунд
  },

  use: {
    trace: 'on-first-retry',       // сохранять трассировку при первом повторе теста (удобно для отладки)
    actionTimeout: 20000,          // 20 секунд на действия: клики, ввод и др.
    navigationTimeout: 60000,      // 60 секунд на загрузку страницы
    video: 'retain-on-failure',    // записывать видео при падении теста (опционально)
    screenshot: 'only-on-failure', // делать скриншот при падении (опционально)
  },

  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },
    {
      name: 'firefox',
      use: { ...devices['Desktop Firefox'] },
    },
    {
      name: 'webkit',
      use: { ...devices['Desktop Safari'] },
    },
  ],

  // При необходимости можно раскомментировать запуск локального веб-сервера
  // webServer: {
  //   command: 'npm run start',
  //   url: 'http://localhost:3000',
  //   reuseExistingServer: !process.env.CI,
  // },
});
