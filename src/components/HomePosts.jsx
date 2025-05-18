import { IF } from '../url';

const HomePosts = ({ post }) => {
  return (
    <div className="w-full flex flex-col p-4">
      {/* Image */}
      <div className="w-full h-[200px] mb-3">
        <img
          src={IF + post.photo}
          alt={post.title}
          className="h-full w-full object-cover rounded-lg"
        />
      </div>

      {/* Content */}
      <div className="flex flex-col">
        <h1 className="text-xl md:text-2xl font-bold text-white mb-2 hover:text-teal-500 transition-colors">
          {post.title}
        </h1>
        <div className="flex mb-2 text-sm md:text-base font-semibold text-gray-200 items-center justify-between">
          <p>@{post.username}</p>
          <div className="flex space-x-2">
            <p>{new Date(post.updatedAt).toString().slice(0, 15)}</p>
            <p>{new Date(post.updatedAt).toString().slice(16, 24)}</p>
          </div>
        </div>
        <p className="text-sm md:text-base text-gray-300 leading-relaxed line-clamp-3">
          {post.desc.slice(0, 150) + (post.desc.length > 150 ? " ...Read more" : "")}
        </p>
      </div>
    </div>
  );
};

export default HomePosts;