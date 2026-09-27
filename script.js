const repoList = document.getElementById('repo-list');

fetch('events.json')
  .then((response) => {
    if (!response.ok) {
      throw new Error('Unable to load starred repositories.');
    }
    return response.json();
  })
  .then((repositories) => {
    if (!Array.isArray(repositories) || repositories.length === 0) {
      throw new Error('No starred repositories found.');
    }

    repositories.forEach((repo) => {
      const item = document.createElement('li');
      item.className = 'repo-item';

      const starsLabel = repo.stars?.toLocaleString?.() ?? '0';

      item.innerHTML = `
        <div class="repo-header">
          <a class="repo-name" href="${repo.url}" target="_blank" rel="noreferrer">${repo.name}</a>
          <span class="star-badge">★ ${starsLabel}</span>
        </div>
        <p class="repo-description">${repo.description}</p>
        <div class="repo-meta">
          <span class="repo-language">${repo.language}</span>
        </div>
      `;

      repoList.appendChild(item);
    });
  })
  .catch((error) => {
    const errorItem = document.createElement('li');
    errorItem.className = 'error';
    errorItem.textContent = error.message;
    repoList.appendChild(errorItem);
  });
