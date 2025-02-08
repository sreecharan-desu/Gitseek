type UserCardProps = {
  user: {
    login: string;
    id: number;
    avatar_url: string;
    html_url: string;
    followers_url: string;
    following_url: string;
    gists_url: string;
    starred_url: string;
    subscriptions_url: string;
    organizations_url: string;
    events_url: string;
    received_events_url: string;
    repos_url: string;
    type: string;
    site_admin: boolean;
  };
  accessToken: string;
};

export default function UserCard({ user }: UserCardProps) {
  return (
    <div className="w-full max-w-md mx-auto bg-gray-800 rounded-xl shadow-lg hover:shadow-2xl transition-all p-6">
      {/* Minimal View */}
      <a
        href={user.html_url}
        target="_blank"
        rel="noopener noreferrer"
        className="flex items-center gap-2 px-4 py-2 text-white rounded-lg hover:bg-gray-900 transition-colors duration-300"
      >
        <div className="flex items-center gap-4 mb-4">
          <img
            src={user.avatar_url}
            alt={user.login}
            className="h-20 w-20 rounded-full border-4 border-gray-500 transition-all transform hover:scale-105"
          />
          <div>
            <h3 className="text-2xl font-semibold text-white">{user.login}</h3>
            <p className="text-gray-400 text-sm">GitHub ID: {user.id}</p>
            <p className="text-gray-300 text-xs">Type: {user.type} {user.site_admin && "(Admin)"}</p>
          </div>
        </div>

      </a>
    </div>
  );
}
