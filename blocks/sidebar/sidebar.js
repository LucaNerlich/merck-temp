import { getMetadata } from '../../scripts/aem.js';
import { loadFragment } from '../fragment/fragment.js';

export default async function decorate(block) {
    // load sidebar as fragment
    const navMeta = getMetadata('sidebar');
    const navPath = navMeta ? new URL(navMeta, window.location).pathname : '/sidebar';
    const fragment = await loadFragment(navPath);
    console.log('block', block);
    console.log('fragment', fragment);

    const main = document.querySelector('main');

    // Create a container to hold both main and sidebar
    const container = document.createElement('div');
    container.className = 'page-container';

    // Create the aside element
    const aside = document.createElement('aside');
    aside.className = 'sidebar';

    // Find Sidebar Content
    const contentToMove = fragment.querySelector('.default-content-wrapper');

    if (contentToMove) {
        aside.appendChild(contentToMove);
        console.log('Moved content to aside:', contentToMove);
    } else {
        console.error('No content found in block to move to sidebar');
        return;
    }

    // Insert container before main, then move main into container
    main.parentNode.insertBefore(container, main);
    container.appendChild(main);
    container.appendChild(aside);

    // Remove the original block since we've moved its content
    fragment.remove();
}
