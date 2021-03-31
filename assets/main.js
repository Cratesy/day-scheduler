const renderCurrentDate = () => {
  const dateTime = $("#currentDay");
  const displayNow = moment().format("dddd, MMMM Do");
  dateTime.text(displayNow);
};

const renderCalendarEvents = () => {
  //get from local
  const plannerEvents = JSON.parse(localStorage.getItem("plannerEvents"));

  if (plannerEvents !== null) {
    // const currentHour = moment().hour();
    const currentHour = 11;
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

const onReady = () => {
  // set event listener
  $(".container").click(onClick);
  // get current date
  renderCurrentDate();
  // check for events
  renderCalendarEvents();
};

$(document).ready(onReady);
