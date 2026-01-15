import React, { useEffect, useState } from "react";
import { useDropzone } from "react-dropzone";
import { TextField, Autocomplete, Chip } from "@mui/material";
import { GrEdit } from "react-icons/gr";
import { MdDeleteOutline } from "react-icons/md";
import axios from "axios";
import toast from "react-hot-toast";
import { Link } from "react-router-dom";

const AddRooms = () => {
  const [roomType, setRoomType] = useState("Standard");
  const [files, setFiles] = useState([]);
  const [amenities, setAmenities] = useState([]);
  const [supplies, setSupplies] = useState([]);
  const [units, setUnits] = useState("");
  const [area, setArea] = useState("");
  const [members, setMembers] = useState("");
  const [availablities, setAvailabilities] = useState("");
  const [roomData, setRoomData] = useState([]);
  const [fielderror, setError] = useState("");

  const fixedAmenities = ["Wifi", "Private Shower"];
  const allAmenities = [...fixedAmenities, "Breakfast", "TV", "Air Conditioning"];

  const fixedSupplies = ["Soap"];
  const allSupplies = [...fixedSupplies, "Towels", "Shampoo", "Kettle"];

  const allUnits = ["sq.ft", "meter", "inches"];

  const onDrop = (acceptedFiles) => {
    setFiles((prev) => [...prev, ...acceptedFiles]);
  };

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    accept: { "image/*": [] },
  });

  const getAllRooms = async () => {
    const res = await fetch(`${import.meta.env.VITE_API_BASE_URL}rooms/getrooms`);
    const data = await res.json();
    setRoomData(data.existingRooms || []);
  };

  useEffect(() => {
    getAllRooms();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("roomtype", roomType);
    formData.append("members", members);
    formData.append("availablities", availablities);
    formData.append("areaInSqft", `${area} ${units}`);

    amenities.forEach((a) => formData.append("amenities[]", a));
    supplies.forEach((s) => formData.append("itemsprovided[]", s));
    files.forEach((f) => formData.append("files", f));

    try {
      const res = await fetch(`${import.meta.env.VITE_API_BASE_URL}rooms/addrooms`, {
        method: "POST",
        body: formData,
      });

      const data = await res.json();

      if (res.ok) {
        setRoomData((prev) => [...prev, data.newRoom]);
        toast.success("Room added successfully");
        setFiles([]);
      } else {
        setError(data.message || "Something went wrong");
      }
    } catch (error) {
      toast.error("Server error");
    }
  };

  const deleteHandler = async (id) => {
    await axios.post(`${import.meta.env.VITE_API_BASE_URL}rooms/deleteRoomById`, { id });
    setRoomData((prev) => prev.filter((r) => r._id !== id));
    toast.success("Room deleted");
  };

  // 🔹 VIEW ALL INQUIRIES BUTTON HANDLER
  const viewAllInquiries = () => {
    window.location.href = "/admin/inquiries";
  };

  return (
    <div className="min-h-[calc(100vh-80px)] bg-gradient-to-br from-slate-900 via-black to-slate-950 p-6">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">

        {/* ================= ADD ROOM FORM ================= */}
        <form
          onSubmit={handleSubmit}
          className="lg:col-span-4 bg-white rounded-2xl p-6 shadow-xl sticky top-24"
        >
          <h2 className="text-2xl font-semibold mb-6 text-center">
            Add New Room
          </h2>

          <select
            className="w-full p-3 rounded-lg border mb-4"
            value={roomType}
            onChange={(e) => setRoomType(e.target.value)}
          >
            <option>Standard</option>
            <option>Single Bed</option>
            <option>Double Bed</option>
          </select>

          <Autocomplete
            multiple
            options={allAmenities}
            value={amenities}
            onChange={(e, v) =>
              setAmenities([
                ...fixedAmenities,
                ...v.filter((x) => !fixedAmenities.includes(x)),
              ])
            }
            renderTags={(value, getTagProps) =>
              value.map((option, index) => (
                <Chip
                  key={index}
                  label={option}
                  {...getTagProps({ index })}
                  disabled={fixedAmenities.includes(option)}
                />
              ))
            }
            renderInput={(params) => (
              <TextField {...params} label="Amenities" className="mb-4" />
            )}
          />

          <div className="grid grid-cols-2 gap-4 mb-4">
            <TextField label="Members" onChange={(e) => setMembers(e.target.value)} />
            <TextField
              label="Availability"
              onChange={(e) => setAvailabilities(e.target.value)}
            />
          </div>

          <div className="grid grid-cols-3 gap-4 mb-4">
            <TextField label="Area" onChange={(e) => setArea(e.target.value)} />
            <Autocomplete
              options={allUnits}
              value={units}
              onChange={(e, v) => setUnits(v)}
              renderInput={(params) => <TextField {...params} label="Unit" />}
            />
          </div>

          <Autocomplete
            multiple
            options={allSupplies}
            value={supplies}
            onChange={(e, v) =>
              setSupplies([
                ...fixedSupplies,
                ...v.filter((x) => !fixedSupplies.includes(x)),
              ])
            }
            renderInput={(params) => (
              <TextField {...params} label="Supplies" className="mb-4" />
            )}
          />

          {/* DROPZONE */}
          <div
            {...getRootProps()}
            className="border-2 border-dashed rounded-xl p-6 text-center cursor-pointer"
          >
            <input {...getInputProps()} />
            <p className="text-sm">Drag & drop images</p>
          </div>

          {/* IMAGE PREVIEW */}
          <div className="grid grid-cols-3 gap-3 mt-4">
            {files.map((file, i) => (
              <div key={i} className="relative">
                <img
                  src={URL.createObjectURL(file)}
                  className="h-24 w-full object-cover rounded-lg"
                />
                <button
                  type="button"
                  onClick={() => setFiles(files.filter((_, x) => x !== i))}
                  className="absolute top-1 right-1 bg-black text-white px-2 rounded-full"
                >
                  ×
                </button>
              </div>
            ))}
          </div>

          <button className="mt-6 w-full bg-blue-600 hover:bg-blue-700 py-3 rounded-xl text-white font-semibold">
            Save Room
          </button>

          {fielderror && <p className="text-red-500 mt-2">{fielderror}</p>}
        </form>

        {/* ================= ROOM LIST ================= */}
        <div className="lg:col-span-8 text-white">

          {/* HEADER WITH SINGLE BUTTON */}
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-semibold">All Rooms</h2>

            <button
              // onClick={viewAllInquiries}
              className="px-5 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-medium shadow-lg"
            >
            <Link className='mx-3' style={{ textDecoration: 'none', color: 'white' }} to="/admin/inquiries">View All Inquiries</Link>
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
            {roomData.map((room) => (
              <div
                key={room._id}
                className="rounded-2xl overflow-hidden bg-white/10 backdrop-blur-xl"
              >
                <div className="relative h-[260px]">
                  <img
                    src={`${import.meta.env.VITE_API_BASE_URL}uploads/${room.filepaths[0]}`}
                    className="h-full w-full object-cover"
                  />

                  <div className="absolute top-3 right-3 flex gap-2">
                    <button className="p-2 bg-black/70 rounded-full">
                      <GrEdit className="text-white text-sm" />
                    </button>
                    <button
                      onClick={() => deleteHandler(room._id)}
                      className="p-2 bg-red-600 rounded-full"
                    >
                      <MdDeleteOutline className="text-white text-sm" />
                    </button>
                  </div>
                </div>

                <div className="p-5">
                  <h3 className="text-lg font-semibold">{room.roomType}</h3>
                  <p className="text-sm text-white/70">
                    {room.members} Guests · {room.availablities || "Available"}
                  </p>
                </div>
              </div>
            ))}
          </div>

        </div>
      </div>
    </div>
  );
};

export default AddRooms;
