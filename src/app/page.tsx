"use client";

import { useState } from "react";
import axios from "axios";
import { Column, Row } from "./components";

export default function Home() {
  const [yearRange, setYearRange] = useState<[number, number]>([2000, 2020]);
  const [rating, setRating] = useState<string>("PG");
  const [runtime, setRuntime] = useState<[number, number]>([0, 120]);

  const handleYearChange = (value: [number, number]) => {
    setYearRange(value);
  };

  const handleRuntimeChange = (value: [number, number]) => {
    setRuntime(value);
  };

  const handleRatingChange = (value: string) => {
    setRating(value);
  };

  const handleSearch = async () => {
    console.log("Searching with:", { yearRange, rating, runtime });

    const apiEndpoint = "https://api.themoviedb.org/3/discover/movie";
    const apiKey = process.env.NEXT_PUBLIC_TMBD_API_TOKEN;

    const searchParams = {
      primary_release_date_gte: `${yearRange[0]}-01-01`,
      primary_release_date_lte: `${yearRange[1]}-12-31`,
      with_runtime_gte: runtime[0],
      with_runtime_lte: runtime[1],
      certification_country: "GB",
      certification: rating,
    };

    await axios
      .get(apiEndpoint, {
        headers: {
          Authorization: `Bearer ${apiKey}`,
        },
        params: { ...searchParams },
      })
      .then((response) => {
        console.log("Search results:", response.data);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  };

  return (
    <Column
      justify="center"
      align="center"
      className="min-h-screen bg-gray-100"
      gap={8}
    >
      <h1 className="text-4xl font-bold mb-2">Welcome to Movie Search</h1>
      <p className="text-lg text-gray-700">I want to watch a movie...</p>
      <label className="text-lg text-gray-700">From:</label>
      <Row gap={8}>
        <input
          type="number"
          placeholder="From"
          className="p-2 rounded-lg border border-gray-300"
          value={yearRange[0]}
          onChange={(e) =>
            handleYearChange([Number(e.target.value), yearRange[1]])
          }
        />
        <input
          type="number"
          placeholder="To"
          className="p-2 rounded-lg border border-gray-300"
          value={yearRange[1]}
          onChange={(e) =>
            handleYearChange([yearRange[0], Number(e.target.value)])
          }
        />
      </Row>
      <label className="text-lg text-gray-700">Rated:</label>
      <Row gap={4} className="items-center">
        <input
          type="radio"
          name="classification"
          value="U"
          className="mr-2"
          checked={rating === "U"}
          onChange={(e) => handleRatingChange(e.target.value)}
        />
        <label className="text-gray-700">U</label>
        <input
          type="radio"
          name="classification"
          value="PG"
          className="mx-2"
          checked={rating === "PG"}
          onChange={(e) => handleRatingChange(e.target.value)}
        />
        <label className="text-gray-700">PG</label>
        <input
          type="radio"
          name="classification"
          value="12"
          className="mx-2"
          checked={rating === "12"}
          onChange={(e) => handleRatingChange(e.target.value)}
        />
        <label className="text-gray-700">12</label>
        <input
          type="radio"
          name="classification"
          value="15"
          className="mx-2"
          checked={rating === "15"}
          onChange={(e) => handleRatingChange(e.target.value)}
        />
        <label className="text-gray-700">15</label>
        <input
          type="radio"
          name="classification"
          value="18"
          className="mx-2"
          checked={rating === "18"}
          onChange={(e) => handleRatingChange(e.target.value)}
        />
        <label className="text-gray-700">18</label>
      </Row>
      <label className="text-lg text-gray-700">With a running time of:</label>
      <Row gap={4}>
        <input
          type="number"
          placeholder="From"
          className="p-2 rounded-lg border border-gray-300"
          value={runtime[0]}
          onChange={(e) =>
            handleRuntimeChange([Number(e.target.value), runtime[1]])
          }
        />
        <input
          type="number"
          placeholder="To"
          className="p-2 rounded-lg border border-gray-300"
          value={runtime[1]}
          onChange={(e) =>
            handleRuntimeChange([runtime[0], Number(e.target.value)])
          }
        />
      </Row>
      <Column className="w-1/2">
        <button
          className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition"
          onClick={handleSearch}
        >
          Search
        </button>
      </Column>
    </Column>
  );
}
