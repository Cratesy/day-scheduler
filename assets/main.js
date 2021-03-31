const renderCurrentDate = () => {
  const dateTime = $("#currentDay");
  const displayNow = moment().format("dddd, MMMM Do");
  dateTime.text(displayNow);
};

const onReady = () => {
  renderCurrentDate();
};

$(document).ready(onReady);
