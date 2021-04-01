// get date and display date
const renderCurrentDate = () => {
  const dateTime = $("#currentDay");
  const displayNow = moment().format("dddd, MMMM Do");
  dateTime.text(displayNow);
};

// to render events and colour event block
const renderCalendarEvents = () => {
  //get from local
  const plannerEvents = JSON.parse(localStorage.getItem("plannerEvents"));

  if (plannerEvents !== null) {
    // this is to get moment hr
    // const currentHour = moment().hour();

    // this is test of manually setting hr
    const currentHour = 11;

    // get time and check it against time block and adjust class to suit
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
      textarea.text(plannedEvent);
    };

    timeBlocks.each(callback);
  } else {
    localStorage.setItem("plannerEvents", JSON.stringify({}));
  }
};

// save button click function
const onClick = function (event) {
  const plannerEvents = JSON.parse(localStorage.getItem("plannerEvents"));
  const target = $(event.target);

  if (target.is("button")) {
    const key = target.attr("id");
    const value = target.parent().find("textarea").val();

    const newObject = {
      ...plannerEvents,
      [key]: value,
    };

    localStorage.setItem("plannerEvents", JSON.stringify({ newObject }));
  }
};

// when page loads do this
const onReady = () => {
  // set event listener
  $(".container").click(onClick);
  // get current date
  renderCurrentDate();
  // check for events
  renderCalendarEvents();
};

$(document).ready(onReady);
