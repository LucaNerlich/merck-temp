import {createVideoElement, isVideoUrl} from "../../scripts/video.js";

function createVideoHero(block) {
    let videoUrl = "";

    // Find the first anchor element with a video mimetype URL
    const videoLink = block.querySelector('a[href]');
    if (videoLink && isVideoUrl(videoLink.href)) {
        videoUrl = videoLink.href;
        videoLink.remove();
    }

    // Find first image in markup
    const posterImage = block.querySelector('picture > img');

    // Create Video Container and append
    block.append(createVideoElement(posterImage, videoUrl));

    // Remove original image from markup
    posterImage.remove();
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
