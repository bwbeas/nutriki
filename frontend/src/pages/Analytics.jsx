import { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import API from "../api";

import {
  Paper,
  Button
} from "@mui/material";

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer
} from "recharts";

export default function Analytics() {

  const [analytics, setAnalytics] =
    useState(null);

  const loadAnalytics = async () => {

    try {

      const res =
  await API.get(
    `/analytics/?week_offset=${weekOffset}`
  );

      setAnalytics(
        res.data
      );

    }

    catch (error) {

      console.error(error);

    }

  };
  const [weekOffset, setWeekOffset] =
  useState(0);

  useEffect(() => {

  loadAnalytics();

}, [weekOffset]);

  return (

    <>
      <Navbar />

      <div
  style={{
    maxWidth: "900px",
    margin: "40px auto"
  }}
>

  <h2>
    💓analysis of how you've been doing over the weeks:
  </h2>

  <div
    style={{
      display: "flex",
      justifyContent: "space-between",
      marginBottom: "20px"
    }}
  >

    <Button
      onClick={() =>
        setWeekOffset(
          weekOffset - 1
        )
      }
    >
      ← Previous Week
    </Button>

    <Button
      onClick={() =>
        setWeekOffset(
          weekOffset + 1
        )
      }
    >
      Next Week →
    </Button>

  </div>

  {
    analytics && (

            
            <Paper
              sx={{
                p: 3,
                borderRadius: 4
              }}
            >

             <h3>
  🌷your week in review🌷
</h3>

<p>
  {analytics.week_start}
  {" TO "}
  {analytics.week_end}
</p>
<br></br>
<p>🥙🪷</p>
              <p>
                🍱meals logged:
                {" "}
                {analytics.meal_count}
              </p>

              <p>
                💧water glasses logged:
                {" "}
                {analytics.water_count}
              </p>

              <p>
                😊mood check-ins:
                {" "}
                {analytics.mood_count}
              </p>

            </Paper>

          )
        }
<Paper
  sx={{
    p: 3,
    mt: 3,
    borderRadius: 4
  }}
>

  <h2>
    ⭐HIGHLIGHTS⭐
  </h2>

  <p>
    💧best hydration day:
    {" "}
    {analytics?.best_hydration_day}
  </p>

  <p>
    🍱best nutrition day:
    {" "}
    {analytics?.best_food_day}
  </p>

  <p>
    most frequent mood:
    {" "}
    {analytics?.most_common_mood}
  </p>

</Paper>

        <Paper
  sx={{
    p: 3,
    mt: 3,
    borderRadius: 4
  }}
>

  <h3>
  🍱food activity this month:
</h3>

<p>
  here's how consistently you've been
  nourishing yourself this month🌷
</p>

  <div
    style={{
      width: "100%",
      height: 300
    }}
  >

    <ResponsiveContainer>

      <BarChart
  data={
    analytics?.food_chart_data || []
  }
>

        <XAxis
          dataKey="day"
        />

        <YAxis />

        <Tooltip />

        <Bar
  dataKey="count"
  fill="#7be584"
  radius={[10, 10, 0, 0]}
/>

      </BarChart>

    </ResponsiveContainer>

  </div>
{
  analytics?.mood_chart_data && (

    <Paper
      sx={{
        p: 3,
        mt: 3,
        borderRadius: 4
      }}
    >

      <h3>
        😊mood distribution😮
      </h3>

      <p>
        a gentle look at how you've
        been feeling lately⭐
      </p>

      <div
        style={{
          width: "100%",
          height: 350
        }}
      >

        <ResponsiveContainer>

          <BarChart
            data={
              analytics.mood_chart_data
            }
          >

            <XAxis
              dataKey="mood"
            />

            <YAxis />

            <Tooltip />

            <Bar
              dataKey="count"
              fill="#ff8cbe"
              radius={[10,10,0,0]}
            />

          </BarChart>

        </ResponsiveContainer>

      </div>

    </Paper>

  )
}
</Paper>
{
  analytics?.water_chart_data && (

    <Paper
      sx={{
        p: 3,
        mt: 3,
        borderRadius: 4
      }}
    >

      <h3>
        💧hydration activity this month:
      </h3>

      <p>
        every glass counts💙🫗
      </p>

      <div
        style={{
          width: "100%",
          height: 350
        }}
      >

        <ResponsiveContainer>

          <BarChart
            data={
              analytics.water_chart_data
            }
          >

            <XAxis
              dataKey="day"
            />

            <YAxis />

            <Tooltip />

            <Bar
              dataKey="glasses"
              fill="#58c1fa"
              radius={[10,10,0,0]}
            />

          </BarChart>

        </ResponsiveContainer>

      </div>

    </Paper>
    

  )
}
<Paper
  sx={{
    p: 3,
    mt: 3,
    borderRadius: 4,
    background: "#fff9fc"
  }}
>

  <h3>
    💌p.s.
  </h3>

  <p>

    you've been showing up for yourself
    one small step at a time.

    every meal logged,
    every glass of water tracked,
    and every mood check-in
    is proof that you're trying.

    keep going!!🌷💗

  </p>

</Paper>

      </div>

    </>

  );

}