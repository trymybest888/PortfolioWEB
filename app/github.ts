const GITHUB_USER = 'trymybest888';

export const GITHUB_PROFILE = `https://github.com/${GITHUB_USER}`;

export type Repo = {
  name: string;
  description: string | null;
  url: string;
  homepage: string | null;
  language: string | null;
  pushedAt: string;
  // Upstream repo for forks, e.g. { name: 'owner/repo', url: 'https://github.com/owner/repo' }.
  forkOf: { name: string; url: string } | null;
};

type GitHubRepo = {
  name: string;
  description: string | null;
  html_url: string;
  homepage: string | null;
  language: string | null;
  pushed_at: string;
  fork: boolean;
  archived: boolean;
  private: boolean;
  parent?: { full_name: string; html_url: string };
};

// GitHub rejects requests without a User-Agent (403); Workers runtimes don't add one.
const requestInit = {
  headers: { Accept: 'application/vnd.github+json', 'User-Agent': `${GITHUB_USER}-portfolio` },
  next: { revalidate: 3600 },
};

// The repo list omits a fork's upstream; only the single-repo endpoint includes `parent`.
async function getForkParent(name: string): Promise<Repo['forkOf']> {
  try {
    const response = await fetch(`https://api.github.com/repos/${GITHUB_USER}/${name}`, requestInit);
    if (!response.ok) return null;
    const { parent } = (await response.json()) as GitHubRepo;
    return parent ? { name: parent.full_name, url: parent.html_url } : null;
  } catch {
    return null;
  }
}

// Public repos, forks included, most recently pushed first. Refreshed at most once an hour.
export async function getRepos(): Promise<Repo[]> {
  try {
    const response = await fetch(`https://api.github.com/users/${GITHUB_USER}/repos?sort=pushed&per_page=100`, requestInit);
    if (!response.ok) return [];
    const repos = (await response.json()) as GitHubRepo[];
    return await Promise.all(repos
      .filter(repo => !repo.archived && !repo.private)
      .map(async repo => ({
        name: repo.name,
        description: repo.description || null,
        url: repo.html_url,
        homepage: repo.homepage || null,
        language: repo.language,
        pushedAt: repo.pushed_at,
        forkOf: repo.fork ? await getForkParent(repo.name) : null,
      })));
  } catch {
    return [];
  }
}
