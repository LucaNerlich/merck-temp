import { createOptimizedPicture } from './aem.js';

/**
 * Determines if the provided URL points to a video file based on its extension.
 *
 * @param {string} url - The URL to be checked for being a video link. It is assumed that the URL is a string and contains the path or filename which may end with a known video file extension.
 * @return {boolean} Returns `true` if the URL ends with an extension typically associated with video files, otherwise returns `false`.
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
 * The function checks the extension of this string to determine the appropriate MIME type.
 *
 * @return {string} - The MIME type associated with the given video file extension,
 * such as 'video/mp4', 'video/webm', etc. If no known extensions are found in the URL,
 * it defaults to 'video/mp4'.
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
 * @param {Object} posterImage - An object representing the poster image with `src` and `alt` properties.
 * @param {string} posterImage.src - The source URL of the poster image.
 * @param {string} posterImage.alt - Alternative text for the poster image.
 * @param {string} videoUrl - The source URL of the video to be played.
 *
 * @returns {HTMLElement} A `div` element containing a configured `video` element with controls, poster image, and specified source URL.
 */
function createVideoElement(posterImage, videoUrl) {
    const optimizedPicture = createOptimizedPicture(posterImage.src, posterImage.alt, false, [{ width: '750' }]);
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
 * Replaces native video controls with custom play/pause controls within the specified block.
 *
 * @param {HTMLElement} block - The root HTMLElement containing `.video-container` elements. This method will search for video elements within these containers and replace their native controls with custom interactive buttons.
 * @return {void} This function does not return a value.
 */
function replaceControls(block) {
    const parentContainers = block.querySelectorAll('.video-container');

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
                    } else {
                        video.play();
                    }
                    isPlaying = !isPlaying;
                };

                container.addEventListener('click', (e) => {
                    e.preventDefault();
                    togglePlayPause();
                });

                playPauseBtn.addEventListener('click', (e) => {
                    e.stopPropagation();
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

export {
    isVideoUrl,
    getVideoMimeType,
    createVideoElement,
    replaceControls,
};
