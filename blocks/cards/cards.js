import { createOptimizedPicture } from '../../scripts/aem.js';

export default function decorate(block) {
    const isVideo = block.classList.contains('video');
    if (isVideo) return createVideoCards(block);

    /* change to ul, li */
    const ul = document.createElement('ul');
    [...block.children].forEach((row) => {
        const li = document.createElement('li');
        while (row.firstElementChild) li.append(row.firstElementChild);
        [...li.children].forEach((div) => {
            console.log('div', div);
            if (div.children.length === 1 && div.querySelector('picture')) {
                div.className = 'cards-card-image';
            } else {
                div.className = 'cards-card-body';
            }
        });
        ul.append(li);
    });
    ul.querySelectorAll('picture > img')
        .forEach((img) => img.closest('picture')
            .replaceWith(createOptimizedPicture(img.src, img.alt, false, [{ width: '750' }])));
    block.textContent = '';
    block.append(ul);
}

function createVideoCards(block) {
    /* change to ul, li */
    const ul = document.createElement('ul');
    [...block.children].forEach((row) => {
        const li = document.createElement('li');
        while (row.firstElementChild) li.append(row.firstElementChild);

        let posterImage = null;
        let videoUrl = null;

        [...li.children].forEach((div) => {
            if (div.children.length === 1 && div.querySelector('picture')) {
                div.className = 'cards-card-image';
                posterImage = div.querySelector('picture > img');
            } else {
                div.className = 'cards-card-body';
                // Find the first anchor element with a video mimetype URL
                const videoLink = div.querySelector('a[href]');
                if (videoLink && isVideoUrl(videoLink.href)) {
                    videoUrl = videoLink.href;
                    videoLink.remove();
                }
            }
        });

        // Create video element if we have both poster and video URL
        if (posterImage && videoUrl) {
            const videoContainer = document.createElement('div');
            videoContainer.className = 'cards-video-container';

            const video = document.createElement('video');
            video.setAttribute('controls', '');
            video.setAttribute('poster', posterImage.src);
            video.setAttribute('preload', 'metadata');

            const source = document.createElement('source');
            source.src = videoUrl;
            source.type = getVideoMimeType(videoUrl);

            video.appendChild(source);
            videoContainer.appendChild(video);

            // Replace the image div with video container
            const imageDiv = li.querySelector('.cards-card-image');
            if (imageDiv) {
                imageDiv.replaceWith(videoContainer);
            }
        }

        ul.append(li);
    });

    block.textContent = '';
    block.append(ul);
}

function isVideoUrl(url) {
    const videoExtensions = ['.mp4', '.webm', '.ogg', '.avi', '.mov', '.wmv', '.flv', '.mkv'];
    const lowerUrl = url.toLowerCase();
    return videoExtensions.some(ext => lowerUrl.includes(ext));
}

function getVideoMimeType(url) {
    const lowerUrl = url.toLowerCase();
    if (lowerUrl.includes('.mp4')) return 'video/mp4';
    if (lowerUrl.includes('.webm')) return 'video/webm';
    if (lowerUrl.includes('.ogg')) return 'video/ogg';
    if (lowerUrl.includes('.avi')) return 'video/x-msvideo';
    if (lowerUrl.includes('.mov')) return 'video/quicktime';
    if (lowerUrl.includes('.wmv')) return 'video/x-ms-wmv';
    if (lowerUrl.includes('.flv')) return 'video/x-flv';
    if (lowerUrl.includes('.mkv')) return 'video/x-matroska';
    return 'video/mp4'; // default fallback
}
