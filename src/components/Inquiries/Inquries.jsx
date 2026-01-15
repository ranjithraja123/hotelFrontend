import { useEffect, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";

const Inquiries = () => {
  const [inquiries, setInquiries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const fetchInquiries = async () => {
    try {
      setLoading(true);
      const res = await axios.post(
        `${import.meta.env.VITE_API_BASE_URL}rooms/getAllInquiries`
      );

      if (res.data.success) {
        setInquiries(res.data.data);
      }
    } catch {
      setError("Failed to load inquiries");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchInquiries();
  }, []);

  const updateStatus = async (id, status) => {
    try {
      await axios.post(
        `${import.meta.env.VITE_API_BASE_URL}rooms/updateInquiryStatus`,
        { inquiryId: id, status }
      );

      setInquiries((prev) =>
        prev.map((inq) =>
          inq._id === id ? { ...inq, status } : inq
        )
      );

      toast.success(`Inquiry ${status.toLowerCase()}`);
    } catch {
      toast.error("Action failed");
    }
  };

  const statusBadge = (status = "Pending") => {
    const base =
      "px-3 py-1 rounded-full text-xs font-semibold tracking-wide";

    if (status === "Accepted")
      return (
        <span className={`${base} bg-green-500/30 text-green-200`}>
          Accepted
        </span>
      );

    if (status === "Cancelled")
      return (
        <span className={`${base} bg-red-500/30 text-red-200`}>
          Cancelled
        </span>
      );

    return (
      <span className={`${base} bg-yellow-500/30 text-yellow-200`}>
        Pending
      </span>
    );
  };

  return (
    <div className="w-full min-h-screen bg-black/20 p-6 text-white">

      {/* HEADER */}
      <div className="mb-6">
        <h2 className="text-2xl font-semibold tracking-wide">
          Customer Inquiries
        </h2>
      </div>

      {loading && (
        <p className="text-center py-16 text-white/60">
          Loading inquiries...
        </p>
      )}

      {error && (
        <p className="text-center py-16 text-red-400">
          {error}
        </p>
      )}

      {!loading && inquiries.length === 0 && (
        <p className="text-center py-16 text-white/60">
          No inquiries found
        </p>
      )}

      {!loading && inquiries.length > 0 && (
        <table className="w-full border-collapse rounded-2xl overflow-hidden bg-black/30 backdrop-blur-xl shadow-2xl ring-1 ring-white/10">

          <thead className="bg-black/30 text-xs uppercase text-white/90">
            <tr>
              <th className="px-5 py-4 text-left">#</th>
              <th className="px-5 py-4 text-left">Email</th>
              <th className="px-5 py-4 text-left">Phone</th>
              <th className="px-5 py-4 text-left">From</th>
              <th className="px-5 py-4 text-left">To</th>
              <th className="px-5 py-4 text-center">Adults</th>
              <th className="px-5 py-4 text-center">Children</th>
              <th className="px-5 py-4 text-left">Room Type</th>
              <th className="px-5 py-4 text-center">Status</th>
              <th className="px-5 py-4 text-center">Actions</th>
            </tr>
          </thead>

          <tbody>
            {inquiries.map((inq, index) => (
              <tr
                key={inq._id}
                className="border-t border-white/10 hover:bg-black/20 transition"
              >
                <td className="px-5 py-4">{index + 1}</td>
                <td className="px-5 py-4">{inq.email}</td>
                <td className="px-5 py-4">{inq.phoneNumber}</td>
                <td className="px-5 py-4">
                  {new Date(inq.fromDate).toLocaleDateString()}
                </td>
                <td className="px-5 py-4">
                  {new Date(inq.toDate).toLocaleDateString()}
                </td>
                <td className="px-5 py-4 text-center">{inq.adults}</td>
                <td className="px-5 py-4 text-center">
                  {inq.children || 0}
                </td>
                <td className="px-5 py-4 font-medium">
                  {inq.roomType}
                </td>

                <td className="px-5 py-4 text-center">
                  {statusBadge(inq.status)}
                </td>

                <td className="px-5 py-4 text-center">
                  <div className="flex justify-center gap-3">
                    <button
                      disabled={inq.status !== "Pending"}
                      onClick={() => updateStatus(inq._id, "Accepted")}
                      className={`px-4 py-1.5 rounded-lg text-xs font-semibold
                        ${
                          inq.status === "Pending"
                            ? "bg-green-600 hover:bg-green-700"
                            : "bg-white/10 cursor-not-allowed"
                        }`}
                    >
                      Accept
                    </button>

                    <button
                      disabled={inq.status !== "Pending"}
                      onClick={() => updateStatus(inq._id, "Cancelled")}
                      className={`px-4 py-1.5 rounded-lg text-xs font-semibold
                        ${
                          inq.status === "Pending"
                            ? "bg-red-600 hover:bg-red-700"
                            : "bg-white/10 cursor-not-allowed"
                        }`}
                    >
                      Cancel
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>

        </table>
      )}
    </div>
  );
};

export default Inquiries;
