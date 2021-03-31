const renderCurrentDate = () => {
  const dateTime = $("#currentDay");
  const displayNow = moment().format("dddd, MMMM Do");
  dateTime.text(displayNow);
};

const renderCalendarEvents = () => {
  //get from local
  const plannerEvents = JSON.parse(localStorage.getItem("plannerEvents"));

  if (plannerEvents !== null) {
    const currentHour = moment().hour();
    // const currentHour = 11;
    const timeBlocks = $(".container .row");
    const callback = function () {
      const textarea = $(this).find("textarea");
      const timeBlockTime = Number.parseInt($(this).data("time"), 10);
      if (timeBlockTime === currentHour) {
        textarea.removeClass("past").addClass("present");
      }
      if (timeBlockTime > currentHour) {
        textarea.removeClass("past").addClass("future");
      }

      const plannedEvent = plannerEvents[timeBlockTime];
      console.log(plannedEvent, timeBlockTime);
    };

    timeBlocks.each(callback);
  } else {
    localStorage.setItem("plannerEvents", JSON.stringify({}));
  }
};

const onReady = () => {
  // get current date
  renderCurrentDate();
  // check for events
  renderCalendarEvents();
};

$(document).ready(onReady);
