import { userProps } from '../store'; // Import the userProps type from your store

// Define the props type for the UserCard component
type UserCardProps = {
  user: userProps;
};

// Component definition without React.FC
export default function UserCard({ user }: UserCardProps){
  return (
    <div className="w-full m-3 max-w-sm mx-auto bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300">
      <div className="flex items-center p-4">
        {/* Avatar */}
        <img
          src={user.avatar_url}
          alt={user.login}
          className="h-16 w-16 rounded-full border-2 border-gray-300 mr-4"
        />

        {/* User Info */}
        <div>
          <h3 className="text-xl font-semibold text-gray-800">{user.login}</h3>
          <p className="text-gray-600 text-sm">ID: {user.id}</p>
          <a
            href={user.html_url}
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-500 hover:underline text-sm"
          >
            View Profile
          </a>
        </div>
      </div>

      {/* Additional Info */}
      {/* <div className="bg-gray-50 px-4 py-3">
        <p className="text-sm text-gray-500">Type: {user.type}</p>
        <p className="text-sm text-gray-500">Score: {user.score}</p>
        <div className="flex justify-between mt-3">
        </div>
      </div> */}
    </div>
  );
};
