"use client";

import { FormEvent, useState } from "react";

export default function CreateEventPage() {
  const [eventName, setEventName] = useState("");
  const [date, setDate] = useState("");
  const [description, setDescription] = useState("");
  const [photo, setPhoto] = useState<File | null>(null);

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();

    setMessage("");

    if (!photo) {
      setMessage("Please select a photo.");
      return;
    }

    try {
      setLoading(true);

      const formData = new FormData();

      formData.append("eventName", eventName);
      formData.append("date", date);
      formData.append("description", description);
      formData.append("photo", photo);

      const response = await fetch("/api/events", {
        method: "POST",
        body: formData,
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data.message || "Failed to create event"
        );
      }

      setMessage("Event created successfully!");

      setEventName("");
      setDate("");
      setDescription("");
      setPhoto(null);

      const fileInput = document.getElementById(
        "photo"
      ) as HTMLInputElement;

      if (fileInput) {
        fileInput.value = "";
      }
    } catch (error) {
      console.error(error);

      setMessage(
        error instanceof Error
          ? error.message
          : "Something went wrong"
      );
    } finally {
      setLoading(false);
    }
  }

  return (
    <main
      style={{
        maxWidth: "700px",
        margin: "60px auto",
        padding: "0 24px",
      }}
    >
      <h1>Create Event</h1>

      <form
        onSubmit={handleSubmit}
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "20px",
          marginTop: "30px",
        }}
      >
        {/* Event Name */}

        <div>
          <label>Event Name</label>

          <input
            type="text"
            value={eventName}
            onChange={(e) =>
              setEventName(e.target.value)
            }
            placeholder="Inter IIT Sports Meet"
            required
          />
        </div>

        {/* Photo */}

        <div>
          <label>Photo</label>

          <input
            id="photo"
            type="file"
            accept="image/*"
            onChange={(e) =>
              setPhoto(e.target.files?.[0] || null)
            }
            required
          />
        </div>

        {/* Date */}

        <div>
          <label>Date</label>

          <input
            type="date"
            value={date}
            onChange={(e) =>
              setDate(e.target.value)
            }
            required
          />
        </div>

        {/* Description */}

        <div>
          <label>Description</label>

          <textarea
            value={description}
            onChange={(e) =>
              setDescription(e.target.value)
            }
            placeholder="Inter IIT Sports Meet featuring teams from IITs across India."
            rows={5}
            required
          />
        </div>

        {/* Submit */}

        <button
          type="submit"
          disabled={loading}
        >
          {loading ? "Uploading..." : "Create Event"}
        </button>

        {message && (
          <p>{message}</p>
        )}
      </form>
    </main>
  );
}