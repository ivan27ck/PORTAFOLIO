// Mobile menu functionality
document.addEventListener('DOMContentLoaded', function() {
    const menuButton = document.querySelector('.bars');
    const menu = document.querySelector('.menu');
    
    if (menuButton) {
        menuButton.addEventListener('click', function() {
            menu.classList.toggle('hidden');
            menu.classList.toggle('flex');
            menu.classList.toggle('flex-col');
            menu.classList.toggle('absolute');
            menu.classList.toggle('top-[90px]');
            menu.classList.toggle('left-0');
            menu.classList.toggle('w-full');
            menu.classList.toggle('bg-dark');
            menu.classList.toggle('p-5');
            menu.classList.toggle('z-50');
        });
    }
});