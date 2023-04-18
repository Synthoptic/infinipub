async function fetchVideos(thirdPartyId) {
  const response = await fetch(`https://infini-view-synthoptic.vercel.app/api/fetch_videos/?third_party_id=${thirdPartyId}`);
  const data = await response.json();
  return data;
}

async function fetchEmbedCode(videoUrl) {
  const response = await fetch(`https://infini-view-synthoptic.vercel.app/api/fetch_embed/?video_url=${encodeURIComponent(videoUrl)}`);
  const data = await response.json();
  return data.embed_code;
}

async function initVideoSlider(thirdPartyId) {
  const videos = await fetchVideos(thirdPartyId);

  const sliderContainer = document.querySelector('.video-slider-container');
  sliderContainer.innerHTML = '';

  for (const video of videos) {
    const sliderItem = document.createElement('div');
    sliderItem.classList.add('video-slider-item');
    sliderItem.style.backgroundImage = `url(${video.cover_url})`;
    sliderItem.onclick = async () => {
      const embedCode = await fetchEmbedCode(video.video_url);
      const modal = document.createElement('div');
      modal.innerHTML = embedCode;
      document.body.appendChild(modal);
      // Add code here to display the modal and close it when clicked outside
    };
    sliderContainer.appendChild(sliderItem);
  }
}
