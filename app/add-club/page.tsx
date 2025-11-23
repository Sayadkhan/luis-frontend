"use client";

import React, { useState } from "react";
import axios from "axios";

interface LocationBlock {
  title: string;
  location: string;
  images: File[];
  imageKey: string;
}

interface BenefitBlock {
  title: string;
  shortDescription: string;
  image: File | null;
  imageKey: string;
}

const AddClubPage = () => {
  const [clubLogo, setClubLogo] = useState<File | null>(null);

  const [locations, setLocations] = useState<LocationBlock[]>([]);
  const [benefits, setBenefits] = useState<BenefitBlock[]>([]);

  const addLocation = () => {
    setLocations([
      ...locations,
      {
        title: "",
        location: "",
        images: [],
        imageKey: `loc_${locations.length}`,
      },
    ]);
  };

  const addBenefit = () => {
    setBenefits([
      ...benefits,
      {
        title: "",
        shortDescription: "",
        image: null,
        imageKey: `ben_${benefits.length}`,
      },
    ]);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const form = new FormData();

    form.append(
      "clubTitle",
      (document.getElementById("clubTitle") as HTMLInputElement).value
    );
    form.append(
      "clubDescription",
      (document.getElementById("clubDescription") as HTMLInputElement).value
    );
    form.append(
      "clubCategory",
      (document.getElementById("clubCategory") as HTMLInputElement).value
    );
    form.append(
      "clubPresidentName",
      (document.getElementById("clubPresidentName") as HTMLInputElement).value
    );
    form.append(
      "totalMembers",
      (document.getElementById("totalMembers") as HTMLInputElement).value
    );
    form.append(
      "status",
      (document.getElementById("status") as HTMLInputElement).value
    );

    form.append(
      "contactInfo",
      JSON.stringify({
        phone: (document.getElementById("phone") as HTMLInputElement).value,
        email: (document.getElementById("email") as HTMLInputElement).value,
        address: (document.getElementById("address") as HTMLInputElement).value,
      })
    );

    form.append("socialLinks", JSON.stringify([])); // You can expand later

    if (clubLogo) form.append("clubLogo", clubLogo);

    // Attach locations
    form.append("locationImages", JSON.stringify(locations));

    locations.forEach((loc) => {
      loc.images.forEach((img) => {
        form.append(`locationImages_${loc.imageKey}`, img);
      });
    });

    // Attach benefits
    form.append("benefits", JSON.stringify(benefits));

    benefits.forEach((ben) => {
      if (ben.image) {
        form.append(`benefitImages_${ben.imageKey}`, ben.image);
      }
    });

    try {
      const res = await axios.post(
        "http://localhost:8000/api/club/create",
        form,
        {
          headers: { "Content-Type": "multipart/form-data" },
        }
      );

      alert("Club Created Successfully!");
      console.log(res.data);
    } catch (error) {
      alert("Error creating club");
      console.error(error);
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6 bg-gray-50 min-h-screen">
      <h1 className="text-3xl font-bold mb-6">Create New Club</h1>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Club Logo */}
        <div>
          <label className="block font-medium">Club Logo</label>
          <input
            type="file"
            onChange={(e) => setClubLogo(e.target.files?.[0] || null)}
          />
        </div>

        {/* Basic Club Info */}
        <input id="clubTitle" placeholder="Club Title" className="input" />
        <textarea
          id="clubDescription"
          placeholder="Club Description"
          className="input"
        />
        <input id="clubCategory" placeholder="Category" className="input" />
        <input
          id="clubPresidentName"
          placeholder="President Name"
          className="input"
        />
        <input
          id="totalMembers"
          placeholder="Total Members"
          className="input"
        />
        <select id="status" className="input">
          <option value="active">Active</option>
          <option value="inactive">Inactive</option>
        </select>

        {/* Contact Info */}
        <h2 className="text-xl font-bold mt-6">Contact Information</h2>
        <input id="phone" placeholder="Phone" className="input" />
        <input id="email" placeholder="Email" className="input" />
        <input id="address" placeholder="Address" className="input" />

        {/* Dynamic Locations */}
        <h2 className="text-xl font-bold mt-6">Locations</h2>
        {locations.map((loc, index) => (
          <div key={index} className="p-4 border rounded mb-4 bg-white">
            <input
              placeholder="Location Title"
              className="input"
              value={loc.title}
              onChange={(e) => {
                const updated = [...locations];
                updated[index].title = e.target.value;
                setLocations(updated);
              }}
            />
            <input
              placeholder="Location Name"
              className="input"
              value={loc.location}
              onChange={(e) => {
                const updated = [...locations];
                updated[index].location = e.target.value;
                setLocations(updated);
              }}
            />

            <input
              type="file"
              multiple
              onChange={(e) => {
                const updated = [...locations];
                updated[index].images = Array.from(e.target.files || []);
                setLocations(updated);
              }}
            />
          </div>
        ))}

        <button type="button" onClick={addLocation} className="btn">
          + Add Location
        </button>

        {/* Benefits */}
        <h2 className="text-xl font-bold mt-6">Benefits</h2>
        {benefits.map((ben, index) => (
          <div key={index} className="p-4 border rounded mb-4 bg-white">
            <input
              placeholder="Benefit Title"
              className="input"
              value={ben.title}
              onChange={(e) => {
                const updated = [...benefits];
                updated[index].title = e.target.value;
                setBenefits(updated);
              }}
            />
            <input
              placeholder="Short Description"
              className="input"
              value={ben.shortDescription}
              onChange={(e) => {
                const updated = [...benefits];
                updated[index].shortDescription = e.target.value;
                setBenefits(updated);
              }}
            />

            <input
              type="file"
              onChange={(e) => {
                const updated = [...benefits];
                updated[index].image = e.target.files?.[0] || null;
                setBenefits(updated);
              }}
            />
          </div>
        ))}

        <button type="button" onClick={addBenefit} className="btn">
          + Add Benefit
        </button>

        {/* Submit */}
        <button type="submit" className="btn bg-blue-600 text-white">
          Create Club
        </button>
      </form>
    </div>
  );
};

export default AddClubPage;
