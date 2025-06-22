// Import if needed (ensure aem.js is available if used)
import {createOptimizedPicture} from "./aem.js";

/**
 * Determines if the provided URL points to a video file based on its extension.
 *
 * @param {string} url - The URL to be checked for being a video link.
 * @return {boolean} Returns `true` if the URL ends with a video extension, otherwise `false`.
 */
function isVideoUrl(url) {
    const videoExtensions = ['.mp4', '.webm', '.ogg', '.avi', '.mov', '.wmv', '.flv', '.mkv'];
    const lowerUrl = url.toLowerCase();
    return videoExtensions.some(ext => lowerUrl.includes(ext));
}

/**
 * Determines the MIME type of a video based on its file extension.
 *
 * @param {string} url - The URL or path of the video file.
 * @return {string} - The MIME type associated with the given video file extension, defaults to 'video/mp4'.
 */
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

/**
 * Creates a container for a video element with specified poster image and video URL.
 *
 * @param {Object} posterImage - An object with `src` and `alt` properties for the poster image.
 * @param {string} posterImage.src - The source URL of the poster image.
 * @param {string} posterImage.alt - Alternative text for the poster image.
 * @param {string} videoUrl - The source URL of the video to be played.
 *
 * @returns {HTMLElement} A `div` element containing a configured `video` element.
 */
function createVideoElement(posterImage, videoUrl) {
    const optimizedPicture = createOptimizedPicture(posterImage.src, posterImage.alt, false, [{width: '750'}]);
    const optimizedImg = optimizedPicture.querySelector('img');

    const videoContainer = document.createElement('div');
    videoContainer.className = 'video-container';

    const video = document.createElement('video');
    video.setAttribute('controls', '');
    video.setAttribute('poster', optimizedImg.src);
    video.setAttribute('preload', 'metadata');

    const source = document.createElement('source');
    source.src = videoUrl;
    source.type = getVideoMimeType(videoUrl);

    video.appendChild(source);
    videoContainer.appendChild(video);

    return videoContainer;
}

/**
 * Enhances all existing video elements with custom play/pause functionality, including a clickable container and button.
 */
function enhanceVideos() {
    // Target parent containers that might hold video containers
    const parentContainers = document.querySelectorAll('.hero.video.block, .cards.video.block');

    parentContainers.forEach((parent) => {
        const videoContainers = parent.querySelectorAll('.video-container');

        videoContainers.forEach((container) => {
            const video = container.querySelector('video');
            if (video) {
                // Remove native controls
                video.removeAttribute('controls');

                // Add custom play/pause button specific to this video container
                const playPauseBtn = document.createElement('button');
                playPauseBtn.className = 'custom-play-pause';
                container.appendChild(playPauseBtn);

                // Add event listeners for both container and button
                let isPlaying = false;
                const togglePlayPause = () => {
                    if (isPlaying) {
                        video.pause();
                        playPauseBtn.textContent = 'Play';
                    } else {
                        video.play();
                        playPauseBtn.textContent = 'Pause';
                    }
                    isPlaying = !isPlaying;
                };

                container.addEventListener('click', (e) => {
                    e.preventDefault(); // Prevent any default behavior
                    togglePlayPause();
                });

                playPauseBtn.addEventListener('click', (e) => {
                    e.stopPropagation(); // Prevent container click event from triggering
                    togglePlayPause();
                });

                video.addEventListener('play', () => {
                    playPauseBtn.style.display = 'none';
                    isPlaying = true;
                });

                video.addEventListener('pause', () => {
                    playPauseBtn.style.display = 'block';
                    isPlaying = false;
                });
            }
        });
    });
}

// Ensure the script runs when the DOM is ready or retry if content is hidden
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', enhanceVideos);
} else {
    enhanceVideos();
    // Retry if content is hidden
    if (document.querySelector('.section.hero-container.cards-container[style*="display: none"]')) {
        const observer = new MutationObserver((mutations) => {
            if (!document.querySelector('.section.hero-container.cards-container[style*="display: none"]')) {
                enhanceVideos();
                observer.disconnect();
            }
        });
        observer.observe(document.body, { attributes: true, subtree: true });
    }
}

export {
    isVideoUrl,
    getVideoMimeType,
    createVideoElement,
};