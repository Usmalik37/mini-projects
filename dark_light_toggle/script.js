 // selectors
 const toggleBtn = document.querySelector('.btn');

 // state
 const storedTheme = localStorage.getItem('theme');

 // on mount
 if (storedTheme) document.body.classList.add(storedTheme);

 // handlers
 function handleThemeToggle() {
     document.body.classList.toggle('dark-mode');
     if (document.body.classList.contains('dark-mode')) {
         localStorage.setItem('theme', 'dark-mode');
     } else {
         localStorage.removeItem('theme');
     }
 }

 // events
 toggleBtn.addEventListener('click', handleThemeToggle);