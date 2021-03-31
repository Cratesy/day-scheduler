const renderCurrentDate = () => {
  const dateTime = $("#currentDay");
  const displayNow = moment().format("dddd, MMMM Do");
  dateTime.text(displayNow);
};

const renderCalendarEvents = () => {
  //get from local
  const plannerEvents = localStorage.getItem("plannerEvents");

  if (plannerEvents !== null) {
    console.log(plannerEvents);
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
