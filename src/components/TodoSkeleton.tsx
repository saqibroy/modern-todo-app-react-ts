const TodoSkeleton = () => {
  return (
    <div className="animate-pulse space-y-4">
      {[...Array(5)].map((_, index) => (
        <div
          key={index}
          className="p-4 border rounded-lg bg-white dark:bg-gray-800 shadow-md flex items-center space-x-4"
        >
          {/* Circle for checkbox or icon */}
          <div className="h-6 w-6 bg-gray-300 dark:bg-gray-700 rounded-full"></div>

          {/* Lines for text */}
          <div className="flex-1 space-y-2">
            <div className="h-4 bg-gray-300 dark:bg-gray-700 rounded w-3/4"></div>
            <div className="h-4 bg-gray-300 dark:bg-gray-700 rounded w-1/2"></div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default TodoSkeleton;
