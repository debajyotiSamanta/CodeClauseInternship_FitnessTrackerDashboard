// Initialize variables for storing workout data
let workoutData = {
    steps: [],
    calories: [],
    duration: [],
  };
  
  // Function to populate day options based on the selected month and year
  function populateDays() {
    const month = document.getElementById('month-select').value;
    const year = document.getElementById('year-select').value;
    const daySelect = document.getElementById('day-select');
  
    const daysInMonth = new Date(year, new Date(Date.parse(month + " 1, 2021")).getMonth() + 1, 0).getDate();
  
    daySelect.innerHTML = ''; // Clear current day options
    for (let i = 1; i <= daysInMonth; i++) {
      const option = document.createElement('option');
      option.value = i;
      option.textContent = i;
      daySelect.appendChild(option);
    }
  }
  
  // Event listener for when the month or year changes
  document.getElementById('month-select').addEventListener('change', populateDays);
  document.getElementById('year-select').addEventListener('change', populateDays);
  
  // Function to log workout data
  document.getElementById('workout-form').addEventListener('submit', function(event) {
    event.preventDefault();
  
    const steps = parseInt(document.getElementById('steps-input').value);
    const calories = parseInt(document.getElementById('calories-input').value);
    const duration = parseInt(document.getElementById('duration-input').value);
    const day = document.getElementById('day-select').value;
  
    workoutData.steps[day - 1] = steps;
    workoutData.calories[day - 1] = calories;
    workoutData.duration[day - 1] = duration;
  
    // Update the stats display
    document.getElementById('steps').textContent = steps;
    document.getElementById('calories').textContent = calories;
    document.getElementById('duration').textContent = duration;
  
    // Update the chart
    updateChart();
  });
  
  // Function to update the chart with the current month's data
  let chart;
  function updateChart() {
    const labels = Array.from({ length: 31 }, (_, i) => i + 1);
    const data = {
      labels: labels.slice(0, workoutData.steps.length),
      datasets: [
        {
          label: 'Steps',
          data: workoutData.steps.slice(0, workoutData.steps.length),
          borderColor: 'rgba(255, 111, 97, 0.8)',
          fill: false,
          tension: 0.1
        },
        {
          label: 'Calories Burned',
          data: workoutData.calories.slice(0, workoutData.calories.length),
          borderColor: 'rgba(72, 134, 248, 0.8)',
          fill: false,
          tension: 0.1
        },
        {
          label: 'Workout Duration (min)',
          data: workoutData.duration.slice(0, workoutData.duration.length),
          borderColor: 'rgba(43, 203, 174, 0.8)',
          fill: false,
          tension: 0.1
        }
      ]
    };
  
    const config = {
      type: 'line',
      data: data,
      options: {
        responsive: true,
        scales: {
          x: { title: { display: true, text: 'Day of the Month' } },
          y: { title: { display: true, text: 'Value' } }
        }
      }
    };
  
    if (chart) {
      chart.destroy(); // Destroy previous chart instance
    }
    chart = new Chart(document.getElementById('fitnessCanvas'), config);
  }
  
  // Initialize the page with day options based on the default values
  populateDays();
  
  

  