export const users = [
  {
    username: 'standard_user',
    password: 'secret_sauce',
    expectSuccess: true,
    testName: 'Успешный вход стандартного пользователя',
  },
  {
    username: 'locked_out_user',
    password: 'secret_sauce',
    expectSuccess: false,
    errorMessage: 'Epic sadface: Sorry, this user has been locked out.',
    testName: 'Ошибка входа заблокированного пользователя',
  },
  {
    username: 'problem_user',
    password: 'secret_sauce',
    expectSuccess: true,
    testName: 'Успешный вход пользователя с проблемами',
  },
  {
    username: 'performance_glitch_user',
    password: 'secret_sauce',
    expectSuccess: true,
    testName: 'Успешный вход пользователя с задержками',
  },
  {
    username: 'error_user',
    password: 'secret_sauce',
    expectSuccess: true,
    testName: 'Успешный вход пользователя, вызывающего ошибки',
  },
  {
    username: 'visual_user',
    password: 'secret_sauce',
    expectSuccess: true,
    testName: 'Успешный вход визуального пользователя',
  },
];

export const selectors = {
  usernameInput: '[data-test="username"]',
  passwordInput: '[data-test="password"]',
  loginButton: '[data-test="login-button"]',
  errorMessage: '[data-test="error"]',
  productsTitle: '.title',
};

export const baseUrl = 'https://www.saucedemo.com/';
