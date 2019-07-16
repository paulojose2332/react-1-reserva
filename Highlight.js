const Highlight = (term, fullString) => {
  var newTitle = "";

  for (var i = 0; i < term.length; i++) {
    term[i].toLowerCase() === fullString[i]
      ? (newTitle += term[i].toLowerCase())
      : term[i].toUpperCase() === fullString[i]
      ? (newTitle += term[i].toUpperCase())
      : (newTitle += term[i]);
  }
  let title = term
    ? fullString.replace(newTitle, `<mark>${newTitle}</mark>`)
    : fullString;
  return title;
};

export default Highlight;
