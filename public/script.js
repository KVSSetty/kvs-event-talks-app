document.addEventListener('DOMContentLoaded', () => {
  const scheduleContainer = document.getElementById('schedule');
  const searchInput = document.getElementById('searchInput');
  const speakerSearchInput = document.getElementById('speakerSearchInput');
  let talks = [];

  fetch('/api/talks')
    .then(response => response.json())
    .then(data => {
      talks = data;
      renderSchedule(talks);
    });

  searchInput.addEventListener('input', () => {
    const searchTerm = searchInput.value.toLowerCase();
    const speakerSearchTerm = speakerSearchInput.value.toLowerCase();
    const filteredTalks = talks.filter(talk => {
      const categoryMatch = talk.categories.some(category => category.toLowerCase().includes(searchTerm));
      const speakerMatch = talk.speakers.some(speaker => speaker.toLowerCase().includes(speakerSearchTerm));
      return categoryMatch && speakerMatch;
    });
    renderSchedule(filteredTalks);
  });

  speakerSearchInput.addEventListener('input', () => {
    const searchTerm = searchInput.value.toLowerCase();
    const speakerSearchTerm = speakerSearchInput.value.toLowerCase();
    const filteredTalks = talks.filter(talk => {
      const categoryMatch = talk.categories.some(category => category.toLowerCase().includes(searchTerm));
      const speakerMatch = talk.speakers.some(speaker => speaker.toLowerCase().includes(speakerSearchTerm));
      return categoryMatch && speakerMatch;
    });
    renderSchedule(filteredTalks);
  });

  function renderSchedule(talksToRender) {
    scheduleContainer.innerHTML = '';
    let currentTime = new Date('2025-10-26T10:00:00');

    talksToRender.forEach((talk, index) => {
      if (index === 3) { // Lunch Break after the 3rd talk
        const lunchBreakItem = createBreakItem(currentTime, 'Lunch Break', 60);
        scheduleContainer.appendChild(lunchBreakItem);
        currentTime.setMinutes(currentTime.getMinutes() + 60);
      }

      const talkItem = createTalkItem(talk, currentTime);
      scheduleContainer.appendChild(talkItem);
      currentTime.setMinutes(currentTime.getMinutes() + talk.duration);

      if (index < talks.length - 1 && index !== 2) { // Add 10-minute break
        const breakItem = createBreakItem(currentTime, 'Break', 10);
        scheduleContainer.appendChild(breakItem);
        currentTime.setMinutes(currentTime.getMinutes() + 10);
      }
    });
  }

  function createTalkItem(talk, startTime) {
    const endTime = new Date(startTime.getTime() + talk.duration * 60000);
    const item = document.createElement('div');
    item.className = 'schedule-item';

    item.innerHTML = `
      <div class="time-slot">${formatTime(startTime)} - ${formatTime(endTime)}</div>
      <div class="talk-title">${talk.title}</div>
      <div class="speakers">By: ${talk.speakers.join(', ')}</div>
      <p>${talk.description}</p>
      <div class="categories">
        ${talk.categories.map(cat => `<span class="category">${cat}</span>`).join('')}
      </div>
    `;
    return item;
  }

  function createBreakItem(startTime, title, duration) {
    const endTime = new Date(startTime.getTime() + duration * 60000);
    const item = document.createElement('div');
    item.className = 'schedule-item break';
    item.innerHTML = `
      <div class="time-slot">${formatTime(startTime)} - ${formatTime(endTime)}</div>
      <div>${title}</div>
    `;
    return item;
  }

  function formatTime(date) {
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  }
});
