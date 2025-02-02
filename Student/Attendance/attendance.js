const xValues = [
  "Language",
  "Physics",
  "Chemistry",
  "Computer Science",
  "Maths",
  "English",
];
const yValues = [38, 55, 97, 44, 67, 88];
const barColors = [
  "#8C63DA",
  "#2BB7DC",
  "#1F94FF",
  "#F4CF3B",
  "#6186CC",
  "#55C4AE",
];

new Chart("myChart", {
  type: "bar",
  data: {
    labels: xValues,
    datasets: [
      {
        backgroundColor: barColors,
        data: yValues,
      },
    ],
  },
  options: {
    legend: { display: false },
    title: {
      display: false,
    },
  },
});
