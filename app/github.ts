const GITHUB_USER = 'trymybest888';

export const GITHUB_PROFILE = `https://github.com/${GITHUB_USER}`;

export type Repo = {
  name: string;
  description: string | null;
  url: string;
  homepage: string | null;
  language: string | null;
  pushedAt: string;
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
};

// Public, non-fork repos, most recently pushed first. Refreshed at most once an hour.
export async function getRepos(): Promise<Repo[]> {
  try {
    const response = await fetch(`https://api.github.com/users/${GITHUB_USER}/repos?sort=pushed&per_page=100`, {
      // GitHub rejects requests without a User-Agent (403); Workers runtimes don't add one.
      headers: { Accept: 'application/vnd.github+json', 'User-Agent': `${GITHUB_USER}-portfolio` },
      next: { revalidate: 3600 },
    });
    if (!response.ok) return [];
    const repos = (await response.json()) as GitHubRepo[];
    return repos
      .filter(repo => !repo.fork && !repo.archived && !repo.private)
      .map(repo => ({
        name: repo.name,
        description: repo.description || null,
        url: repo.html_url,
        homepage: repo.homepage || null,
        language: repo.language,
        pushedAt: repo.pushed_at,
      }));
  } catch {
    return [];
  }
}
