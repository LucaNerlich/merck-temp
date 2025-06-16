export default async function decorate(block) {
    const h1 = block.querySelector('h1');
    if (!h1) return;

    // set aria role to subtitle
    const subtitle = h1.previousElementSibling;
    if (subtitle) {
        subtitle.setAttribute('aria-role', 'doc-subtitle');
    }
}
