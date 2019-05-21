export const handleKeyPress = (e, save, reset) => {
  if (e.shiftKey) return;

  switch (e.keyCode) {
    case 13:
      save();
      break;
    case 27:
      reset();
      break;
    default:
      break;
  }
};
