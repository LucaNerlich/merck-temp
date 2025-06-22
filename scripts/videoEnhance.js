// videoEnhance.js
export function enhanceVideos() {
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