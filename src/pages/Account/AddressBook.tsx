import { PlusCircle, Pencil, Trash2 } from "lucide-react";

const AddressBook = () => {
  const addresses = [
    {
      id: 1,
      name: "Home",
      address: "123 Main St, Anytown, USA 12345",
      isDefault: true,
    },
    {
      id: 2,
      name: "Work",
      address: "456 Office Blvd, Workville, USA 67890",
      isDefault: false,
    },
  ];

  return (
    <div className="flex flex-col md:flex-row min-w-[320px] p-4">
      <div className="w-full md:w-3/4 md:pl-8">
        <h2 className="text-xl font-bold mb-4">Address Book</h2>
        <div className="mb-4">
          <button className="flex items-center text-red-500">
            <PlusCircle className="mr-2" size={20} />
            Add New Address
          </button>
        </div>
        <div className="space-y-4">
          {addresses.map((address) => (
            <div key={address.id} className="border p-4 rounded">
              <div className="flex justify-between items-start mb-2">
                <h3 className="font-semibold">{address.name}</h3>
                <div className="space-x-2">
                  <button className="text-gray-500">
                    <Pencil size={18} />
                  </button>
                  <button className="text-gray-500">
                    <Trash2 size={18} />
                  </button>
                </div>
              </div>
              <p className="text-gray-600 mb-2">{address.address}</p>
              {address.isDefault && (
                <span className="bg-gray-200 text-gray-700 text-xs px-2 py-1 rounded">
                  Default Address
                </span>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AddressBook;
