import { useEffect, useState } from "react";
import axios from "axios";

const RoleSelector = () => {
  const [roles, setRoles] = useState([]);
  const [selectedRole, setSelectedRole] = useState("");
  const [roadmap, setRoadmap] = useState([]);

  // Load role names
  useEffect(() => {
    axios.get("/roadmaps.json").then((res) => {
      setRoles(Object.keys(res.data));
    });
  }, []);

  const handleSelect = async (e) => {
    const role = e.target.value;
    setSelectedRole(role);

    const res = await axios.get("/roadmaps.json");
    setRoadmap(res.data[role] || []);
  };

  return (
    <div className="bg-gray-800 p-6 shadow rounded max-w-xl mx-auto mt-8">
      <label className="block mb-2 font-semibold text-blue-300">Choose Career Role</label>
      <select
        className="w-full border bg-gray-800 p-2 rounded mb-4"
        onChange={handleSelect}
        value={selectedRole}
      >
        <option value="">-- Select a Role --</option>
        {roles.map((role) => (
          <option key={role} value={role}>{role}</option>
        ))}
      </select>

      {roadmap.length > 0 && (
        <div className="mt-4">
          <h3 className="text-lg font-bold text-indigo-400 mb-2">
            Roadmap for {selectedRole}
          </h3>
          <ul className="list-decimal pl-6 space-y-1 text-yellow-300">
            {roadmap.map((step, idx) => (
              <li key={idx}>{step}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default RoleSelector;
