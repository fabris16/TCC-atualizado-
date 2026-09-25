document.addEventListener('DOMContentLoaded', () => {
    // ELEMENTOS DO MENU
    const openMenuBtn = document.getElementById('open-menu');
    const closeMenuBtn = document.getElementById('close-menu');
    const sidebar = document.getElementById('sidebar');
    const overlay = document.getElementById('overlay');
    const navItems = document.querySelectorAll('.nav-item');
    const tabContents = document.querySelectorAll('.tab-content');

    // ELEMENTOS DO MODAL DA PIZZA
    const pizzaModal = document.getElementById('pizza-modal');
    const closeModalBtn = document.getElementById('close-modal');
    const modalImg = document.getElementById('modal-img');
    const modalTitle = document.getElementById('modal-title');
    const modalDesc = document.getElementById('modal-desc');
    const modalPrice = document.getElementById('modal-price');
    const menuCards = document.querySelectorAll('.menu-card');

    // Funções do Menu Lateral
    function openMenu() {
        sidebar.classList.add('active');
        overlay.classList.add('active');
        document.body.style.overflow = 'hidden';
    }

    function closeMenu() {
        sidebar.classList.remove('active');
        // Só remove o overlay se o modal da pizza não estiver aberto
        if (!pizzaModal.classList.contains('active')) {
            overlay.classList.remove('active');
            document.body.style.overflow = 'auto';
        }
    }

    if (openMenuBtn) openMenuBtn.addEventListener('click', openMenu);
    if (closeMenuBtn) closeMenuBtn.addEventListener('click', closeMenu);

    // Navegação por Abas
    navItems.forEach(item => {
        item.addEventListener('click', (e) => {
            e.preventDefault();
            const targetTabId = item.getAttribute('data-tab');

            tabContents.forEach(tab => tab.classList.remove('active'));
            navItems.forEach(nav => nav.classList.remove('active'));

            const targetTab = document.getElementById(targetTabId);
            if (targetTab) {
                targetTab.classList.add('active');
                item.classList.add('active');
            }

            window.scrollTo({ top: 0, behavior: 'smooth' });
            closeMenu();
        });
    });

    // Lógica para abrir detalhes da Pizza ao Clicar
    menuCards.forEach(card => {
        card.addEventListener('click', () => {
            const title = card.getAttribute('data-title');
            const desc = card.getAttribute('data-desc');
            const price = card.getAttribute('data-price');
            const imgSrc = card.getAttribute('data-img');

            modalTitle.textContent = title;
            modalDesc.textContent = desc;
            modalPrice.textContent = price;
            modalImg.src = imgSrc;

            pizzaModal.classList.add('active');
            overlay.classList.add('active');
            document.body.style.overflow = 'hidden';
        });
    });

    // Função para fechar o Modal da Pizza
    function closeModal() {
        pizzaModal.classList.remove('active');
        overlay.classList.remove('active');
        document.body.style.overflow = 'auto';
    }

    if (closeModalBtn) closeModalBtn.addEventListener('click', closeModal);
    
    // Fechar ao clicar fora (no overlay)
    if (overlay) {
        overlay.addEventListener('click', () => {
            closeMenu();
            closeModal();
        });
    }
});