const GITHUB_USERNAME = 'rajshivthare21';

document.addEventListener('DOMContentLoaded', () => {
    // Single Line Headline for Software Developer focus
    const typedElement = document.getElementById('typed');
    if (typedElement) {
        new Typed('#typed', {
            strings: ['Software Developer'],
            typeSpeed: 60,
            showCursor: true,
            cursorChar: '|',
            loop: false 
        });
    }

    loadGitHubProjects();
});

async function loadGitHubProjects() {
    const container = document.getElementById('projects-container');
    try {
        const response = await fetch(`https://api.github.com/users/${GITHUB_USERNAME}/repos?sort=updated&per_page=6`);
        const repos = await response.json();
        
        if (Array.isArray(repos)) {
            container.innerHTML = repos.map(repo => `
                <div class="p-8 rounded-3xl bg-[#1e293b] border border-slate-700 hover:border-blue-500 transition-all duration-300">
                    <div class="flex justify-between items-center mb-6">
                        <div class="w-12 h-12 bg-blue-900/30 rounded-xl flex items-center justify-center text-blue-500">
                            <i class="fas fa-server"></i>
                        </div>
                        <a href="${repo.html_url}" target="_blank" class="text-slate-500 hover:text-white transition">
                            <i class="fab fa-github text-xl"></i>
                        </a>
                    </div>
                    <h3 class="text-lg font-bold mb-3 text-white uppercase tracking-tight">${repo.name.replace(/-/g, ' ')}</h3>
                    <p class="text-slate-400 text-sm mb-6 h-12 overflow-hidden italic leading-relaxed italic">
                        ${repo.description || 'System development and software engineering project.'}
                    </p>
                    <span class="text-[10px] font-extrabold px-3 py-1 bg-blue-900/50 text-blue-400 rounded-md uppercase tracking-widest">
                        ${repo.language || 'System'}
                    </span>
                </div>
            `).join('');
        }
    } catch (e) {
        container.innerHTML = `<p class="col-span-full text-center text-slate-500 italic font-medium">Syncing with GitHub repositories...</p>`;
    }
}