import { createOptimizedPicture } from '../../scripts/aem.js';

function createVideoHero(block) {

    // wip, merge with code in cards

   const posterImage = block.querySelector('picture > img');
    const optimizedPicture = createOptimizedPicture(posterImage.src, posterImage.alt, false, [{ width: '750' }]);
    const optimizedImg = optimizedPicture.querySelector('img');

    const videoContainer = document.createElement('div');
    videoContainer.className = 'cards-video-container';

    const video = document.createElement('video');
    video.setAttribute('controls', '');
    video.setAttribute('poster', optimizedImg.src);
    video.setAttribute('preload', 'metadata');

    const source = document.createElement('source');
    // source.src = videoUrl;
    // source.type = getVideoMimeType(videoUrl);

    video.appendChild(source);
    videoContainer.appendChild(video);

    // Replace the image div with video container
    block.append(videoContainer);
    console.log('posterImage', posterImage);
    return Promise.resolve(undefined);
}

export default async function decorate(block) {
    const isVideo = block.classList.contains('video');
    if (isVideo) return createVideoHero(block);

    const h1 = block.querySelector('h1');
    if (!h1) return;

    // set aria role to subtitle
    const subtitle = h1.previousElementSibling;
    if (subtitle) {
        subtitle.setAttribute('aria-role', 'doc-subtitle');
    }
}
