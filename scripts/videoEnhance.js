// videoEnhance.js
export function enhanceVideos(block) {
    // Target parent containers within the provided block
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
