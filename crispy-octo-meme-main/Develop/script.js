$(function () {

  // Add a listener for click events on the save button
  $(".saveBtn").on("click", function () {
    // Get the user input
    var userInput = $(this).siblings(".description").val();
    // Get the time-block id
    var timeBlockId = $(this).parent().attr("id");
    // Save the user input in local storage using the time-block id as the key
    localStorage.setItem(timeBlockId, userInput);
     // Display the "Event saved" message
  $("#eventSaved").text("Changes Saved");
    // Remove the message after 5 seconds
     setTimeout(function() {
     $("#eventSaved").text("");
  }, 5000);
  });

  // Apply the past, present, or future class to each time block
  function updateHourBlocks() {
    var currentHour = dayjs().hour();
    $(".time-block").each(function () {
      var hourBlock = parseInt($(this).attr("id").split("-")[1]);
      if (hourBlock < currentHour) {
        $(this).removeClass("present future").addClass("past");
      } else if (hourBlock === currentHour) {
        $(this).removeClass("past future").addClass("present");
      } else {
        $(this).removeClass("past present").addClass("future");
      }
    });
  }

  // Get any user input that was saved in local storage and set the values of the corresponding textarea elements
  $(".time-block").each(function () {
    var timeBlockId = $(this).attr("id");
    var storedUserInput = localStorage.getItem(timeBlockId);
    if (storedUserInput) {
      $(this).children(".description").val(storedUserInput);
    }
  });

  // Display the current date in the header of the page
  $("#currentDay").text(dayjs().format("dddd, MMMM D"));

  // Update hour blocks every 15 minutes
  setInterval(updateHourBlocks, 900000);

  // Call updateHourBlocks to initially set the classes
  updateHourBlocks();
});
