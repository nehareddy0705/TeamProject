import React, { useState } from "react";
import * as theme from "../styles/Common";
import { API_BASE_URL } from "../config/api";

function FundraisingPage() {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    goalAmount: "",
    deadline: "",
  });
  const [message, setMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");
    setIsSubmitting(true);

    try {
      const response = await fetch(`${API_BASE_URL}/campaign-api/campaign`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({
          ...formData,
          goalAmount: Number(formData.goalAmount),
        }),
      });

      const data = await response.json();
      if (response.ok) {
        setMessage("Fundraising campaign created successfully.");
        setFormData({ title: "", description: "", goalAmount: "", deadline: "" });
      } else {
        setMessage(data.message || "Unable to create campaign.");
      }
    } catch (error) {
      console.error("Create campaign error:", error);
      setMessage("Something went wrong while creating the campaign.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className={theme.pageBackground}>
      <div className={theme.pageWrapper}>
        <h1 className={theme.pageTitle}>Fundraising Page</h1>
        <p className={theme.body + " mb-8"}>
          You are logged in. Create your fundraiser below.
        </p>

        <form className={theme.formCard} onSubmit={handleSubmit}>
          <div className={theme.formGroup}>
            <label className={theme.label}>Campaign title</label>
            <input
              className={theme.input}
              type="text"
              name="title"
              value={formData.title}
              onChange={handleChange}
              required
            />
          </div>

          <div className={theme.formGroup}>
            <label className={theme.label}>Description</label>
            <textarea
              className={theme.input + " min-h-32"}
              name="description"
              value={formData.description}
              onChange={handleChange}
              required
            />
          </div>

          <div className={theme.formGroup}>
            <label className={theme.label}>Goal amount</label>
            <input
              className={theme.input}
              type="number"
              min="1"
              name="goalAmount"
              value={formData.goalAmount}
              onChange={handleChange}
              required
            />
          </div>

          <div className={theme.formGroup}>
            <label className={theme.label}>Deadline</label>
            <input
              className={theme.input}
              type="date"
              name="deadline"
              value={formData.deadline}
              onChange={handleChange}
              required
            />
          </div>

          <button className={theme.submit} type="submit">
            {isSubmitting ? "Creating..." : "Create Campaign"}
          </button>

          {message ? <p className={theme.loading}>{message}</p> : null}
        </form>
      </div>
    </div>
  );
}

export default FundraisingPage;
