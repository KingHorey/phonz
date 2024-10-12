import { useLocation } from "react-router-dom";

function Account() {
  const { state } = useLocation();
  return (
    <div className="w-full md:w-3/4 md:pl-8">
      <h2 className="text-xl font-bold mb-4">Edit Your Profile</h2>
      <form className="space-y-4">
        <div className="flex flex-wrap -mx-2">
          <div className="w-full md:w-1/2 px-2 mb-4">
            <label
              className="block text-sm font-medium mb-1"
              htmlFor="firstName"
            >
              First Name
            </label>
            <input
              type="text"
              id="firstName"
              className="w-full p-2 border rounded"
              value={state.user.first_name}
            />
          </div>
          <div className="w-full md:w-1/2 px-2 mb-4">
            <label
              className="block text-sm font-medium mb-1"
              htmlFor="lastName"
            >
              Last Name
            </label>
            <input
              type="text"
              id="lastName"
              className="w-full p-2 border rounded"
              value={state.user.last_name}
            />
          </div>
        </div>
        <div className="flex flex-wrap -mx-2">
          <div className="w-full md:w-1/2 px-2 mb-4">
            <label className="block text-sm font-medium mb-1" htmlFor="email">
              Email
            </label>
            <input
              type="email"
              id="email"
              className="w-full p-2 border rounded"
              value={state.user.email}
            />
          </div>
          <div className="w-full md:w-1/2 px-2 mb-4">
            <label className="block text-sm font-medium mb-1" htmlFor="address">
              Address
            </label>
            <input
              type="text"
              id="address"
              className="w-full p-2 border rounded"
              value={state.user.address || ""}
            />
          </div>
        </div>
        <div className="mb-4">
          <h3 className="text-lg font-semibold mb-2">Password Changes</h3>
          <input
            type="password"
            placeholder="Current Password"
            className="w-full p-2 border rounded mb-2"
          />
          <input
            type="password"
            placeholder="New Password"
            className="w-full p-2 border rounded mb-2"
          />
          <input
            type="password"
            placeholder="Confirm New Password"
            className="w-full p-2 border rounded"
          />
        </div>
        <div className="flex justify-end space-x-4">
          <button type="button" className="px-4 py-2 border rounded">
            Cancel
          </button>
          <button
            type="submit"
            className="px-4 py-2 bg-red-500 text-white rounded"
          >
            Save Changes
          </button>
        </div>
      </form>
    </div>
  );
}

export default Account;
