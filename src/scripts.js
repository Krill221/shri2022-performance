(() => {
    function bind(nodes, event, handler) {
        Array.from(nodes).forEach(node => {
            node.addEventListener(event, handler);
        });
    }

    function makeTabs(node) {
        let selected = node.querySelector('.seta').dataset.id;
        const tabs = node.querySelectorAll('.setab');
        const list = Array.from(tabs).map(node => node.dataset.id);
        const select = node.querySelector('.sese');

        function selectTab(newId) {
            const newTab = node.querySelector(`.setab[data-id=${newId}]`);
            const newPanel = node.querySelector(`.sp[data-id=${newId}]`);
            const oldTab = node.querySelector('.seta');
            const oldPanel = node.querySelector('.sp:not(.sph)');

            selected = newId;

            oldTab.classList.remove('seta');
            oldTab.setAttribute('aria-selected', 'false');
            oldTab.removeAttribute('tabindex');
            newTab.classList.add('seta');
            newTab.setAttribute('aria-selected', 'true');
            newTab.setAttribute('tabindex', '0');
            newTab.focus({
                preventScroll: true
            });

            oldPanel.classList.add('sph');
            oldPanel.setAttribute('aria-hidden', 'true');
            newPanel.classList.remove('sph');
            newPanel.setAttribute('aria-hidden', 'false');

            select.value = newId;
        }

        select.addEventListener('input', () => {
            selectTab(select.value);
        });

        bind(tabs, 'click', event => {
            const newId = event.target.dataset.id;
            selectTab(newId);
        });

        bind(tabs, 'keydown', event => {
            if (event.ctrlKey || event.metaKey || event.shiftKey || event.altKey) {
                return;
            }

            let index = list.indexOf(selected);
            if (event.which === 37) {
                // left
                --index;
            } else if (event.which === 39) {
                // right
                ++index;
            } else if (event.which === 36) {
                // home
                index = 0;
            } else if (event.which === 35) {
                // end
                index = list.length - 1;
            } else {
                return;
            }

            if (index >= list.length) {
                index = 0;
            } else if (index < 0) {
                index = list.length - 1;
            }

            selectTab(list[index]);
            event.preventDefault();
        });
    }

    function makeMenu(node) {
        let expanded = false;
        const links = document.querySelector('.helis');

        node.addEventListener('click', () => {
            expanded = !expanded;
            node.setAttribute('aria-expanded', expanded ? 'true' : 'false');
            node.querySelector('.heme-text').textContent = expanded ? 'Закрыть меню' : 'Открыть меню';
            links.classList.toggle('helis_opened', expanded);
            links.classList.add('helis-toggled');
        });
    }

    document.addEventListener('DOMContentLoaded', () => {
        Array.from(document.querySelectorAll('.main__devices')).forEach(makeTabs);
        Array.from(document.querySelectorAll('.heme')).forEach(makeMenu);
    });
})();
