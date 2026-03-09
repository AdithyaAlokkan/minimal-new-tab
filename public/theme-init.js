;(function () {
  const root = document.documentElement
  const stored = localStorage.getItem('settingThemeMode')

  const themeMode =
    stored === 'system' || !stored
      ? window.matchMedia('(prefers-color-scheme: dark)').matches
        ? 'dark'
        : 'light'
      : stored

  root.classList.add(themeMode)
})()
